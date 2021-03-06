import React, { Component } from "react";
import { Spin } from "antd";
import {Link} from 'react-router-dom'
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import { getListApi } from "api/home/OrderCenter/Corder/UserOrder";
import FilterForm from "./components/FilterForm/index";
import {Columns} from "./columns";
import { AppExportApi } from "api/Export";
import moment from "moment";

/**
 * 用户订单 zhy
 */
class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      everyPage: 0,
      currentPage: 0,
      dataList: [],
      inputValues: {},
      loading: false
    };
  }
  //点击搜索
  searchData = values => {
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.createTimeST = moment(time[0]).format("YYYY-MM-DD HH:mm:ss");
      _values.createTimeET = moment(time[1]).format("YYYY-MM-DD HH:mm:ss");
    } else {
      _values.createTimeST = null;
      _values.createTimeET = null;
    }
    this.setState({
      loading: true
    });
    getListApi(_values)
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.httpCode == 200) {
          const { result, everyPage, currentPage, total } = res.result;
          if (result.length) {
            result.map(item => (item.key = item.orderId));
          }
          this.setState({
            dataList: result,
            everyPage,
            currentPage,
            total
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
    // const list = [{orderType:1,key:0,orderNo:111,spShopName:1,platformStr:'支付宝',orderStatusStr:'一般',deliveryTypeStr:'ff',shipmentStr:'11',nickname:'11',mobilePhone:'11',qtySum:1,}]
    // this.setState({
    //   dataList: list,
    // })
    this.setState({ inputValues: values });
  };

  //点击分页
  changePage = (currentPage, everyPage) => {
    const values = { ...this.state.inputValues, currentPage, everyPage };
    this.searchData(values);
  };
  //导出数据
  exportData = () => {
    AppExportApi(this.state.inputValues, "/toC/orderList/export");
  };
  render() {
    const { dataList, everyPage, currentPage, total, loading } = this.state;
    return (
      <Spin spinning={loading}>
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.searchData} />
          <div className="handle-operate-btn-action">
            <Link to={`/account/addUserOrder_returnOrder`}>
              <Qbtn>新建退单</Qbtn>
            </Link>
            <Qbtn onClick={this.exportData}>导出数据</Qbtn>
          </div>
          <Qtable dataSource={dataList} columns={Columns} locale={{emptyText:"暂无数据，请修改搜索条件"}}/>
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
export default UserOrder;
