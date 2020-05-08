import React, { Component } from "react";
import { Qpagination, Qtable } from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import moment from 'moment'
import { getListApi } from "api/home/UserCenter/PosUserManage";

/**
 * 功能作用：商品说明订单列表界面
 * 注释创建人：周虹烨
 */

class PosUserManage extends Component {
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
    this.searchData({time:[moment().subtract(1, 'days'), moment()]});
  };
  //搜索列表
  searchData = values => {
    const {time,..._values} = values;
    if(time&&time[0]){
      _values.startTime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss')
      _values.endTime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
    }else{
      _values.startTime = ''
      _values.endTime = ''
    };
    const params = { ...this.state.inputValues, ..._values,time:null };
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
export default PosUserManage;
