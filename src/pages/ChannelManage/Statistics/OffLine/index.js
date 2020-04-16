import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import { getOffLineListApi} from "api/home/ChannelManage/Statistics";
import FilterForm from "../components/FilterForm/index";
import { columnsOfflinePrimary } from "../columns";
import moment from 'moment'
import {AppExportApi} from 'api/Export'

class OffLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineVisible: false,
      lineLoading: false,
      everyPage: 0,
      currentPage: 0,
      dataList: [],
      inputValues: {
        themeStatus: 4
      }
    };
  }
  componentDidMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.timeStart = moment(time[0]).format("YYYY-MM-DD");
      _values.timeEnd = moment(time[0]).format("YYYY-MM-DD");
    } else {
      _values.timeStart = "";
      _values.timeEnd = "";
    }
    getOffLineListApi(_values).then(res => {
      if (res.httpCode == 200) {
        const { result, everyPage, currentPage, total } = res.result;
        if (result.length) {
          result.map(item => (item.key = item.channelPopularizeId));
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
   //导出数据
  exportData=()=>{
    AppExportApi({type:1,...this.state.inputValues},'/channelStatistics/export')
  }
  render() {
    const { dataList, everyPage, currentPage, total } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.searchData}  type={1}/>
        <div className="handle-operate-btn-action">
            <Qbtn onClick={this.exportData}>导出数据</Qbtn>
        </div>
        <Qtable dataSource={dataList} columns={columnsOfflinePrimary} />
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
export default OffLine;
