import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, message, Menu, Dropdown,Modal } from "antd";
import {
  GetTaskListsApi,
  goInvalidApi
} from "api/home/GoodsCenter/Cgoods/Ctask";
import Columns from "./columns/index";
import Qtable from "common/Qtable/index"; //表单
import Qpagination from "common/Qpagination/index"; //分页
import FilterForm from "./FilterForm/index";
import { Sessions } from 'utils';
import "./index.less";

class Ctask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      taskList: [],
      taskId: "",
      taskName: "",
      everyPage: 20,
      currentPage: 1,
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
    const params = { ...this.state.inputValues, ...values};
    GetTaskListsApi(params).then(res => {
      if (res.httpCode == 200) {
        let { result, everyPage, currentPage, totalCount } = res.result;
        this.setState({
          taskList:result,
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
  //修改
  handleOperateClick = (record, type) => {
    switch (type) {
      case "info":
        this.props.history.push(`/account/taskInfo/${record.taskId}`);
        break;
      case "edit":
        this.props.history.push(
          `/account/addtask?taskType=1&taskId=${record.taskId}`
        );
        break;
      case "invalid":
        this.confirmInvalid(record);
    }
  };
  confirmInvalid = record => {
    this.setState({
      visible: true,
      taskId: record.taskId,
      taskName: record.taskName
    });
  };
  //强制失效
  onOk = () => {
    const userName = Sessions.get('oms_userName')||1234;
    const { taskId } = this.state;
    goInvalidApi({ taskId,taskOperateUser: userName }).then(res => {
      if (res.httpCode == 200) {
        message.success("强制失效完毕", 0.8);
      }
      this.setState({
        visible: false,
        taskId: "",
        taskName: ""
      });
    });
  };
  //取消
  onCancel = () => {
    this.setState({
      visible: false,
      taskId: "",
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
    taskList.map(item=>(
      item.key = item.taskId
    ))
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link
                    to={"/account/addtask?taskType=1"}
                    style={{ color: "#35bab0" }}
                  >
                    任务类型：商品状态
                  </Link>
                </Menu.Item>
                {/* <Menu.Item>
                  <Link
                    to={"/account/addtask?taskType=2"}
                    style={{ color: "#35bab0" }}
                  >
                    任务类型：商品提示
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to={"/account/addtask?taskType=3"}
                    style={{ color: "#35bab0" }}
                  >
                    任务类型：商品标签
                  </Link>
                </Menu.Item> */}
              </Menu>
            }
            placement="bottomCenter"
            overlayClassName="set-time"
          >
            <Button type="primary" size="large">
              新增定时
            </Button>
          </Dropdown>
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
            className='modal_center'
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
export default Ctask;
