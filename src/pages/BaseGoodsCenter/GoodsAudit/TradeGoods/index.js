import React, { Component } from "react";
import FilterForm from "./components/FilterForm";
import { GetListApi } from "api/home/BaseGoodsCenter/TradeGoods";
import { Qtable, Qpagination } from "common";
import Columns from "./column";

class TradeGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableLists: [],
      inputValues: {
        productNature:1
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
      if (res.code == "0") {
        this.setState({
          tableLists: res.result.resultList
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
  handleOperateClick = () => {
    
  };
  render() {
    const { tableLists } = this.state;
    return (
      <div>
        <FilterForm onSubmit={this.onSubmit} />
        <Qtable
          onOperateClick={this.handleOperateClick}
          columns={Columns}
          dataSource={tableLists}
        />
        <Qpagination data={this.props} onChange={this.changePage}/>
      </div>
    );
  }
}

export default TradeGoods;
