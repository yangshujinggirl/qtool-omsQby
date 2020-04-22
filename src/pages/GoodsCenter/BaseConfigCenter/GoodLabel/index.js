import React, { Component } from "react";
import { Modal, Button } from "antd";
import { Qpagination, Qtable } from "common/index";
import LabelModal from "./components/LabelModal";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import "./index.less";
import { getListApi, BanApi } from "api/home/GoodsCenter/BaseConfig/GoodLable";

/**
 * 功能作用：商品标签订单列表界面
 * 注释创建人：周虹烨
 */

class GoodLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      everyPage: "",
      total: "",
      currentPage: "",
      visible: false,
      preventVisible: false,
      tabId: "",
      tabName: "",
      tabStatus: "",
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
    getListApi(params).then(res => {
      if (res.httpCode == 200) {
        let { result, everyPage, currentPage, total } = res.result;
        result.map(item => {
          item.key = item.tabId;
        });
        this.setState({
          dataList: result,
          everyPage,
          currentPage,
          total
        });
      }
    });
    
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    const params = { currentPage, everyPage };
    this.searchData(params);
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
    this.setState({ inputValues: params });
  };
  showModalClick = () => {
    this.setState({
      visible: true
    });
  };
  handleOperateClick = (record, type) => {
    type == "edit"
      ? this.editOperate(record)
      : this.preventOperate(record, type);
  };
  //编辑
  editOperate = record => {
    this.setState({
      tabId: record.tabId,
      visible: true,
      tabName: record.tabName,
      tabStatus: record.tabStatus
    });
  };
  //禁用
  preventOperate = (record, tabStatus) => {
    this.setState({
      tabId: record.tabId,
      preventVisible: true,
      tabStatus
    });
  };
  //确定
  onOk = clearForm => {
    this.setState({
      visible: false,
      tabId: "",
    });
    clearForm();
    this.searchData({});
  };
  //取消
  onCancel = clearForm => {
    this.setState(
      {
        visible: false,
        tabId: ""
      },
      () => {
        clearForm();
      }
    );
  };
  onPreventOk = () => {
    const { tabId, tabStatus } = this.state;
    BanApi({ tabId, tabStatus }).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          preventVisible: false
        });
        this.searchData({});
      }
    });
  };
  onPreventCancel = () => {
    this.setState({
      preventVisible: false,
      tabId: ""
    });
  };
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
      visible,
      preventVisible,
      tabId,
      tabName,
      tabStatus
    } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Button size="large" type="primary" onClick={this.showModalClick}>
            新增标签
          </Button>
        </div>
        <Qtable
          columns={Columns}
          dataSource={dataList}
          onOperateClick={this.handleOperateClick}
        />
        <Qpagination
          data={{ everyPage, currentPage, total }}
          onChange={this.changePage}
        />
        {visible && (
          <LabelModal
            tabId={tabId}
            tabName={tabName}
            tabStatus={tabStatus}
            visible={visible}
            onOk={this.onOk}
            onCancel={this.onCancel}
          />
        )}
        {preventVisible && (
          <Modal
            title=""
            closable={false}
            visible={preventVisible}
            onOk={this.onPreventOk}
            onCancel={this.onPreventCancel}
          >
            <p>
              禁用后APP端正在展示此标签的商品信息中将去除此标签相关信息，是否确认禁用？
            </p>
          </Modal>
        )}
      </div>
    );
  }
}
export default GoodLabel;
