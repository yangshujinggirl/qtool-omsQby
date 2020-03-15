import React, { Component } from 'react';
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import { createcPushApi } from '../../../services/activity/cPush'
import './index'
import moment from 'moment';

class cPush extends Component{
  constructor(props){
    super(props);
    this.state = {
      bsPushId:'',
      cPushName:'',
      isPushVisible:false,
      componkey:this.props.componkey,
      inputValues:{},
      rowSelection:{
         type:'radio',
         selectedRowKeys:this.props.cPush.selectedRowKeys,
         onChange:this.onChange
       }
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      rowSelection : {
        selectedRowKeys:props.cPush.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
    });
  }
  onChange =(selectedRowKeys, selectedRows) =>{
    // 消除选中状态
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    // 消除选中状态
    if(selectedRows[0]){
      this.setState({
        title:selectedRows[0].title,
        bsPushId:selectedRows[0].bsPushId,
        selectedRows:selectedRows[0]
      });
    };
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    })
  }

  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'cPush/fetchList',
      payload:{}
    })
  }
  //新增推送
  addPush =()=> {
    const paneitem = {
      title:'新建推送',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //点击跳转详情页
  getDetail(record){
    const paneitem = {
      title:'推送详情',
      key:`${this.state.componkey}editInfo`+record.bsPushId,
      componkey:`${this.state.componkey}info`,
      data:{
        bsPushId:record.bsPushId,
        title:record.title,
        pushTime:record.pushTime,
        msgContent:record.msgContent,
        alertTypeStr:record.alertTypeStr,
        pushMan:record.pushMan,
        pushContent:record.alertTypeContent
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //修改推送
  getEdit(record){
    const { limit, currentPage } = this.props.cPush;
    const paneitem = {
      title:'修改推送',
      key:`${this.state.componkey}edit`+record.bsPushId,
      componkey:`${this.state.componkey}edit`,
      data:{
        bsPushId:record.bsPushId,
        status:record.status,
        listParams:{
          ...this.state.inputValues,
          limit,
          currentPage
        }
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  //处理表格的点击事件
  handleOperateClick(record,type){
    switch(type) {
      case "detail":
        this.getDetail(record)
        break;
      case "edit":
        this.getEdit(record)
        break;
    }
  }
  //撤销推送
  cancelPush =()=> {
    if(!this.state.bsPushId){
      message.warning('请选择要撤销的推送',.8);
    }else{
      if(this.state.selectedRows.status == 10){
        this.setState({isPushVisible:true})
      }else{
        message.warning('只有待推送状态才可撤销');
        this.onChange([],[])
      };
    };
  }
  //确定撤销
  onOk =()=>{
    const {
      title,
      pushTime,
      msgContent,
      alertTypeStr,
      pushPerson,
      bsPushId,
      pushNow,
      alertType,
      alertTypeContent} = this.state.selectedRows;
    const values = {
      title,
      pushTime,
      pushNow,
      msgContent,
      alertTypeStr,
      alertType,
      pushPerson,
      bsPushId,
      status:30,
      alertTypeContent
    };
    createcPushApi(values)
    .then(res => {
      const { limit, currentPage } = this.props.cPush;
      if(res.code=='0'){
        message.success(res.message);
        this.props.dispatch({
          type:'cPush/fetchList',
          payload:{
            ...this.state.inputValues,
            limit,
            currentPage
          }
        });
        this.setState({isPushVisible:false})
      }else{
        this.setState({isPushVisible:false});
        this.onChange([],[]);
      }
    })
  }
  //取消撤销
  onCancel =()=>{
    this.setState({isPushVisible:false});
    this.onChange([],[])
  }

  render(){
    const rolelists=this.props.data.rolelists
    //新增推送
    const addPush=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.cpush.save"
		})
    //撤销推送
    const revokePush=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.cpush.revoke"
		})
    const {dataList} = this.props.cPush;
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {
            addPush?
              <Button
                onClick={this.addPush}
                size='large'
                type='primary'>
                新增推送
              </Button>
            :null
          }
          {
            revokePush?
              <Button
                onClick={this.cancelPush}
                size='large'
                type='primary'>
                撤销推送
              </Button>
            :null
          }
        </div>
        <Modal
            bodyStyle={{fontSize:'24px','padding':'50px'}}
            visible= {this.state.isPushVisible}
            cancelText="不撤销了"
            okText='确定撤销'
            onCancel= {this.onCancel}
            onOk = {this.onOk}
          >
            <p>你正在撤消标题为{this.state.title}的推送，确认撤消？</p>
        </Modal>
        <Qtable
          dataSource = {dataList}
          columns = {Columns}
          onOperateClick = {this.handleOperateClick.bind(this)}
          select
          rowSelection = {this.state.rowSelection}
        />
        {
          dataList.length>0?
          <Qpagination
            data={this.props.cPush}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }
      </div>
    );
  }
}
function mapStateToProps(state){
  const {cPush} = state;
  return {cPush};
}
export default connect(mapStateToProps)(cPush);
