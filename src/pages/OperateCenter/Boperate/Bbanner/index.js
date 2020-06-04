import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import { getListApi, saveApi } from "api/home/OperateCenter/Boperate/Banner";
import FilterForm from "./components/FilterForm/index";
import Columns from "./columns";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      bsPushId: "",
      bPushName: "",
      isPushVisible: false,
      inputValues: {}
    };
  }
  componentWillMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    getListApi(values).then(res => {
      if (res.httpCode == 200) {
        const { result, everyPage, currentPage, total } = res.result;
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
   //搜索
   onSubmit=(values)=>{
    this.searchData(values);
    this.setState({
      inputValues:values
    })
  }
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
    } = this.state;
    dataList.map(item => (item.key = item.pdBannerId));
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to='/account/add_banner'>
            <Qbtn onClick={this.addPush}>新增banner</Qbtn>
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
export default Banner;
