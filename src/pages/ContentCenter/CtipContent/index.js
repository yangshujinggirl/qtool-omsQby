import {Link} from 'react-router-dom';
import { Modal, Spin } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { Columns } from './columns';
import { GetListApi, GetBitApi } from 'api/contentCenter/CtipContent';
import FilterForm from './components/FilterForm';
import AddModal from './components/AddModal';

const { confirm } = Modal;
class CtipContent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dataList:[],
      visible:false,
      loading:false,
      dataPagation:{
        everyPage:15,
        currentPage: 1,
        total:0
      },
      fields: {},
    };
  }
  //搜索列表
  componentDidMount (){
    this.searchList()
  };
  //查询列表
  searchList=()=> {
    let { fields, dataPagation } =this.state;
    this.setState({ loading:true })
    let params={...fields,everyPage:dataPagation.everyPage,currentPage:dataPagation.currentPage};
    let { time, ..._val } =params;
    if(time&&time.length>0) {
      _val.releaseTimeStr = moment(time[0]).format('YYYY-MM-DD HH:mm');
      _val.releaseTimeEn = moment(time[1]).format('YYYY-MM-DD HH:mm');
    }
    GetListApi(_val)
    .then((res)=> {
      let { result, everyPage, currentPage, total } =res.result;
      result = result?result:[];
      result.map((el,index)=>el.key = index);
      this.setState({
        dataList:result,
        dataPagation:{everyPage,currentPage,total},
        loading:false,
      })
    },err=> {
      this.setState({ loading:false })
    })
  }
  changePage = (currentPage, everyPage) => {
    this.setState({
      dataPagation:{everyPage,currentPage},
    },()=> {
      this.searchList()
    })
  };
  onShowSizeChange = (currentPage, everyPage) => {
    this.setState({
      dataPagation:{everyPage,currentPage},
    },()=> {
      this.searchList()
    })
  };
  onSubmit = params => {
    this.setState({ fields:params },()=> {
      this.searchList()
    })
  };
  //操作区
  handleOperateClick=(record, type)=> {
    switch (type) {
      case "ban"://禁用
        this.goForcedEnd(record);
        break;
    }
  }
  goForcedEnd=(record)=> {
    let contentTips = record.status == 2 ?
          <span>
            当前版本处于待发布状态，禁用后将不会发布到线上，您确定禁用此版本么？
          </span>
          :
          <span>当前版本禁用后将不继续编辑，您确定禁用此版本么？</span>
    Modal.confirm({
      title:"版本禁用",
      content: contentTips,
      onOk() {
        GetBitApi(record.homepageId)
        .then((res) => {
          searchList()
          Qmessage.success('禁用成功')
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  handleAdd=()=>{ this.setState({ visible:true }) }
  onCancel=()=>{ this.setState({ visible:false }) }
  onOk=()=>{
    this.setState({ visible:false });
    this.searchList();
  }
  render() {
    const { loading, dataList, dataPagation, visible } =this.state;
    return (
      <Spin tip="加载中..." spinning={loading}>
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit}/>
          <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={this.handleAdd}>新增首页版本</Qbtn>
          </div>
          <Qtable
            columns={Columns}
            dataSource={dataList}
            onOperateClick={this.handleOperateClick}/>
          <Qpagination
            data={dataPagation}
            onChange={this.changePage}
            onShowSizeChange={this.onShowSizeChange}/>
          <AddModal
            onOk={this.onOk}
            onCancel={this.onCancel}
            visible={visible}
            {...this.props}/>
        </div>
      </Spin>
    )
  }
}
export default CtipContent;
