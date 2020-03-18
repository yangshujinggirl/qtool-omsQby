import React , { Component } from 'react';
import moment from 'moment';
import NP from 'number-precision';
import { Card, Tag, Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, Table} from 'antd';
import { disabledDate, disabledDateTimeRange } from '../dateSet.js';
import { ColumnsCreat } from '../../columns';
import {
  pdScopeOption,singleOption,promotionScopeOption,
  prefectureOption, purposeTypesOption,pdKindOption,
  levelOption, prefShareOption, singleShareOption } from '../optionMap.js';
import { GetSuppliApi, GetValidCoupon } from 'api/marketCenter/CtipActivity';
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
const bearMap={
  'A':'Qtools',
  'B':'门店',
  'C':'供应商',
}

class InfoSet extends Component {
  constructor(props) {
    super(props);
    this.state ={
      supplierList:[],
      notUseCoupons: [],
      tagsCouponList: []
    }
  }
  //分成校验
  validatorRatio=(rule, value)=> {
    let { activityInfo, ratioList, form } =this.props;
    let { bearers } =form.getFieldsValue(['bearers']);
    let total =0;
    bearers.forEach((el)=> {
      if(el.proportion) {
        total+=Number(el.proportion);
      }
    })
    if (total <= 100) {
      return Promise.resolve();
    }
    return Promise.reject('承担比例总和不能超过100');
  }
  //供应商
  handleSearch=(value)=> {
    GetSuppliApi({name:value})
    .then((res) => {
      const { suppliers } =res;
      if(res.code == '0') {
        this.setState({ supplierList:suppliers });
      }
    })
  }
  onSelect=(value, option)=> {
    let { ratioList } =this.props;
    let keyValue = `C${value}`;
    let idx = ratioList.findIndex(el => el.key == keyValue);
    if(idx =='-1') {
      ratioList.push({
        key:keyValue,
        bearerType:'C',
        bearerStr:option.props.children,
        bearer:value
      });
      this.props.upDateList(ratioList);
    }
  }
  handleClose=(removedTag)=> {
    let { ratioList } =this.props;
    const { bearers } =this.props.form.getFieldsValue(['bearers']);
    let tags = ratioList.filter(tag => tag.key !== removedTag.key);
    this.props.upDateList(tags);
    this.props.form.resetFields(['bearers'])
  }
  changeRange=(value)=>{
    // this.props.form.resetFields(['logoBg'])
  }
  changePromotion=(e)=>{
    // this.props.form.resetFields(['pdScope','pdKind','bannerSubtitle','bannerTitle'])
  }
  changeTime=(e)=>{
    // this.props.form.resetFields(['warmUpBeginTime'])
  }
  changePromotionScope=(e)=>{
    // this.props.form.resetFields(['promotionScope'])
  }
  changeBearActi=(value)=>{
    let { ratioList } =this.props;
    let newArr=[];
    let tagsList = ratioList.filter(el => el.bearerType=='C');
    let fixedList = ratioList.filter(el => el.bearerType!='C');
    let valMap={};
    fixedList.map((el) => {
      if(!valMap[el.bearerType]) {
        valMap[el.bearerType]=el;
      }
    })
    let isIdx = value.findIndex((el) =>el=='C');
    if(isIdx=='-1') {
      tagsList = [];
    }
    value&&value.map((el,index) => {
      if(el!='C') {
        if(valMap[el]) {
          newArr.push(valMap[el])
        } else {
          let item={}
          item.bearer = el;
          item.bearerType = el;
          item.bearerStr =  bearMap[el];
          item.key = `${el}${index}`;
          newArr.push(item)
        }
      }
     });
    ratioList=[...newArr,...tagsList];
    this.props.upDateList(ratioList);
    this.props.form.resetFields(['bearers'])
  }
  //搜索不可用优惠券
  handleCouponSearch = e => {
    if (e.target.value) {
      const value = e.target.value.trim();
      let { tagsCouponList } = this.state;
      let isRepeat = -1;
      if (tagsCouponList.length > 0) {
        //如果列表中有--->拒绝重复请求
        isRepeat = tagsCouponList.findIndex(item => item.couponCode == value);
      }
      if (isRepeat == -1) {
        GetValidCoupon(value)
        .then(res => {
          let { result } =res;
          tagsCouponList = result.couponId?[...tagsCouponList,...[result]]:tagsCouponList;
          this.setState({ tagsCouponList });
        });
      }
    }
  };
  //不可用优惠券发生变化
  handleNotUse = e => {
    if (e.target.value == 2) {
      this.setState({ tagsCouponList:[] });
    };
  };
  //关闭
  handleCloseCoupon = removedTag => {
    const tagsCouponList = this.props.tagsCouponList.filter(
      item => item.couponId !== removedTag.couponId
    );
    this.setState({ tagsCouponList });
  };
  render() {
    let { activityInfo, ratioList, tagsList } =this.props;
    const { supplierList,tagsCouponList } =this.state;
    let blColumns = ColumnsCreat(this.validatorRatio,ratioList);
    let providerIndex = activityInfo.costApportion&&activityInfo.costApportion.findIndex((el)=>el == 'C');
    let isJoinZq=activityInfo.platform&&activityInfo.platform.includes('2');
    let rangeOption = activityInfo.promotionScope==1?(isJoinZq?singleShareOption:singleOption):prefectureOption;
    let isEdit =activityInfo.promotionId?true:false;
    console.log(activityInfo)
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
          <FormItem label='C端活动名称'>
            <FormItem name="cname" rules={[{ required: true, message: '请输入C端活动名称'}]}>
             <Input
               disabled={isEdit}
               className="ant-input-fixed"
               placeholder="请输入活动名称" maxLength='30' autoComplete="off"/>
            </FormItem>
            <span className="suffix_tips">
              如展示活动商品横幅条则会出现在C端活动预告中，请谨慎填写
            </span>
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
              return getFieldValue('purposeTypes') == "5"&&
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
          <FormItem label='活动端'>
            <FormItem name="platform" rules={[{ required: true, message: '请选择活动端'}]}>
              <Checkbox.Group disabled={isEdit} onChange={this.changePromotionScope}>
                 <Checkbox value="1">线上App/小程序</Checkbox>
                 <Checkbox value="2">门店POS</Checkbox>
              </Checkbox.Group>
            </FormItem>
             <p className="tips-info">注：门店POS目前仅支持单品直降，如勾选此项则无法选择其他促销类型。</p>
           </FormItem>
          <FormItem label='活动门店'>全部门店</FormItem>
          <FormItem label='活动成本承担方' {...formItemLayout}>
            <FormItem name="costApportion" rules={[{ required: true, message: '请选择活动成本承担方'}]} noStyle>
              <Checkbox.Group onChange={this.changeBearActi}>
                 <Checkbox value="A">Qtools</Checkbox>
                 <Checkbox value="B">门店</Checkbox>
                 <Checkbox value="C">供应商</Checkbox>
              </Checkbox.Group>
            </FormItem>
            {providerIndex != undefined && providerIndex != "-1" &&
              <FormItem name="autoComplete" noStyle>
                  <AutoComplete
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}>
                    {supplierList.map(el => (
                      <AutoComplete.Option key={el.pdSupplierId}>
                        {el.name}
                      </AutoComplete.Option>
                    ))}
                </AutoComplete>
              </FormItem>
            }
          </FormItem>
          <div className="supplier-tags-wrap">
            {
              tagsList.map((el)=> (
                <Tag
                  closable
                  key={el.key}
                  onClose={()=>this.handleClose(el)}>
                  {el.bearerStr}
                </Tag>
              ))
            }
          </div>
          <FormItem label='活动成本分摊比例'>
            <Table
              onRow={record => {
                return {
                  "data-row-key":record.key,
                };
              }}
              className="bl-table-wrap"
              bordered
              pagination={false}
              columns={blColumns}
              dataSource={ratioList}/>
          </FormItem>
          <FormItem label='促销范围' name="promotionScope" rules={[{ required: true, message: '请输入商品名称'}]}>
            <Radio.Group disabled={isEdit} onChange={this.changeRange}>
              {
                promotionScopeOption.map((el)=> (
                  <Radio
                    value={el.key}
                    key={el.key}
                    disabled={(el.key==2&&isJoinZq)?true:false}>{el.value}</Radio>
                ))
              }
           </Radio.Group>
          </FormItem>
          {
            activityInfo.promotionScope&&
            <FormItem label='促销类型' name="promotionType" rules={[{ required: true, message: '请选择促销类型'}]}>
              <Radio.Group onChange={this.changePromotion}>
                {
                  rangeOption.map((el,index) => (
                    <Radio key={el.key} value={el.key} disabled={isEdit}>{el.value}</Radio>
                  ))
                }
             </Radio.Group>
            </FormItem>
          }
          <FormItem label="请选择不可使用的优惠券" name="activityCouponStatus">
            <Radio.Group onChange={this.handleNotUse}>
              <Radio value={3}>全部优惠券不可用</Radio>
              <Radio value={1}>全部优惠券均可用</Radio>
              <Radio value={2}>部分优惠券不可用</Radio>
            </Radio.Group>
          </FormItem>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.activityCouponStatus !== currentValues.activityCouponStatus}>
            {({ getFieldValue }) => {
              return getFieldValue('activityCouponStatus')=='2'&&
              <Form.Item label='请选择不可使用的优惠券'>
                <Form.Item name="tagsCouponList" rules={[{ required: true, message: '请选择促销级别'}]}>
                  <Input
                    autoComplete="off"
                    style={{ width: "200px" }}
                    placeholder="请输入优惠券批次号"
                    onBlur={this.handleCouponSearch}
                    onPressEnter={this.handleCouponSearch}/>
                </Form.Item>
                <Form.Item>
                   {tagsCouponList.length > 0 &&
                     tagsCouponList.map(el => (
                       <Tag
                         closable
                         key={el.couponId}
                         onClose={() => this.handleCloseCoupon(el)}
                       >
                         {el.couponCode}
                       </Tag>
                     ))}
                </Form.Item>
               </Form.Item>
            }}
          </Form.Item>
          {
            activityInfo.promotionScope == 2 && activityInfo.promotionType &&
            <FormItem label='促销级别' name="pdScope" rules={[{ required: true, message: '请选择促销级别'}]}>
              <Radio.Group disabled={isEdit}>
                {
                  pdScopeOption.map((el,index) => (
                    <Radio
                      value={el.key} key={el.key}
                      disabled={(el.key==1)?true:false}>{el.value}</Radio>
                  ))
                }
             </Radio.Group>
             </FormItem>
          }
          {
            activityInfo.pdScope == 2 && activityInfo.promotionScope == 2 &&
            <FormItem label='商品种类'>
              <FormItem name="pdKind" rules={[{ required: true, message: '请选择商品种类'}]}>
                 <Radio.Group disabled={isEdit}>
                    {
                      pdKindOption.map((el)=> (
                        <Radio
                          value={el.key}
                          key={el.key}
                          disabled={el.key==3&&activityInfo.promotionType!=22?true:false}>
                          {el.value}
                        </Radio>
                      ))
                    }
                 </Radio.Group>
               </FormItem>
               <p className="tips-info">由于App购物车此三类商品需分开结算，所以为保证用户体验，此三种商品不可同时参与一档专区活动</p>
             </FormItem>
           }
        </Card>
    )
  }
}

export default InfoSet;
