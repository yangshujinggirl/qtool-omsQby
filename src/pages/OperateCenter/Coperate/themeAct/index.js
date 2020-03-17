import React, { Component } from 'react';
import {Button,message,Modal} from 'antd'
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import ConfirmCancel from './components/confirmCancel.js'
import {forceInvalidApi,activityOnlineApi} from '../../../services/operate/themeAct/index'

class ThemeAct extends Component{
  constructor(props){
    super(props);
    this.state = {
      confirmVisible:false,
      confirmLoading:false,
      onlineVisible:false,
      lineLoading:false,
      inputValues:{
        themeStatus:4
      },
      rowSelection:{
        selectedRowKeys:this.props.themeAct.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      rowSelection : {
        selectedRowKeys:props.themeAct.selectedRowKeys,
        type:'radio',
        onChange:this.onChange
      },
    });
  }
  onChange =(selectedRowKeys,selectedRows)=> {
    const {rowSelection}=this.state;
    this.setState({
      rowSelection:Object.assign({},rowSelection,{selectedRowKeys})
    });
    if(selectedRows[0]){
      this.setState({
        showTimeEnd:selectedRows[0].showTimeEnd,
        showTimeStart:selectedRows[0].showTimeStart,
        themeName:selectedRows[0].themeName,
        themeActivityId:selectedRows[0].themeActivityId,
        selectedRows:selectedRows[0],
      });
    };
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:values
    });
    this.setState({
      inputValues:values
    });
  }
  //点击分页
  changePage =(current,limit)=> {
    const currentPage = current-1;
    const values = {...this.state.inputValues,currentPage,limit}
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:values
    });
  }
  //pageSize改变时的回调
  onShowSizeChange =({currentPage,limit})=> {
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:{currentPage,limit,...this.state.inputValues}
    });
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'themeAct/fetchList',
      payload:{themeStatus:4}
    })
  }
  //新增主题
  addTheme =()=> {
    const {inputValues} = this.state;
    const paneitem = {
      title:'新增主题',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
      data:{
        inputValues
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }

  setConfirmLoading =()=> {
    this.setState({
      confirmLoading:true
    });
  }

  //操作
  handleOperateClick(record,type) {
    const {inputValues} =  this.state;
    if(type == 'edit'){
      const paneitem = {
        title:'修改主题',
        key:`${this.props.componkey}edit`+record.themeActivityId,
        componkey:`${this.props.componkey}edit`,
        data:{
          inputValues,
          infos:{
            themeName:record.themeName,
            pageCode:record.pageCode,
            subtitle:record.subtitle,
            description:record.description,
            themeStatus:record.themeStatus,
            indexPicUrl:record.indexPicUrl,
            listPagePicUrl:record.listPagePicUrl,
            themeActivityId:record.themeActivityId
          }
        },
      };
      this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      });
    }else{
      if(record.themeStatus<4){
        message.error('此数据为首页改版前的旧数据，不可上线');
      }else{
        this.setState({
          onlineVisible:true,
          onlineType:type,
          themeActivityId:record.themeActivityId
        });
      };
    };
  }
  //点击强制失效
  forceCancel=()=>{
    if(this.state.themeActivityId){
      if(this.state.selectedRows.themeStatus == 2){
        return message.error('当前状态无法强制失效')
      };
      if(this.state.selectedRows.themeStatus == 3){
        return message.error('当前状态已失效')
      };
      this.setState({
        confirmVisible:true
      });
    }else{
      message.error('请选择要失效的选项',.8)
    };
  }
  //改变弹窗确认的loading
  changeLoading =(value)=> {
    this.setState({
      confirmLoading:value
    })
  }
  //强制失效点击取消
  onCancel =(resetFiledsFunc)=> {
    this.setState({confirmVisible:false})
    resetFiledsFunc()
  }
  //强制失效点击确定
  onOk =(values,resetFiledsFunc)=> {
    values.themeActivityId = this.state.themeActivityId;
    forceInvalidApi(values)
    .then((res) => {
      if(res.code == '0'){
        message.success(res.message);
        resetFiledsFunc();//清除数据
        this.props.dispatch({ //刷新列表
          type:'themeAct/fetchList',
          payload:{...this.state.inputValues,...this.props.themeAct.limit,...this.props.themeAct.currentPage}
        });
        this.setState({confirmVisible:false,confirmLoading:false,themeActivityId:''});
      }else{
        this.setState({confirmLoading:false});
      };
    });
  }
  //上下线的ok
  onLineOK=()=>{
    this.setState({
      lineLoading:true
    });
    const {onlineType,themeActivityId} = this.state;
    let themeStatus = 4;
    if(onlineType == 'offline'){
      themeStatus = 5;
    };
    activityOnlineApi({themeActivityId,themeStatus}).then(res=>{
      if(res.code =='0'){
        this.props.dispatch({
          type:'themeAct/fetchList',
          payload:{...this.state.inputValues}
        });
        this.setState({
          onlineVisible:false,
          lineLoading:false
        });
      }else{
        this.setState({
          lineLoading:false
        });
      };
    })
  }
  onLineCancel=()=>{
    this.setState({
      onlineVisible:false
    });
  }
  render(){
    const {
      confirmLoading,
      confirmVisible,
      themeName,
      showTimeStart,
      showTimeEnd,
      onlineVisible,
      lineLoading,
      onlineType
    } = this.state;
    const {dataList} = this.props.themeAct;
    const {rolelists} = this.props.data
    //新增主题
    const addtheme = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.theme.activity.save"
    })
    //强制失效
    const confirmInval = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.theme.activity.invalid"
    });
    dataList[0]&&dataList.map(item=>(
      item.addtheme = addtheme
    ));
    return(
      <div className='qtools-components-pages'>
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {
            addtheme&&
            <Button onClick={this.addTheme}  size='large' type='primary'>新增主题</Button>
          }
        </div>
        <Qtable
          onOperateClick = {this.handleOperateClick.bind(this)}
          dataSource = {dataList}
          columns = {Columns}
          select
          rowSelection = {this.state.rowSelection}
        />
        {
          dataList.length>0?
          <Qpagination
            data={this.props.themeAct}
            onChange={this.changePage}
            onShowSizeChange = {this.onShowSizeChange}
          />:null
        }
        <ConfirmCancel
          changeLoading={this.changeLoading}
          confirmLoading={confirmLoading}
          themeName={themeName}
          showTimeStart={showTimeStart}
          showTimeEnd={showTimeEnd}
          visible={confirmVisible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
        <Modal
          wrapClassName='model_center'
          visible={onlineVisible}
          onOk={this.onLineOK}
          confirmLoading={lineLoading}
          onCancel={this.onLineCancel}
          okText={onlineType=='online'?'确认上线':'确认下线'}
        >
          {
            onlineType=='online'
            ?
            <p>是否确认上线该主题</p>
            :
            <p>是否确认下线该主题</p>
          }
          
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state){
  const {themeAct} = state;
  return {themeAct};
}
export default connect(mapStateToProps)(ThemeAct);
