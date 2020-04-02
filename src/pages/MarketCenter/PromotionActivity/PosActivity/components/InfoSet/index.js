import React , { Component } from 'react';
import moment from 'moment';
import NP from 'number-precision';
import lodash from 'lodash';
import { Card, Tag, Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, Table} from 'antd';
import { disabledDate, disabledDateTimeRange } from '../../../components/dateSet';
import { purposeTypesOption,singleShareOption, levelOption } from '../../../components/optionMap.js';
import { GetValidCoupon } from 'api/marketCenter/CtipActivity';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const format ="YYYY-MM-DD HH:mm:ss";

const InfoSet=({...props})=> {
  let { activityInfo } =props;
  let isEdit = activityInfo.promotionId?true:false;
  return(
      <Card title="活动信息">
        {
        activityInfo.promotionId&&
          <div>
            <FormItem label='活动ID'>
             {activityInfo.promotionId}
            </FormItem>
            <FormItem label='活动状态'>
             {activityInfo.statusStr}
            </FormItem>
          </div>
        }
        <FormItem label='活动名称' name="name" rules={[{ required: true, message: '请输入活动名称'}]}>
         <Input
           disabled={isEdit}
           className="ant-input-fixed"
           placeholder="请输入活动名称" maxLength='30' autoComplete="off"/>
        </FormItem>
        <FormItem label='活动时间'>
          <FormItem name="time" rules={[{ required: true, message: '请选择活动时间'}]}>
            <RangePicker
              disabled={isEdit}
              className="ant-input-fixed"
              format={format}
              disabledDate={disabledDate}
              disabledTime={disabledDateTimeRange}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: moment('00:00', 'HH:mm'),
              }}/>
          </FormItem>
          <span className="suffix_tips">
            活动时间一旦选定将无法更改，请谨慎填写
          </span>
        </FormItem>
        <FormItem label='活动目的' name="purposeTypes" rules={[{ required: true, message: '请选择活动目的'}]}>
          <Checkbox.Group style={{ width: '100%' }}>
            {
              purposeTypesOption.map((el) => (
                <Checkbox value={el.key} key={el.key}>{el.value}</Checkbox>
              ))
            }
         </Checkbox.Group>
        </FormItem>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.purposeTypes !== currentValues.purposeTypes}>
          {({ getFieldValue }) => {
            return getFieldValue('purposeTypes')&&getFieldValue('purposeTypes').indexOf('5') !="-1"&&
            <FormItem label='其他' name="otherPurpose" rules={[{ required: true, message: '请输入其他目的'}]}>
              <Input.TextArea
                className="ant-input-fixed"
                placeholder="请输入其他目的"
                rows={2}
                maxLength='100'
                autoComplete="off"/>
             </FormItem>
          }}
        </Form.Item>
        <FormItem label='活动级别'>
          <FormItem name="level" rules={[{ required: true, message: '请选择活动级别'}]}>
            <Radio.Group >
                {
                  levelOption.map((el) => (
                    <Radio value={el.key} key={el.key}>{el.value}</Radio>
                  ))
                }
             </Radio.Group>
           </FormItem>
          <p className="tips-info">S、A级活动：总费用&#62;&#61;5万元且折扣率&#62;5&#37;，B、C级活动：总费用小于等于5万元且折扣率&#60;5&#37;</p>
        </FormItem>
        <FormItem label='活动端'> 门店POS</FormItem>
        <FormItem label='活动门店'>全部门店</FormItem>
        { props.children }
        <FormItem label='促销类型' name="promotionType">
          <Radio.Group>
            {
              singleShareOption.map((el,index) => (
                <Radio key={el.key} value={el.key} disabled={true}>{el.value}</Radio>
              ))
            }
         </Radio.Group>
       </FormItem>
      </Card>
  )
}

export default InfoSet;
