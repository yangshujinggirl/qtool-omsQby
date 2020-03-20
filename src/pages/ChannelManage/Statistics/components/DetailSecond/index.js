import React, { Component } from "react";
import moment from "moment";
import { Button, Modal } from "antd";
import { Qtable, Qpagination } from "common"; //表单
import { columnsOfflineSecond, columnsOnlineSecond } from "../../columns";
import {
  getOffLineListApi,
  getMarketListApi,
} from "api/home/ChannelManage/Statistics";
import {AppExportApi} from 'api/Export'
import FilterForm from "./FilterForm";

class DetailSecond extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {},
      currentPage: 0,
      limit: 15,
      total: 0,
      dataList: []
    };
  }
  /**
   * 初始化
   */
  componentDidMount() {
    this.searchData({});
  }
  /**
   * 搜索
   */
  searchData = values => {
    const { id, source } = this.props;
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.timeStart = moment(time[0]).format("YYYY-MM-DD");
      _values.timeEnd = moment(time[1]).format("YYYY-MM-DD");
    } else {
      _values.timeStart = "";
      _values.timeEnd = "";
    }
    const params = {
      channelPopularizeId: id,
      ...this.state.inputValues,
      ..._values
    };
    if (source == 2) {
      this.getList(params,getMarketListApi);
    } else {
      this.getList(params,getOffLineListApi);
    }
    this.setState({ ...this.state.inputValues, ..._values });
  };
  /**
   * 获取市场推广二级列表
   */
  getList = (params,requestApi) => {
    requestApi(params).then(res=>{
      if(res.httpCode == 200){
        const {result,everyPage,currentPage,total} = res.result;
        if(result.length){
          result.map(item=>item.key = item.channelPopularizeId)
        }
        this.setState({
          dataList:result,
          everyPage,
          currentPage,
          total
        })
      }
    })
  };
  /**
   * 修改分页
   */
  changePage = (currentPage, limit) => {
    currentPage--;
    let paramsObj = { currentPage, ...this.state.inputValues };
    this.searchData(paramsObj);
  };
  /**
   * 导出
   */
  exportData = () => {
    const {source,id} = this.props;
    let type = source == 2 ? 4 : 2;
    const values = {
      type: type,
      channelPopularizeId:id
    }
    AppExportApi(values,'/channelStatistics/export')
  };
  render() {
    const { dataList, everyPage, currentPage, total } = this.state;
    let { source } = this.props;
    let columns = source == 2 ? columnsOnlineSecond : columnsOfflineSecond;
    return (
      <div>
        <FilterForm onSubmit={this.searchData} />
        <div style={{marginBottom:'15px'}}>
          <Button size="large" type="primary" onClick={() => this.exportData()}>
            导出
          </Button>
        </div>
        <Qtable dataSource={dataList} columns={columns} />
        {dataList.length > 0 && (
          <Qpagination
            data={{ everyPage, currentPage, total }}
            onChange={this.changePage}
          />
        )}
      </div>
    );
  }
}
export default DetailSecond;
