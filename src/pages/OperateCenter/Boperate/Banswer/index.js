import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import { Qtable, Qpagination, Qbtn } from "common"; //表单
import { getListApi, saveApi } from "api/home/OperateCenter/Boperate/Banswer";
import FilterForm from "./components/FilterForm/index";
import {Columns} from "./columns";

/**
 * 周虹烨
 * B端问答
 */
class Banswer extends Component {
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
    this.setState({ inputValues: values });
  };

  //点击分页
  changePage = (currentPage, everyPage) => {
    const values = { ...this.state.inputValues, currentPage, everyPage };
    this.searchData(values);
  };
 
  render() {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
    } = this.state;
    console.log(dataList)
    dataList.map(item => (item.key = item.pdAnswerId));
    console.log(dataList)
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.searchData} />
        <div className="handle-operate-btn-action">
          <Link to='/account/add_b_answer'>
            <Qbtn>新增问答</Qbtn>
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
export default Banswer;
