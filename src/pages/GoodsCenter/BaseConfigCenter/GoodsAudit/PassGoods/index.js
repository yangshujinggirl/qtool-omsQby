import React, { Component } from "react";
import {message,Popover} from 'antd'
import FilterForm from "./FilterForm";
import EditModal from "./components/Audit";
import { getListApi } from "api/home/GoodsCenter/BaseConfig/GoodsAudit";
import { QuestionCircleFilled } from '@ant-design/icons';
import { Qtable, Qpagination, Qbtn } from "common";
import Columns from "./column";
import "./index.less";

class TradeGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLists: [],
      everyPage: 20,
      currentPage: 0,
      totalCount: 0,
      selectedRowKeys: [],
      type: "",
      visible: false,
      record: [],
      inputValues: {
        productNature: 2
      }
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.searchData([]);
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    getListApi(params).then(res => {
      if (res.httpCode == 200) {
        const {result,total,currentPage,everyPage} = res.result
        if(result.length>0){
          result.map(item=>item.key = item.id)
        }
        this.setState({
          tableLists:result,
          everyPage,
          currentPage,
          total
        });
      }
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    const params = {
      ...this.state.inputValues,
      currentPage,
      everyPage
    };
    this.searchData(params);
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  rowSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    });
  };
  //批量审核
  audit = () => {
    if(!this.state.selectedRowKeys.length){
      return message.error('请至少选择一条待审核任务；',.8)
    }
    if(!this.state.selectedRowKeys.length>20){
      return message.error('单次审核任务不得超过20条；',.8)
    }
    this.setState({
      visible: true,
    });
  };
  onOk = () => {
    this.setState({
      visible: false,
      selectedRowKeys: []
    });
    this.searchData({ ...this.state.inputValues });
  };
  onCancel = () => {
    this.setState({
      visible: false,
      selectedRowKeys: []
    });
  };
  render() {
    const {
      selectedRowKeys,
      tableLists,
      everyPage,
      total,
      currentPage,
      visible,
    } = this.state;
    const rowSelection = {
      onChange: this.rowSelectChange,
      selectedRowKeys
    };
    const content = (
      <div>
        <p>鼠标移入显示悬浮窗，浮窗文案如下：</p>
        <p>
          （1）红色字体为本次需审核的价格，括号内的价格为该SKU当前审核通过的价格；
        </p>
        <p>（2）若SKU未审核通过，则所有价格为红色，且不显示括号；</p>
        <p>（3）黑色字体的价格，表示该价格本次未修改</p>
      </div>
    );
    return (
      <div className="oms-common-index-pages-wrap trade_goods">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn onClick={this.audit}> 批量审核 </Qbtn>
          <Popover className="pop_over" title="说明" content={content}>
            审核说明 <QuestionCircleFilled />
          </Popover>
        </div>
        <Qtable
          columns={Columns}
          dataSource={tableLists}
          select={true}
          rowSelection={rowSelection}
          scroll={{ x: 2400 }}
        />
        <Qpagination
          data={{ everyPage, total, currentPage }}
          onChange={this.changePage}
        />
        {visible && (
          <EditModal
            {...{ visible,selectedRowKeys }}
            onOk={this.onOk}
            onCancel={this.onCancel}
          />
        )}
      </div>
    );
  }
}

export default TradeGoods;
