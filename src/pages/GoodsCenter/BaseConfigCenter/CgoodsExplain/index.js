import React, { Component } from "react";
import { Qbtn, Qpagination, Qtable } from "common/index";
import ExplainModal from "./components/ExplainModal";
import FilterForm from "./components/FilterForm";
import { Columns1, Columns2 } from "./columns";
import "./index.less";
import { GetListsApi,saveExplainApi } from "../../../../api/home/GoodsCenter/BaseConfig/CgoodsExplain";

/**
 * 功能作用：商品标签
 * 注释创建人：周虹烨
 */

class GoodLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      everyPage: 15,
      total: 0,
      currentPage: 0,
      visible: false,
      pdExplainId: "",
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
    GetListsApi(params).then(res => {
      if (res.httpCode == 200) {
        let { result, everyPage, currentPage, total } = res.result;
        result.map(item => {
          item.key = item.pdExplainId;
        });
        this.setState({
          dataList: result,
          everyPage,
          currentPage,
          total
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
  showModalClick = () => {
    this.setState({
      visible: true
    });
  };
  handleOperateClick = record => {
    this.setState({
      pdExplainId: record.pdExplainId,
      visible: true
    });
  };
  //确定
  onOk = (values, clearForm) => {
    saveExplainApi(values).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          visible: false,
          pdExplainId: ""
        });
        clearForm();
        this.searchData({})
      }
    });
  };
  //取消
  onCancel = clearForm => {
    this.setState(
      {
        visible: false,
        pdExplainId: ""
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
      pdExplainId
    } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.showModalClick}>
            新增说明
          </Qbtn>
        </div>
        <Qtable
          columns={Columns1}
          dataSource={dataList}
          onOperateClick={this.handleOperateClick}
        />
        <Qpagination
          data={{ everyPage, currentPage, total }}
          onChange={this.changePage}
        />
        {visible && (
          <ExplainModal
            pdExplainId={pdExplainId}
            visible={visible}
            onOk={this.onOk}
            onCancel={this.onCancel}
          />
        )}
      </div>
    );
  }
}
export default GoodLabel;
