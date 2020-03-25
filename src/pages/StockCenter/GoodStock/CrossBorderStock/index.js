import React, { Component } from "react";
import { Spin } from "antd";
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import { getListApi } from "api/home/StockCenter/GoodStock";
import FilterForm from "./components/FilterForm/index";
import Columns from "./columns";
import { AppExportApi } from "api/Export";

class ErpStock extends Component {
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
  componentDidMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    this.setState({
      loading: true
    });
    getListApi(values)
      .then(res => {
        this.setState({
          loading: false
        });
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
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
    this.setState({ inputValues: values });
  };

  //点击分页
  changePage = (current, limit) => {
    const currentPage = current - 1;
    const values = { ...this.state.inputValues, currentPage, limit };
    this.searchData(values);
  };
  //pageSize改变时的回调
  onShowSizeChange = ({ currentPage, limit }) => {
    const params = { currentPage, limit, ...this.state.inputValues };
    this.searchData(params);
  };
  //导出数据
  exportData = () => {
    AppExportApi(
      { type: 1, ...this.state.inputValues },
      "/channelStatistics/export"
    );
  };
  render() {
    const { dataList, everyPage, currentPage, total, loading } = this.state;
    return (
      <Spin spinning={loading}>
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.searchData} />
          <div className="handle-operate-btn-action">
            <Qbtn onClick={this.exportData}>导出数据</Qbtn>
          </div>
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
export default ErpStock;
