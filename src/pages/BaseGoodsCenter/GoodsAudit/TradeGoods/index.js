import React, { Component } from "react";
import FilterForm from "./FilterForm";
import EditModal from "./components/Audit";
import { GetListApi } from "api/home/BaseGoodsCenter/GoodsAudit";
import { Qtable, Qpagination, Qbtn } from "common";
import Columns from "./column";

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
        productNature: 1
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
    GetListApi(params).then(res => {
      if (res.httpCode == 200) {
        const {
          resultList = [],
          everyPage,
          currentPage,
          totalCount
        } = res.result;
        const tableLists = resultList.map(item => {
          item.key = item.id;
          return item;
        });
        this.setState({
          tableLists,
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
  handleOperateClick = (record, type) => {
    this.setState({
      type,
      record,
      visible: true
    });
  };
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys
    });
  };
  //批量审核
  audit = () => {
    this.setState({
      visible:true,
      type:'all'
    })
  };
  onOk = (values,clearForm) => {
    this.setState({
      visible:false,
      selectedRowKeys:[]
    });
    this.searchData({...this.state.inputValues});
  };
  onCancel = () => {
    this.setState({
      visible:false,
      selectedRowKeys:[]
    });
  };
  render() {
    const {
      selectedRowKeys,
      tableLists,
      everyPage,
      totalCount,
      currentPage,
      visible,
      record,
      type
    } = this.state;
    const rowSelection = {
      onChange: this.rowSelectChange,
      selectedRowKeys
    };
    console.log(selectedRowKeys)
    return (
      <div>
        <FilterForm onSubmit={this.onSubmit} />
        <Qbtn onClick={this.audit}> 批量审核 </Qbtn>
        <Qtable
          onOperateClick={this.handleOperateClick}
          columns={Columns}
          dataSource={tableLists}
          select={true}   
          rowSelection={rowSelection}
        />
        <Qpagination
          data={{ everyPage, totalCount, currentPage }}
          onChange={this.changePage}
        />
        <EditModal
          {...{visible,type,record,selectedRowKeys}}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}

export default TradeGoods;
