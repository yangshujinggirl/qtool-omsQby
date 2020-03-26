import {Link} from 'react-router-dom'
import React, { Component } from "react";
import { Qbtn, Qpagination, Qtable } from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import { getListApi } from "api/home/CooperateCenter/ShopManage";

/**
 * 功能作用：商品说明订单列表界面
 * 注释创建人：周虹烨
 */
class ShopManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      everyPage: 0,
      total: 0,
      currentPage: 0,
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
          item.key = item.id;
        });
        this.setState({
          dataList: result,
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
    const params = { currentPage, everyPage };
    this.searchData(params);
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };

  render() {
    const { dataList, everyPage, currentPage, total } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to="/account/shopManage_edit">
            <Qbtn>新增门店</Qbtn>
          </Link>
        </div>
        <Qtable
          columns={Columns}
          dataSource={dataList}
        />
        <Qpagination
          data={{ everyPage, currentPage, total }}
          onChange={this.changePage}
        />
      </div>
    );
  }
}
export default ShopManage;
