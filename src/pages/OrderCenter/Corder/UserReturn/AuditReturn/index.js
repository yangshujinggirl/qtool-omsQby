import React, { Component } from "react";
import { Spin } from "antd";
import { Qtable, Qpagination } from "common"; //表单
import FilterForm from "./FilterForm/index";
import { Columns } from "./columns";
import { getListApi } from "api/home/OrderCenter/Corder/UserReturn/AllReturn";
import moment from "moment";

/**
 *待审核退单 zhy
 */
class AuditReturn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      inputValues: { status: 10, sourceType: 1 },
      everyPage: 0,
      currentPage: 0,
      total: 0,
      loading: false
    };
  }
  componentWillMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    this.setState({
      loading: true
    });
    const { rangePicker, ..._values } = values;
    if (rangePicker && rangePicker[0]) {
      _values.stime = moment(rangePicker[0]).format("YYYY-MM-DD HH:mm:ss");
      _values.etime = moment(rangePicker[1]).format("YYYY-MM-DD HH:mm:ss");
    } else {
      _values.stime = "";
      _values.etime = "";
    }
    const params = { ...this.state.inputValues, ..._values };
    getListApi(params)
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
    this.setState({ inputValues: params });
  };

  //点击分页
  changePage = (currentPage, everyPage) => {
    const values = { ...this.state.inputValues,currentPage, everyPage };
    this.searchData(values);
  };

  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
      loading
    } = this.state;
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

export default AuditReturn;
