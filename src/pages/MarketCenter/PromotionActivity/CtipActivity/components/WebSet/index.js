import React , { Component } from 'react';
import moment from 'moment';
import { Button, Card, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import UpLoadImgMod from '../UpLoadImgMod';
import { disabledDate, disabledDateTime } from '../../../components/dateSet.js';

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
class WebSet extends Component {
  //时间校验
  validator=(rule, value, callback)=> {
    let { activityInfo } =this.props;
    var a = moment(activityInfo.time[0]);
    var b = moment(value);
    let d= a.from(b);
    let timeMins = a.diff(b,'seconds');
    if(activityInfo.time) {
      let actiTime = activityInfo.time[0];
      let isBefore = moment(value).isBefore(actiTime)||moment(value).isSame(actiTime);
      if (isBefore) {
        return Promise.resolve();
      }
      return Promise.reject('时间只能选择活动开始之前的时间或与开始时间相同。');
      // if(!isBefore) {
      //   callback('时间只能选择活动开始之前的时间或与开始时间相同。');
      // } else if(timeMins>259200){
      //   callback('时间最多提前72小时');
      // }else {
      //   callback();
      // }
    } else {
      return Promise.resolve();
    }
  }
  render() {
    const { activityInfo } =this.props;
    return(
      <Card title="前端展示">
        <UpLoadImgMod
          formItemLayout={formItemLayout}
          name="websiteBanner"
          label="促销活动页头图"
          width={1}
          height={5}
          imgType={3}
          ruleType={3}
          fileList={activityInfo.websiteBanner}
          form={this.props.form}/>
        <FormItem name="isBanner" label='是否需要商详横幅条' rules={[{ required: true, message: '请选择是否需要商详横幅条'}]}>
          <Radio.Group >
           <Radio value={1}>是</Radio>
           <Radio value={0}>否</Radio>
         </Radio.Group>
        </FormItem>
        {/*<FormItem label='是否需要预热' {...formItemLayout}>
         {
           getFieldDecorator('isWarmUp', {
             rules: [{ required: true, message: '请选择是否需要预热'}],
             initialValue:activityInfo.isWarmUp
           })(
             <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
           )
         }
        </FormItem>*/}
        {
          !!activityInfo.isBanner&&activityInfo.isBanner!=undefined&&
          <div>
            <FormItem
              label='横幅条开始展示时间'
              name="bannerBeginTime"
              rules={[
                { required: true, message: '请设置横幅条开始展示时间'},
                { validator:this.validator}
              ]}>
              <DatePicker
                disabled={activityInfo.time?false:true}
                showTime
                format ="YYYY-MM-DD HH:mm:ss"/>
            </FormItem>
            {
              activityInfo.promotionType!=10&&
              <div>
                <FormItem label='横幅条标题' name="bannerTitle" rules={[{ required: true, message: '请输入横幅条标题'}]}>
                  <Input
                    className="ant-input-fixed"
                    placeholder="请输入横幅条标题，14字符以内"
                    maxLength='14'
                    autoComplete="off"/>
                </FormItem>
                <FormItem label='横幅条副标题'>
                  <FormItem name="bannerSubtitle" rules={[{ required: true, message: '请输入横幅条副标题'}]}>
                    <Input
                      className="ant-input-fixed"
                      placeholder="请输入横幅条副标题，18字符以内"
                      maxLength='18'
                      autoComplete="off"/>
                  </FormItem>
                  <p className="tips-info">此字段会展示在APP/小程序上，请谨慎填写</p>
                </FormItem>
              </div>
            }
            <UpLoadImgMod
              rules={[{required:true,message:'请上传图片'}]}
              formItemLayout={formItemLayout}
              name="pdDetailBannerPic"
              label="商品详情页横幅条背景图"
              width={25}
              height={4}
              fileList={activityInfo.pdDetailBannerPic}
              form={this.props.form}/>
          </div>
        }
        <FormItem label='是否需要主题logo图' name="isLogo" rules={[{ required: true, message: '请选择是否需要主题logo图'}]}>
          <Radio.Group >
           <Radio value={1}>是</Radio>
           <Radio value={0}>否</Radio>
         </Radio.Group>
        </FormItem>
        {
          !!activityInfo.isLogo&&activityInfo.isLogo!=undefined&&
          <div>
            <FormItem
              label='logo图开始展示时间'
              name="logoBeginTime"
              rules={[
                { required: true, message: '请设置横幅条开始展示时间'},
                { validator:this.validator }
              ]}>
              <DatePicker
                disabled={activityInfo.time?false:true}
                showTime
                format ="YYYY-MM-DD HH:mm:ss"/>
            </FormItem>
            <UpLoadImgMod
              rules={[{required:true,message:'请上传图片'}]}
              formItemLayout={formItemLayout}
              name="logoPic"
              label="活动主题logo图"
              width={1}
              height={1}
              imgType={2}
              fileList={activityInfo.logoPic}
              form={this.props.form}/>
          </div>
        }
        <FormItem label='营销活动页商品排序规则' name="collation" rules={[{ required: true, message: '请选择营销活动页商品排序规则'}]}>
          <Radio.Group >
           <Radio value={1}>按最新上架排序</Radio>
           <Radio value={2}>按近30天App+POS的销量排序</Radio>
         </Radio.Group>
        </FormItem>
      </Card>
    )
  }
}

export default WebSet;
