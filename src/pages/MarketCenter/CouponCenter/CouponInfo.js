import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,Card,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Qtable, Qmessage, Qbtn, QupLoadImgLimt } from 'common';
import { ColumnCb, ColumnGoods } from './columns';
import { GetInfoApi } from "api/marketCenter/CouponCenter";


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

const CouponInfo =({...props})=> {
  let couponId = props.match.params.id;
  let [loading,setLoading] =useState(false)
  let [totalData,setTotalData] =useState({})
  let [goodsList,setGoodsList] =useState([])
  let [brandDataSource,setBrandList] =useState([])
  let [cbList,setCbList] =useState([])
  //初始化
  const initPage=()=> {
    setLoading(true)
    GetInfoApi(couponId)
    .then((res) => {
      let { couponInfo, activityProduct, proportionList, bearerList, pdList } =res.result;
      couponInfo = {...couponInfo,...activityProduct };
      let { brandList } = couponInfo;
      pdList = pdList?pdList:[];
      brandList = brandList?brandList:[];
      proportionList = proportionList?proportionList:[];
      pdList.map((el,index)=>el.key=index);
      proportionList = proportionList.map((item,index) => {
        item.budget = couponInfo.budget;
        item.key = index;
        return item;
      });
      setTotalData(couponInfo)
      setBrandList(brandList)
      setGoodsList(pdList);
      setCbList(proportionList);
      setLoading(false)
    })
  }
  //返回
  const goReturn=()=> {
    props.history.push('/account/coupon_centre')
  }
  useEffect(()=>{
    initPage();
    return () => {
      setTotalData({})
      setGoodsList([])
    };
  },[couponId])

  return (
    <Spin tip="加载中..." spinning={loading}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
          <Card title="基础信息">
            <FormItem label="优惠券名称" {...formItemLayout}>
              {totalData.couponName}
            </FormItem>
            <FormItem label="优惠券说明" {...formItemLayout}>
              {totalData.couponExplain}
            </FormItem>
            <FormItem label="优惠券使用端" {...formItemLayout}>
              {totalData.platform == 1 ? "仅线上使用" : "线上线下通用"}
            </FormItem>
            <FormItem label="优惠券金额" {...formItemLayout}>
              {totalData.couponMoney}元
            </FormItem>
            <FormItem label="使用门槛" {...formItemLayout}>
              满{totalData.couponFullAmount}元可用
            </FormItem>
            <FormItem label="活动成本承担方" {...formItemLayout}>
              {cbList.map((item, index) => (
                <span key={item.bearer}>
                  {item.bearerName}
                  {index !== cbList.length - 1 ? "、" : ""}
                </span>
              ))}
            </FormItem>
            <FormItem label="活动成本分摊比例" {...formItemLayout}>
              <Qtable columns={ColumnCb} dataSource={cbList} />
            </FormItem>
            <FormItem label="优惠券有效期" {...formItemLayout}>
              {typeof(totalData.couponValidDay)== "number" ? (
                <label>用户领取当日起{totalData.couponValidDay}天可用</label>
              ) : (
                <label>
                  特定时间到：{moment(totalData.couponValidDateST).format('YYYY/HH/DD mm:ss')}--
                  {moment(totalData.couponValidDateET).format('YYYY/HH/DD mm:ss')}
                </label>
              )}
            </FormItem>
            <FormItem label="预计发放张数" {...formItemLayout}>
              {totalData.couponCount == -1
                ? "不限制"
                : totalData.couponCount + " 张"}
            </FormItem>
            <FormItem label="发放方式" {...formItemLayout}>
              {totalData.couponUseScene == 1
                ? "注册领取"
                : totalData.couponUseScene == 2
                ? "注券"
                : totalData.couponUseScene == 3
                ? "手动领取"
                : "系统自动发放到账"}
            </FormItem>
            <FormItem label="优惠券备注" {...formItemLayout}>
              {totalData.couponRemark}
            </FormItem>
          </Card>
          <Card title="适用商品范围">
            <FormItem label="适用商品类型" {...formItemLayout}>
              {totalData.couponUseScope == 1
                ? "一般贸易商品"
                : totalData.couponUseScope == 2
                ? "保税商品 "
                : totalData.couponUseScope == 4
                ? "全部商品"
                : "指定品牌"}
            </FormItem>
            {totalData.couponUseScope == "5" && (
              <FormItem label="选择品牌" {...formItemLayout}>
                {
                  brandList.map((item, index) => (
                    <span key={index}>
                      {item.name}{" "}
                      {index !== brandList.length - 1 ? "、" : ""}
                    </span>
                  ))}
              </FormItem>
            )}
            <FormItem label="选择商品" {...formItemLayout}>
              {totalData.spuScope == 0
                ? "全部商品"
                : totalData.spuScope == 1
                ? "指定商品可用 "
                : "指定商品不可用"}
                 {totalData.spuScope !== 0 && (
                <Qtable columns={ColumnGoods} dataSource={goodsList} />
              )}
            </FormItem>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}> 返回 </Qbtn>
          </div>
      </div>
    </Spin>
  );
}

export default CouponInfo;
