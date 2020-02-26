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
      taskList: [
        {
          taskName: "mingzi",
          pdTaskTimeId: 1
        }
      ],
      everyPage: 20,
      currentPage: 0,
      totalCount: 0,
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
        let { resultList, everyPage, currentPage, totalCount } = res.result;
        const brandLists = resultList.map(item => {
          item.key = item.id;
          return item;
        });
        this.setState({
          brandLists,
          everyPage,
          currentPage,
          totalCount
        });
      }
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    const params = { currentPage, everyPage };
    this.searchData(params);
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  //pageSize改变时的回调
  onShowSizeChange = ({ currentPage, limit }) => {
    this.props.dispatch({
      type: "cTimer/fetchList",
      payload: { currentPage, limit, ...this.state.inputValues }
    });
  };
  //修改
  handleOperateClick = (record, type) => {
    switch (type) {
      case "info":
        this.props.history.push(`/account/taskInfo/${record.pdTaskTimeId}`);
        break;
      case "edit":
        this.props.history.push(
          `/account/addtask?taskType=1&pdTaskTimeId=${record.pdTaskTimeId}`
        );
        break;
      case "invalid":
        this.confirmInvalid(record);
    }
  };
  confirmInvalid = record => {
    this.setState({
      visible: true,
      pdTaskTimeId: record.pdTaskTimeId,
      taskName: record.taskName
    });
  };
  //强制失效
  onOk = () => {
    const userName = Sessions.get("name");
    const { pdTaskTimeId, taskName } = this.state;
    goInvalidApi({ pdTaskTimeId, taskName, taskOperateUser: userName }).then(
      res => {
        if (res.httpCode == 200) {
          message.success("强制失效完毕", 0.8);
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
      totalCount,
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
          data={{ everyPage, currentPage, totalCount }}
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
