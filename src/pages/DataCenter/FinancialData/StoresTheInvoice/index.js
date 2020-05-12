import React, { Component } from "react";
import { Qtable, Qpagination} from "common";
import { GetStoresTheInvoiceList } from "api/home/DataCenter/FinancialData";
import {Button} from 'antd'
import FilterForm from "./components/FilterForm/index";
// import Columns from "./columns";

class StoresTheInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      everyPage: 0,
      currentPage: 0,
      everyPage: 0,
      dataList: [],
      inputValues: {}
    };
  }
  componentDidMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    GetStoresTheInvoiceList(values).then(res => {
      if (res.httpCode == 200) {
        const { result, everyPage, currentPage, total } = res.result;
        if (result.length) {
          result.map(item => (item.key = item.themeActivityId));
        }
        this.setState({
          dataList: result,
          everyPage,
          currentPage,
          total
        });
      }
    });
    this.setState({ inputValues: values });
  };

  //点击分页
  changePage = (currentPage, everyPage) => {
    const values = { ...this.state.inputValues, currentPage, everyPage };
    this.searchData(values);
  };
  
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total
    } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.searchData} />
        <div className="handle-operate-btn-action">
            <Button>导出数据</Button>
        </div>
        {/* <Qtable
          dataSource={[]}
          columns={[]}
          onOperateClick={this.handleOperateClick}
        /> */}
        {dataList.length > 0 ? (
          <Qpagination
            data={{ everyPage, currentPage, total }}
            onChange={this.changePage}
          />
        ) : null}
      </div>
    );
  }
}
export default StoresTheInvoice;
