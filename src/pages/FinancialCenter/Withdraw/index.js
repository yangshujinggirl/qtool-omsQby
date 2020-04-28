import React, { Component } from "react";
import { Qbtn, Qpagination, Qtable } from "common/index";
import AuditModal from "./components/AuditModal";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import moment from "moment";
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
      inputValues: {},
    };
  }

  //初始化数据
  componentDidMount = () => {
    this.searchData({});
  };
  //搜索列表
  searchData = (values) => {
    const params = { ...this.state.inputValues, ...values };
    getListApi(params).then((res) => {
      if (res.httpCode == 200) {
        let { result, everyPage, currentPage, total } = res.result;
        result.map((item) => {
          item.key = item.spCarryCashId;
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
  onSubmit = (params) => {
    const { time, ..._values } = params;
    if (time && time[0]) {
      _values.dateStart = moment(time[0]).format("YYYY-MM-DD HH:mm:ss");
      _values.dateEnd = moment(time[1]).format("YYYY-MM-DD HH:mm:ss");
    } else {
      _values.dateStart = "";
      _values.dateEnd = "";
    }
    this.searchData(_values);
    this.setState({ inputValues: _values });
  };
  showModalClick = () => {
    this.setState({
      visible: true,
    });
  };
  handleOperateClick = (record) => {
    const {shopName,spCarryCashId,amount} = record;
    this.setState({
      spCarryCashId,
      shopName,
      amount,
      visible: true,
    });
  };
  //取消
  onClear = (clearForm) => {
    this.setState(
      {
        visible: false,
        spCarryCashId: "",
      },
      () => {
        clearForm();
        this.searchData(this.state.inputValues)
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
      spCarryCashId,
      amount,
      shopName,
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
            {...{shopName,amount,spCarryCashId,visible}}
            onClear={this.onClear}
          />
        )}
      </div>
    );
  }
}
export default Withdraw;
