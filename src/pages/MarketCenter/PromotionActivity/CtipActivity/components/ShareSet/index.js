import React , { Component } from 'react';
import { connect } from "dva";
import moment from 'moment';
import { Button, Form, Input, DatePicker, Radio, Checkbox, AutoComplete, } from 'antd';
import UpLoadImgMod from '../UpLoadImgMod';

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};
const FormItem = Form.Item;
class ShareSet extends Component {
  render() {
    const { activityInfo } =this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <p className="info-title">分享设置</p>
        <FormItem label='c端是否可分享' {...formItemLayout}>
         {
           getFieldDecorator('isCshare', {
             rules: [{ required: true, message: '请选择c端是否可分享'}],
             initialValue:activityInfo.isCshare
           })(
             <Radio.Group >
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
           )
         }
        </FormItem>
        {
          !!activityInfo.isCshare&&activityInfo.isCshare!=undefined&&
          <div>
            <FormItem label='分享微信好友标题' {...formItemLayout}>
              {
                getFieldDecorator('shareTitle', {
                  rules: [{ required: true, message: '请输入分享微信好友标题'}],
                  initialValue:activityInfo.shareTitle
                })(
                  <Input
                    className="ant-input-fixed"
                    placeholder="请输入分享微信好友标题"
                    maxLength='30'
                    autoComplete="off"/>
                )
              }
            </FormItem>
            <UpLoadImgMod
              rules={[{required:true,message:'请上传图片'}]}
              formItemLayout={formItemLayout}
              name="shareWechatPic"
              label="分享微信好友图片"
              width={5}
              height={4}
              imgType={1}
              fileList={activityInfo.shareWechatPic}
              form={this.props.form}/>
            <UpLoadImgMod
              rules={[{ required: true, message: '请上传图片'}]}
              formItemLayout={formItemLayout}
              name="shareWechatCfPic"
              label="朋友圈分享图片"
              imgType={1}
              fileList={activityInfo.shareWechatCfPic}
              form={this.props.form}/>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { ctipActivityAddOne } = state;
  return ctipActivityAddOne;
}

export default  connect(mapStateToProps)(ShareSet);
