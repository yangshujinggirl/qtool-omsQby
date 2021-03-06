import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, message, Modal } from "antd";
import {
  GetTimeListsApi,
  goInvalidApi
} from "api/home/GoodsCenter/Bgoods/Btimer";
import Columns from "./columns/index";
import Qtable from "common/Qtable/index"; //表单
import Qpagination from "common/Qpagination/index"; //分页
import FilterForm from "./FilterForm/index";
import { Sessions } from "utils";
import "./index.less";

class Btimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      everyPage: 15,
      currentPage: 1,
      total: 0,
      inputValues: {}
    };
  }

  //初始化数据
  componentDidMount = () => {
    this.searchData({});
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    GetTimeListsApi(params).then(res => {
      if (res.httpCode == 200) {
        let { result, everyPage, currentPage, total } = res.result;
        const taskList = result.map(item => {
          item.key = item.id;
          return item;
        });
        this.setState({
          taskList,
          everyPage,
          currentPage,
          total
        });
      }
    });
    
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    const params = { ...this.state.inputValues,currentPage, everyPage };
    this.searchData(params);
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
    this.setState({ inputValues: params });
  };
  //修改
  handleOperateClick = (record) => {
    this.setState({
      visible: true,
      pdTaskTimeId: record.pdTaskTimeId,
      taskName: record.taskName
    });
  };
  //强制失效
  onOk = () => {
    const userName = sessionStorage.getItem("oms_userName")
    const { pdTaskTimeId, taskName } = this.state;
    goInvalidApi({ pdTaskTimeId, taskName, taskOperateUser: userName }).then(
      res => {
        if (res.httpCode == 200) {
          message.success("强制失效完毕", 0.8);
          this.searchData(this.state.inputValues)
        }
        this.setState({
          visible: false,
          pdTaskTimeId: "",
          taskName: ""
        });
      }
    );
  };
  //取消
  onCancel = () => {
    this.setState({
      visible: false,
      pdTaskTimeId: "",
      taskName: ""
    });
  };
  render() {
    const {
      taskList,
      everyPage,
      currentPage,
      total,
      visible,
      taskName
    } = this.state;
    taskList.map(item => (item.key = item.pdTaskTimeId));
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to={"/account/addTimer"}>
            <Button type="primary" size="large">
              新增定时
            </Button>
          </Link>
        </div>
        <Qtable
          columns={Columns}
          dataSource={taskList}
          onOperateClick={this.handleOperateClick}
        />
        <Qpagination
          data={{ everyPage, currentPage, total }}
          onChange={this.changePage}
        />
        {visible && (
          <Modal
            className="modal_center"
            title="强制失效"
            visible={visible}
            onOk={this.onOk}
            onCancel={this.onCancel}
          >
            <span>您是否要强制失效定时任务“{taskName}”</span>
          </Modal>
        )}
      </div>
    );
  }
}
export default Btimer;
