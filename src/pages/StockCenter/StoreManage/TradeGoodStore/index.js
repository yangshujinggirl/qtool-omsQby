import React, { Component } from "react";
import {Spin} from 'antd'
import { Qtable, Qpagination } from "common"; //表单
import FilterForm from "./FilterForm/index";
import Columns from "./columns";
import { getListApi } from "api/home/StockCenter/StoreManage";

/**
 *跨境商品仓
 */
class CrossGoodStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      inputValues: {status:10,sourceType:2},
      everyPage: 0,
      currentPage: 0,
      total: 0,
      loading:false
    };
  }
  componentWillMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    this.setState({
      loading:true
    })
    getListApi(values).then(res => {
      this.setState({
        loading:false
      })
      if (res.httpCode == 200) {
        const { result, everyPage, currentPage, total } = res.result;
        if (result.length) {
          result.map(item => (item.key = item.id));
        }
        this.setState({
          dataList: result,
          everyPage,
          currentPage,
          total
        });
      }
    }).catch(()=>{
      this.setState({
        loading:false
      })
    });
    this.setState({ inputValues: values });
  };

  //点击分页
  changePage = (currentPage, limit) => {
    const values = { ...this.state.inputValues, currentPage, limit };
    this.searchData(values);
  };

  render() {
    const { dataList, everyPage, currentPage, total,loading } = this.state;
    return (
      <Spin spinning={loading}>
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.searchData} />
        <Qtable dataSource={dataList} columns={Columns} />
        {dataList.length > 0 ? (
          <Qpagination
            data={{ everyPage, currentPage, total }}
            onChange={this.changePage}
          />
        ) : null}
      </div>
      </Spin>
    );
  }
}

export default CrossGoodStore;
