import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import { getListApi } from "api/home/GoodsCenter/Cgoods/ActExchangeGoods";
import FilterForm from "./components/FilterForm/index";
import Columns from "./columns";

class ActExchangeGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currentPage: 0,
      everyPage: 0,
      dataList: [],
      inputValues: {}
    };
  }
  componentDidMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    getListApi(values).then(res => {
      if (res.httpCode == 200) {
        const { result, everyPage, currentPage, total } = res.result;
        if (result.length) {
          result.map(item => (item.key = item.themeActivityId));
        }
        this.setState({
          dataList: result,
          everyPage,
          currentPage,
          total
        });
      }
    });
  };

  //点击分页
  changePage = (currentPage, everyPage) => {
    const values = { ...this.state.inputValues, currentPage, everyPage };
    this.searchData(values);
  };
  //改变弹窗确认的loading
  changeLoading = value => {
    this.setState({
      confirmLoading: value
    });
  };
  //上下线的ok
  onLineOK = () => {
    this.setState({
      lineLoading: true
    });
    const { onlineType, themeActivityId } = this.state;
    let themeStatus = 4;
    if (onlineType == "offline") {
      themeStatus = 5;
    }
    activityOnlineApi({ themeActivityId, themeStatus }).then(res => {
      if (res.code == "0") {
        this.props.dispatch({
          type: "themeAct/fetchList",
          payload: { ...this.state.inputValues }
        });
        this.setState({
          onlineVisible: false,
          lineLoading: false
        });
      } else {
        this.setState({
          lineLoading: false
        });
      }
    });
  };
  onLineCancel = () => {
    this.setState({
      onlineVisible: false
    });
  };
  //搜索
  onSubmit=(values)=>{
    this.searchData(values)
    this.setState({
      inputValues:values
    })
  }
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total
    } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to="/account/add_act_exchange_goods">
            <Qbtn>新增商品</Qbtn>
          </Link>
        </div>
        <Qtable
          dataSource={dataList}
          columns={Columns}
          onOperateClick={this.handleOperateClick}
        />
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
export default ActExchangeGoods;
