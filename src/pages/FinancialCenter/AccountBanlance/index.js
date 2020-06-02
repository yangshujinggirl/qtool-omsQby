import React, { Component } from "react";
import {Button} from 'antd'
import { Qpagination, Qtable } from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import { getListApi } from "api/home/FinancialCenter/AccountBanlance";
import {ErpExportApi} from 'api/Export'

/**
 * 功能作用：賬戶餘額订单列表界面
 * 注释创建人：周虹烨
 */

class AccountBanlance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      everyPage: "",
      total: "",
      currentPage: "",
      inputValues: {}
    };
  }

  //初始化数据
  componentDidMount = () => {
    this.searchData({currentPage:1,everyPage:15});
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    getListApi(params).then(res => {
      if (res.httpCode == 200) {
        let { result, everyPage, currentPage, total } = res.result;
        result.map(item => {
          item.key = item.spShopId;
        });
        this.setState({
          dataList: result,
          everyPage,
          currentPage,
          total,
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
  //导出数据
  exportData=()=>{
    ErpExportApi(this.state.inputValues,'/spmoney/shopPoints/export')
  }
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
    } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className='handle-operate-btn-action'>
          <Button type='primary' size='large' onClick={this.exportData}>导出数据</Button>
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
export default AccountBanlance;
