import React, { Component } from "react";
import { Qbtn, Qpagination, Qtable } from "common/index";
import AuditModal from "./components/AuditModal";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import moment from 'moment'
import "./index.less";
import { getListApi,rechargeAuditApi } from "api/home/FinancialCenter/ShoperRecharge";

/**
 * 功能作用：商品说明订单列表界面
 * 注释创建人：周虹烨
 */

class ShopKeepRecharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      everyPage: "",
      total: "",
      currentPage: "",
      visible: false,
      spVoucherId: "",
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
          item.key = item.spVoucherId;
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
      _values.voucherDateStart = moment(time[0]).formate('YYYY-MM-DD HH:mm:ss')
      _values.voucherDateEnd = moment(time[1]).formate('YYYY-MM-DD HH:mm:ss')
    }else{
      _values.voucherDateStart = ''
      _values.voucherDateEnd = ''
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
      spVoucherId: record.spVoucherId,
      visible: true
    });
  };
  //确定
  onOk = (values, clearForm) => {
    rechargeAuditApi(values).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          visible: false,
          spVoucherId: ""
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
        spVoucherId: ""
      },
      () => {
        clearForm();
      }
    );
  };
  
  onCancel=()=>{
    this.setState({
      visible: false,
      spVoucherId: ""
    });
  }
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
      visible,
      spVoucherId
    } = this.state;
    console.log(spVoucherId)
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
            spVoucherId={spVoucherId}
            visible={visible}
            onOk={this.onOk}
            onCancel={this.onCancel}
            onNotPass={this.onNotPass}
          />
        )}
      </div>
    );
  }
}
export default ShopKeepRecharge;
