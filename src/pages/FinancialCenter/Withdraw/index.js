import React, { Component } from "react";
import { Qbtn, Qpagination, Qtable } from "common/index";
import AuditModal from "./components/AuditModal";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import moment from 'moment'
import "./index.less";
import { getListApi } from "api/home/FinancialCenter/Withdraw";

/**
 * 功能作用：商品说明订单列表界面
 * 注释创建人：周虹烨
 */

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      everyPage: 0,
      total: 0,
      currentPage: 0,
      visible: false,
      spCarryCashId: "",
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
          item.key = item.spCarryCashId;
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
    const {time,..._values} = params;
    if(time&&time[0]){
      _values.dateStart = moment(time[0]).formate('YYYY-MM-DD HH:mm:ss')
      _values.dateEnd = moment(time[1]).formate('YYYY-MM-DD HH:mm:ss')
    }else{
      _values.dateStart = ''
      _values.dateEnd = ''
    };
    this.searchData(_values);
  };
  showModalClick = () => {
    this.setState({
      visible: true
    });
  };
  handleOperateClick = record => {
    this.setState({
      spCarryCashId: record.spCarryCashId,
      visible: true
    });
  };
  //确定
  onOk = (values, clearForm) => {
    rechargeAuditApi(values).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          visible: false,
          spCarryCashId: ""
        });
        clearForm();
        this.searchData({})
      }
    });
  };
  //取消
  onNotPass = clearForm => {
    this.setState(
      {
        visible: false,
        spCarryCashId: ""
      },
      () => {
        clearForm();
      }
    );
  };
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
      visible,
      spCarryCashId
    } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <Qtable
          columns={Columns}
          dataSource={dataList}
          onOperateClick={this.handleOperateClick}
        />
        <Qpagination
          data={{ everyPage, currentPage, total }}
          onChange={this.changePage}
        />
        {visible && (
          <AuditModal
            spCarryCashId={spCarryCashId}
            visible={visible}
            onOk={this.onOk}
            onNotPass={this.onNotPass}
          />
        )}
      </div>
    );
  }
}
export default Withdraw;
