import React, { Component } from "react";
import { Table, Spin, Button } from "antd";
import FilterForm from "./components/FilterForm";
import Qpagination from "common/Qpagination";
import OpenQtable from "common/OpenQtable";
import * as Actions from "./actions";
import { QbyConnect } from "common";
import { Columns, Columns1 } from "./column";
import PassModal from "./components/PassModal";
import { goAuditApi } from "api/home/BaseGoods";

class BaseGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status: 0,
      inputValues: {
        productNature: -1,
        productType: -1,
        sendType: -1,
        status: -1,
        currentPage: 1
      }
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.actions.getGoodsList({ ...this.state.inputValues });
  };
  //审核取消
  onCancel = resetFields => {
    this.setState({
      visible: false
    });
    resetFields();
  };
  //审核确认
  onOk = (values, resetFields) => {
    const { status, skuCode } = this.state;
    const params = { status, skuCode };
    if (status == 3) {
      status.remark = values.remark;
    };
    goAuditApi(params).then(res => {
      if (res.code == "0") {
        resetFields();
        this.searchData();
      }
    });
  };
  //搜索列表
  searchData = values => {
    const {
      productNature = -1,
      productType = -1,
      sendType = -1,
      status = -1,
      currentPage = 1,
      ..._values
    } = values;
    this.props.actions.getGoodsList({
      productNature,
      productType,
      sendType,
      status,
      currentPage,
      ..._values
    });
  };
  changePage = (currentPage, everyPage) => {
    this.props.actions.getGoodsList({
      ...this.state.inputValues,
      currentPage,
      everyPage
    });
  };
  onShowSizeChange = (currentPage, everyPage) => {
    this.props.actions.getGoodsList({
      ...this.state.inputValues,
      currentPage,
      everyPage
    });
  };
  onSubmit = params => {
    this.searchData(params);
  };
  handleOperateClick = (record, type) => {
    switch (type) {
      case "pass":
        this.audit(record);
        break;
      case "look":
        this.look(record);
        break;
      default:
        this.audit(record, type);
        break;
    }
  };
  //查看
  look = record => {
    console.log(record);
  };
  //编辑
  edit = record => {};
  //审核
  audit = (record, type) => {
    console.log(typeof(record.skuCode))
    this.setState({ status: type, skuCode: record.skuCode }, () => {
      this.setState({
        visible: true
      });
    });
  };
  render() {
    const { visible, status } = this.state;
    const { goodLists } = this.props;
    console.log(this.state)
    return (
      <div>
        <FilterForm onSubmit={this.onSubmit} />
        <div>
          <Button type="primary">新建一般贸易品</Button>
          <Button type="primary">新建跨境品</Button>
          <Button type="primary">商品导出</Button>
        </div>
        <div>
          <OpenQtable
            parColumns={Columns}
            subColumns={Columns1}
            parList={goodLists}
            subList="list"
            onOperateClick={this.handleOperateClick}
          />
        </div>
        <Qpagination
          data={this.props}
          onChange={this.changePage}
          onShowSizeChange={this.onShowSizeChange}
        />
        {(status == 3 || status == 4) && (
          <PassModal
            onOk={this.onOk}
            onCancel={this.onCancel}
            status={status}
            visible={visible}
          />
        )}
      </div>
    );
  }
}

export default QbyConnect(BaseGoods, Actions, "BaseGoodsReducers");
