import React, { Component } from "react";
import { Button } from "antd";
import FilterForm from "./components/FilterForm";
import Qpagination from "common/Qpagination";
import OpenQtable from "common/OpenQtable";
import * as Actions from "./actions";
import { QbyConnect } from "common";
import { Columns, Columns1 } from "./column";
import PassModal from "./components/PassModal";
class BaseGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status:0,
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
    this.searchData();
  };
  //审核取消
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  //审核确认
  onOk = () => {};
  //搜索列表
  searchData = values => {
    this.props.actions.getGoodsList({
      ...this.state.inputValues,
      ...values
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
        this.audit(type);
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
  audit = type => {
    this.setState({status: type},() => {
      this.setState({
        visible: true
      });
    });
  };
  render() {
    const { visible, status } = this.state;
    const { goodLists } = this.props;
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
        {(status==3||status==4)&&
          <PassModal
            onOk={this.onOk}
            onCancel={this.onCancel}
            status={status}
            visible={visible}
          />
        }
        
      </div>
    );
  }
}

export default QbyConnect(BaseGoods, Actions, "BaseGoodsReducers");
