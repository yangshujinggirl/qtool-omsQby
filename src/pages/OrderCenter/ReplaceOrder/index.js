import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, message, Upload,Spin } from "antd";
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import FilterForm from "./components/FilterForm/index";
import { getListApi, sendGoodsApi } from "api/home/OrderCenter/ReplaceOrder";
import Columns from "./columns";
import moment from "moment";
import { OmsExportApi } from "api/Export";
import SendModal from "./components/SendModal";

/**
 *
 * 代发订单
 */
class ReplaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      inputValues: {},
      selectedRows: [],
      selectedRowKeys: [],
      visible: false,
      orderDetailNo:'',
      loading:false
    };
  }
  componentWillMount() {
    this.searchData({});
  }
  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys
    });
    sessionStorage.setItem("replaceList", JSON.stringify(selectedRows));
  };
  //点击搜索
  searchData = values => {
    this.setState({
      loading:true
    })
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.stime = moment(time[0]).format("YYYY-MM-DD HH:mm:ss");
      _values.etime = moment(time[1]).format("YYYY-MM-DD HH:mm:ss");
    } else {
      _values.stime = "";
      _values.etime = "";
    }
    const params = { ...this.state.inputValues, ..._values };
    getListApi(params).then(res => {
      this.setState({
        loading:false
      })
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
    }).catch(()=>{
      this.setState({
        loading:false
      })
    });
    this.setState({ inputValues: params });
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
    const { stime, etime, ...params } = this.state.inputValues;
    const values = { stime, etime, exportType: 6, agencyExport: { ...params } };
    OmsExportApi(values, "/export/commonExport");
  };
  //单行发货
  handleOperateClick = record => {
    this.setState({
      visible: true,
      orderDetailNo: record.orderDetailNo
    });
  };
  //发货保存
  onOk = (values, resetForm) => {
    sendGoodsApi(values).then(res => {
      if (res.httpCode == 200) {
        this.searchData({ ...this.state.inputValues });
        this.setState({
          visible: false
        });
        resetForm();
      }
    });
  };
  //发货取消
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  //批量发货模板
  batchFahuo=()=>{
    window.open("src/static/fahuo.xls");
  }
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
      selectedRowKeys,
      visible,
      orderDetailNo,
      loading
    } = this.state;
    const rowSelection = {
      type: "checkbox",
      selectedRowKeys,
      onChange: this.onChange
    };
    const uploadProps={
      accept: ".xlsx,.xls",
      action:'/qtoolsOms/upload/file_excel',
      data:{data:JSON.stringify({type:23})},
      showUploadList:false
    }
    return (
      <Spin spinning={loading}>
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.searchData} />
        <div className="handle-operate-btn-action">
          <Link to={"/account/get_purchasein_order"}>
            <Qbtn size="free">生成代发采购单</Qbtn>
          </Link>
          <Upload {...uploadProps}>
            <Qbtn onClick={this.cancelPush}>批量发货</Qbtn>
          </Upload>
          <Qbtn size="free" onClick={this.batchFahuo}>
            批量发货模板
          </Qbtn>
          <Qbtn onClick={this.exportData}>导出数据</Qbtn>
        </div>
        <Qtable
          dataSource={dataList}
          columns={Columns}
          onOperateClick={this.handleOperateClick}
          select
          rowSelection={rowSelection}
        />
        {dataList.length > 0 ? (
          <Qpagination
            data={{ everyPage, currentPage, total }}
            onChange={this.changePage}
            onShowSizeChange={this.onShowSizeChange}
          />
        ) : null}
        {
          visible&&
          <SendModal
          onOk={this.onOk}
          onCancel={this.onCancel}
          visible={visible}
          orderDetailNo={orderDetailNo}
        />
        }
       
      </div>
      </Spin>
    );
  }
}
export default ReplaceOrder;
