import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,Card,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Qtable, Qmessage, Qbtn, QupLoadImgLimt } from 'common';
import { GetSupplierApi, GetBaseInfoApi, GetSaveActivApi } from 'api/marketCenter/PosActivity';
import StepMod from '../components/StepMod';
import InfoSet from './components/InfoSet';
import Proration from '../../components/Proration';
import NotUseCoupon from '../components/NotUseCounpon';
// import './CtipActivityAdd.less';

let FormItem = Form.Item;
let Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
const formItemLayoutBig = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

const CtipActivityAdd =({...props})=> {
  const [form] = Form.useForm();
  let [activityInfo, setTotalData] =useState({websiteBanner:{},promotionType:10});
  let [ratioList, setRatioList] =useState([]);
  let [tagsList, setTagsList] =useState([]);
  let [couponList, setCouponList] =useState([]);
  let promotionId = props.match.params.id;
  //初始化
  const initPage=()=> {
    if(promotionId) {
      getBaseInfo()
    }
  }
  const goReturn=()=> {
    props.history.push('/account/pos_preferential_promotion')
  }
  const upDateCouponList=(array)=> {
    setCouponList(array)
  }
  const upDateRatioList=(array)=> {
    setRatioList(array)
  }
  const upDateTagList=(array)=> {
    setTagsList(array)
  }
  const getBaseInfo=()=> {
    GetBaseInfoApi(promotionId)
    .then((res)=> {
      let { costApportions, promtionShare } =res.result;
      let resData = {...res.result,...promtionShare};
      if(costApportions) {
        costApportions = costApportions.map((el) =>{
          el.key = el.costApportionId;
          if(el.bearer!="A"&&el.bearer!="B") {
            el.bearerType = "C"
          } else {
            el.bearerType = el.bearer;
          }
          return el;
        });
      }
      resData.time=[moment(resData.beginTime),moment(resData.endTime)];
      resData.bannerBeginTime=resData.bannerBeginTime?moment(resData.bannerBeginTime):null;
      resData.logoBeginTime=resData.logoBeginTime?moment(resData.logoBeginTime):null;
      if(resData.budget) {
        costApportions.map((el) =>el.budget = resData.budget)
      }
      let tagsArray = costApportions.filter(el => el.bearerType=='C');
      setTotalData(resData);
      setRatioList(costApportions);
      setTagsList(tagsArray);
    })
  }
  //提交
  const submit = async (saveType) => {
    try {
      let values = await form.validateFields();
      values = formatParams(values);
      GetSaveActivApi(values)
      .then((res)=> {
        const { promotionId, promotionType } =res.result;
        Qmessage.success('保存成功');
        let datas={
          beginTime:values.beginTime,
          endTime:values.endTime,
          pdKind:values.pdKind,
          promotionId:values.promotionId,
          promotionType,
          createUser:activityInfo.createUser
        }
        props.history.push({pathname:`/account/posActivity/addTwo/${promotionId}`,state:datas})
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const formatParams=(values)=> {
    let { time, costApportion, autoComplete, bearers, ...paramsVal} =values;
    if(time&&time.length>0) {
      paramsVal.beginTime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
      paramsVal.endTime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
    };
    if(ratioList.length>0) {
      paramsVal.bearers = ratioList.map((el) => {
        let item={};
        item.bearer = el.bearer;
        item.proportion = el.proportion;
        item.remark = el.remark;
        return item;
      });
      if(ratioList[0].budget) {
        paramsVal.budget = ratioList[0].budget;
      }
    }
    let activityNotUseCoupons = [];
    couponList.map(item=>{
      activityNotUseCoupons.push(item.couponId)
    });
    paramsVal = {
      ...paramsVal,
      platformType:2,
      activityNotUseCoupons:activityNotUseCoupons
    }
    if(promotionId) {
      paramsVal = {...paramsVal, promotionId};
    }
    return paramsVal;
  }
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    if(currentKey == 'bearers') {
      let newArray = [...allValues['bearers']];
      setRatioList(newArray);
    }
    if(currentKey=='list') {
      return;
    }
    if(currentKey == 'promotionType') {
      if(allValues.promotionScope==2&&allValues.promotionType!=22) {
        allValues.pdScope=2;
        allValues.pdKind=null;
      }
      if(allValues.promotionType==10) {
        allValues.bannerTitle=null;
        allValues.bannerSubtitle=null;
      }
    }
    if(currentKey == 'time') {
      allValues.warmUpBeginTime=null;
    }
    activityInfo = {...activityInfo,...allValues};
    setTotalData(activityInfo)
  }

  useEffect(()=>{
    initPage();
  },[promotionId])
  useEffect(()=>{ form.setFieldsValue(activityInfo) },[activityInfo])
  useEffect(()=>{ form.setFieldsValue({bearers:ratioList}) },[ratioList]);
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages ctipActivity-addEdit-pages">
        <StepMod step={0}/>
        <Form
          onValuesChange={onValuesChange}
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
            <InfoSet
              form={form}
              activityInfo={activityInfo}>
              <div>
                <Proration
                  supplierApi={GetSupplierApi}
                  upDateRatioList={upDateRatioList}
                  upDateTagList={upDateTagList}
                  tagsList={tagsList}
                  ratioList={ratioList}
                  form={form}/>
                <NotUseCoupon upDateList={upDateCouponList} couponList={couponList}/>
              </div>
            </InfoSet>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}> 返回 </Qbtn>
            <Qbtn size="free" onClick={()=>submit(1)}>保存并继续</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

export default CtipActivityAdd;
