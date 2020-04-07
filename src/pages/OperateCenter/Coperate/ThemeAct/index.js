import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import { getListApi, saveApi } from "api/home/OperateCenter/Coperate/ThemeAct";
import FilterForm from "./components/FilterForm/index";
import Columns from "./columns";

class ThemeAct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineVisible: false,
      lineLoading: false,
      everyPage: 0,
      currentPage: 0,
      everyPage: 0,
      dataList: [],
      inputValues: {
        themeStatus: 4
      }
    };
  }
  componentDidMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    getListApi(values).then(res => {
      if (res.httpCode == 200) {
        const { result, everyPage, currentPage, total } = res.result;
        if (result.length) {
          result.map(item => (item.key = item.themeActivityId));
        }
        this.setState({
          dataList: result,
          everyPage,
          currentPage,
          total
        });
      }
    });
    this.setState({ inputValues: values });
  };

  //点击分页
  changePage = (current, limit) => {
    const currentPage = current - 1;
    const values = { ...this.state.inputValues, currentPage, limit };
    this.searchData(values);
  };
  //pageSize改变时的回调
  onShowSizeChange = ({ currentPage, limit }) => {
    const params = { currentPage, limit, ...this.state.inputValues };
    this.searchData(params);
  };
  //改变弹窗确认的loading
  changeLoading = value => {
    this.setState({
      confirmLoading: value
    });
  };
  //上下线的ok
  onLineOK = () => {
    this.setState({
      lineLoading: true
    });
    const { onlineType, themeActivityId } = this.state;
    let themeStatus = 4;
    if (onlineType == "offline") {
      themeStatus = 5;
    }
    activityOnlineApi({ themeActivityId, themeStatus }).then(res => {
      if (res.code == "0") {
        this.props.dispatch({
          type: "themeAct/fetchList",
          payload: { ...this.state.inputValues }
        });
        this.setState({
          onlineVisible: false,
          lineLoading: false
        });
      } else {
        this.setState({
          lineLoading: false
        });
      }
    });
  };
  onLineCancel = () => {
    this.setState({
      onlineVisible: false
    });
  };
  render() {
    const {
      onlineVisible,
      lineLoading,
      onlineType,
      dataList,
      everyPage,
      currentPage,
      total
    } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.searchData} />
        <div className="handle-operate-btn-action">
          <Link to="/account/add_theme">
            <Qbtn>新增主题</Qbtn>
          </Link>
        </div>
        <Qtable
          dataSource={dataList}
          columns={Columns}
          onOperateClick={this.handleOperateClick}
        />
        {dataList.length > 0 ? (
          <Qpagination
            data={{ everyPage, currentPage, total }}
            onChange={this.changePage}
            onShowSizeChange={this.onShowSizeChange}
          />
        ) : null}
        <Modal
          wrapClassName="model_center"
          visible={onlineVisible}
          onOk={this.onLineOK}
          confirmLoading={lineLoading}
          onCancel={this.onLineCancel}
          okText={onlineType == "online" ? "确认上线" : "确认下线"}
        >
          {onlineType == "online" ? (
            <p>是否确认上线该主题</p>
          ) : (
            <p>是否确认下线该主题</p>
          )}
        </Modal>
      </div>
    );
  }
}
export default ThemeAct;
