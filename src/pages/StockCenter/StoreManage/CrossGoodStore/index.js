import React, { Component } from "react";
import {Spin} from 'antd'
import { Qtable, Qpagination,Qbtn  } from "common"; //表单
import FilterForm from "./components/FilterForm/index";
import Columns from "./columns";
import { saveStoreApi,getListApi  } from "api/home/StockCenter/StoreManage";
import AddStoreModal from "./components/AddStoreModal";
/**
 *跨境商品仓 zhy
 */
class CrossGoodStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      inputValues: { status: 10, sourceType: 2 },
      everyPage: 0,
      currentPage: 0,
      total: 0,
      loading: false,
      visible: false,
      id:''
    };
  }
  componentWillMount() {
    this.searchData({});
  }
  //点击搜索
  searchData = values => {
    this.setState({
      loading: true
    });
    getListApi(values)
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.httpCode == 200) {
          const { result, everyPage, currentPage, total } = res.result;
          if (result.length) {
            result.map(item => {
              item.key = item.id;
            });
          }
          this.setState({
            dataList: result,
            everyPage,
            currentPage,
            total
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
    this.setState({ inputValues: values });
  };

  //点击分页
  changePage = (currentPage, everyPage) => {
    const values = { ...this.state.inputValues, currentPage, everyPage };
    this.searchData(values);
  };
  //新建仓库
  addStore = () => {
    this.setState({
      visible: true
    });
  };
   //确定
   onOk = (values, clearForm) => {
    saveStoreApi(values).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          visible: false,
          id: ""
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
        id: ""
      },
      () => {
        clearForm();
      }
    );
  };
  handleOperateClick=(record)=>{
    this.setState({
      id:record.id,
      visible:true
    })
  }
  render() {
    const { dataList, everyPage, currentPage, total, loading,visible,id } = this.state;
    return (
      <Spin spinning={loading}>
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.searchData} />
          <div className="handle-operate-btn-action">
            <Qbtn onClick={this.addStore}>新建仓库</Qbtn>
          </div>
          <Qtable dataSource={dataList} columns={Columns} onOperateClick={this.handleOperateClick}/>
          {dataList.length > 0 ? (
            <Qpagination
              data={{ everyPage, currentPage, total }}
              onChange={this.changePage}
            />
          ) : null}
          {visible && (
            <AddStoreModal
              id={id}
              visible={visible}
              onOk={this.onOk}
              onCancel={this.onCancel}
            />
          )}
        </div>
      </Spin>
    );
  }
}

export default CrossGoodStore;
