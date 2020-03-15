import React, { Component } from 'react';
import {Button,message,Modal} from 'antd'
import {connect} from 'dva'
import Columns from './columns/index'
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination/index'; //分页
import FilterForm from './FilterForm/index'
import InjectCoupons from './InjectCoupon'
import { InjectCouponApi } from '../../../services/activity/coupon'
import { fuseCouponApi } from '../../../services/activity/coupon'


class Coupon extends Component{
  constructor(props){
    super(props);
  }
  state = {
    isFuseVisible:false,//熔断弹窗是否显示
    isVisible:false,
    componkey:this.props.componkey,
    field:{
      customServiceNo:'',
      customServiceTheme:'',
      waiter:'',
      status:'',
      handleTime:'',
    },
  }
  //点击搜索
  searchData = (values)=> {
    this.props.dispatch({
      type:'coupon/fetchList',
      payload:values
    })
  }
  //点击分页
  changePage =(currentPage)=> {
    const values = {...this.state.field,currentPage}
    this.props.dispatch({
      type:'coupon/fetchList',
      payload:values
    })
  }
  //搜索框数据发生变化
  searchDataChange =(values)=> {
    const {rangePicker,..._values} = values;
    if(rangePicker){
      _values.createTimeST =  rangePicker[0]._d.getTime();
      _values.createTimeET = rangePicker[1]._d.getTime();
    }
    this.setState({field:_values});
  }
  //初始化数据
  componentWillMount(){
    this.props.dispatch({
      type:'coupon/fetchList',
      payload:{}
    })
  }
  //创建优惠券
  createCoupon =()=>{
    const paneitem = {
      title:'创建优惠券',
      key:`${this.state.componkey}edit`,
      componkey:`${this.state.componkey}edit`,
      data:{
        pdSpuId:null,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  //注券记录
  addCouponToUserRecord =()=> {
    const paneitem = {
      title:'注券记录',
      key:`${this.state.componkey}editconfig`,
      componkey:`${this.state.componkey}editconfig`,
      data:{
        pdSpuId:null,
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  //熔断优惠券
  fuseCoupon =()=> {
    this.setState({isFuseVisible:true})
  }
  //确认熔断
  onfuseOk =()=>{
    const id=1;
    fuseCouponApi(id)
    .then(res=>{
      if(res.code == '0'){
        message.success('熔断成功');
      }
    },err=>{
      message.success('熔断失败，代金券已发放完毕');
    })
    this.setState({isFuseVisible:false})
  }
  //取消熔断
  onfuseCancel =()=> {
    this.setState({isFuseVisible:false})
  }
  //注券
  addCouponToUser =()=> {
    this.setState({isVisible:true})
  }
  //注券点击取消
  onCancel =()=> {
    this.setState({isVisible:false})
  }
  //注券点击确定
  onOk =(values)=> {
    InjectCouponApi(values)
    .then((res) => {
      if(res.code == '0'){
        res.message(res.message)
      }
    },err=>{
        message.error('失败');
    });
    this.setState({isVisible:false});
  }
  //操作
  handleOperateClick(record) {
    const paneitem = {
      title:'优惠券详情',
      key:`${this.state.componkey}info`,
      componkey:`${this.state.componkey}info`,
      data:{
        pdSpuId:record.spOrderId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }

  render(){
    const {dataList} = this.props.coupon;
    return(
      <div className='coupon'>
        <FilterForm
          submit={this.searchData}
          onValuesChange = {this.searchDataChange}
        />
        <div>
          <Button onClick={this.createCoupon} className='btn' type='primary'>创建优惠券</Button>
          <Button onClick={this.addCouponToUser} className='btn' type='primary'>注券</Button>
          <Button onClick={this.addCouponToUserRecord} className='btn' type='primary'>注券记录</Button>
          <Button onClick={this.fuseCoupon} className='btn' type='primary'>熔断</Button>
        </div>
        <Modal
            bodyStyle={{'font-size':'24px','text-align':'center','padding':'50px'}}
            visible= {this.state.isFuseVisible}
            okText="确认熔断"
            cancelText='不熔断了'
            onCancel= {this.onfuseCancel}
            onOk = {this.onfuseOk}
          >
            <p>你正在熔断代金券</p>
        </Modal>
        <InjectCoupons
          visible={this.state.isVisible}
          onCancel={this.onCancel}
          onOk={this.onOk}
        />
        <Qtable
          onOperateClick = {this.handleOperateClick.bind(this)}
          dataSource = {dataList}
          columns = {Columns}/>
        <Qpagination
          data={this.props.coupon}
          onChange={this.changePage}/>
      </div>
    )
  }
}
function mapStateToProps(state){
  const {coupon} = state;
  return {coupon};
}
export default connect(mapStateToProps)(Coupon);
