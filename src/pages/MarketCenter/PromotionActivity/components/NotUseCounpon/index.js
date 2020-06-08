import React , { Component } from 'react';
import moment from 'moment';
import NP from 'number-precision';
import lodash from 'lodash';
import { Card, Tag, Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, Table} from 'antd';
import { GetValidCoupon } from 'api/marketCenter/CtipActivity';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const format ="YYYY-MM-DD HH:mm:ss";

const formItemLayout = {
  labelCol: {
    span:4
  },
  wrapperCol: {
    span: 19
  }
};
const NotUseCoupon=({...props})=> {
  let tagsCouponList = lodash.cloneDeep(props.couponList);
  //搜索不可用优惠券
  const handleCouponSearch = e => {
    if (e.target.value) {
      const value = e.target.value.trim();
      let isRepeat = -1;
      if (tagsCouponList.length > 0) {//如果列表中有--->拒绝重复请求
        isRepeat = tagsCouponList.findIndex(item => item.couponCode == value);
      }
      if (isRepeat == -1) {
        GetValidCoupon(value)
        .then(res => {
          let { result } =res;
          tagsCouponList = result.couponId?[...tagsCouponList,...[result]]:tagsCouponList;
          props.upDateList(tagsCouponList)
        });
      }
    }
  };
  //不可用优惠券发生变化
  const handleNotUse = e => {
    if (e.target.value == 2) {
      props.upDateList([])
    };
  };
  //关闭
  const handleCloseCoupon = removedTag => {
    tagsCouponList = tagsCouponList.filter(
      item => item.couponId !== removedTag.couponId
    );
    props.upDateList(tagsCouponList)
  };
  return(
      <FormItem noStyle>
        <FormItem label="请选择不可使用的优惠券" name="activityCouponStatus">
          <Radio.Group onChange={handleNotUse}>
            <Radio value={3}>全部优惠券不可用</Radio>
            <Radio value={1}>全部优惠券均可用</Radio>
            <Radio value={2}>部分优惠券不可用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.activityCouponStatus !== currentValues.activityCouponStatus}>
          {({ getFieldValue }) => {
            return getFieldValue('activityCouponStatus')=='2'&&
            <FormItem label='请选择不可使用的优惠券'>
              <FormItem name="tagsCouponList">
                <Input
                  autoComplete="off"
                  style={{ width: "200px" }}
                  placeholder="请输入优惠券批次号"
                  onBlur={handleCouponSearch}
                  onPressEnter={handleCouponSearch}/>
              </FormItem>
              <FormItem noStyle>
                 {tagsCouponList.length > 0 &&
                   tagsCouponList.map(el => (
                     <Tag
                       closable
                       key={el.couponId}
                       onClose={() => handleCloseCoupon(el)}
                     >
                       {el.couponCode}
                     </Tag>
                   ))}
              </FormItem>
             </FormItem>
          }}
        </FormItem>
      </FormItem>
  )
}

export default NotUseCoupon;
