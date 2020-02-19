import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, message, Menu, Dropdown } from "antd";
import { GetTaskListsApi } from "api/home/GoodsCenter/Cgoods/Ctask";
import Columns from "./columns/index";
import Qtable from "common/Qtable/index"; //表单
import Qpagination from "common/Qpagination/index"; //分页
import FilterForm from "./FilterForm/index";
import "./index.less";

class Ctask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      everyPage: 20,
      currentPage: 0,
      totalCount: 0,
      inputValues: {}
    };
  }

  //初始化数据
  componentDidMount = () => {
    // this.searchData({});
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    GetTaskListsApi(params).then(res => {
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
  handleOperateClick = record => {
    const paneitem = {
      title: "修改定时",
      key: `${this.props.componkey}edit` + record.pdTaskTimeId,
      componkey: `${this.props.componkey}edit`,
      data: {
        pdTaskTimeId: record.pdTaskTimeId,
        type: record.proStatus
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  render() {
    console.log(this.props);
    const { taskList, everyPage, currentPage, totalCount } = this.state;
    return (
      <div className="qtools-components-pages">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handel-btn-lists">
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
                <Menu.Item>
                  <Link to={"/account/addtask?taskType=2"} style={{ color: "#35bab0" }}>
                    任务类型：商品提示
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={"/account/addtask?taskType=3"} style={{ color: "#35bab0" }}>
                    任务类型：商品标签
                  </Link>
                </Menu.Item>
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
        <Qtable columns={Columns} dataSource={taskList} />
        <Qpagination
          data={{ everyPage, currentPage, totalCount }}
          onChange={this.changePage}
        />
      </div>
    );
  }
}
export default Ctask;
