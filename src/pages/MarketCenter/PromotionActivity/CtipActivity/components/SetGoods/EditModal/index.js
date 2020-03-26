import { Component } from "react";
import { Modal, Form, Input, message } from "antd";
import { Qmessage } from 'common';
import Discount from "./Discount";
import lodash from 'lodash';
// import "../index.less";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol:{
    span: 8
  },
  wrapperCol:{
    span: 16
  }
}


const setModal=({...props})=> {
  const { visible, record, promotionType, dataSource } = props;
  let newSource = lodash.cloneDeep(dataSource);
  const onOk = async() => {
    try {
      let values = await props.form.validateFields(['activityPrice','maxQty','perOrderLimit','perDayLimit','perUserLimit']);
      if ( +values.perOrderLimit > +values.perDayLimit || +values.perDayLimit > +values.perUserLimit) {
        return Qmessage.error("每单限购小于每天限购小于每账号限购，请重新填写");
      }
      let obj = newSource[record.index];
      obj = { ...obj, ...values, promotionRules: [...props.proRules] };
      newSource[record.index] = obj;
      props.updateList(newSource);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const onCancel = () => {
    props.onCancel();
    props.form.resetFields();
  };
  const validateActPrice = (rule, value, callback) => {
    if (value && value >= record.sellPrice) {
      return Promise.reject('活动价需小于C端售价');
    }
    return Promise.resolve();
  };
  return (
    <Modal
      width={promotionType == "11" ? 1100 : 700}
      title="编辑商品"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      wrapClassName="reset_goods">
      <div>
          <FormItem
            label="商品编码"
            {...formItemLayout}>
            <span>{record.pdCode}</span>
          </FormItem>
          {promotionType == 11 &&
            <FormItem
              className="must-pic"
              label="优惠内容"
              {...formItemLayout}>
              <Discount promotionType={promotionType} form={props.form} />}
            </FormItem>
          }
          {promotionType == 10 &&
            <FormItem
              label="活动价"
              {...formItemLayout}
              name="activityPrice"
              rules={[
                { required: true, message: "请输入活动价" },
                { validator: validateActPrice }
              ]}>
              <Input style={{ width: "100px" }} autoComplete="off" />
            </FormItem>
          }
          <FormItem
            label="最多可参与活动的商品数"
            {...formItemLayout}>
            <FormItem
              noStyle
              name="maxQty">
              <Input style={{ width: "100px" }} autoComplete="off" />
            </FormItem>
            <span className="suffix_tips">
              如不填写视为商品的所有库存均参与活动
            </span>
          </FormItem>
          {(promotionType == 10 || promotionType == 11) && (
            <div>
              <div className="limit_tips"> 限购设置规则：每单限购小于每天限购小于每账号限购 </div>
              <FormItem
                label="活动期间每人每单限购"
                {...formItemLayout}>
                <FormItem
                  noStyle
                  name="perOrderLimit">
                  <Input style={{ width: "100px" }} autoComplete="off" />
                </FormItem>
                <span className="suffix_tips">如不填写则不限制购买数量</span>
              </FormItem>
              <FormItem
                label="活动期间每人每天限购"
                {...formItemLayout}>
                <FormItem
                  noStyle
                  name="perDayLimit">
                  <Input style={{ width: "100px" }} autoComplete="off" />
                </FormItem>
                <span className="suffix_tips">如不填写则不限制购买数量</span>
              </FormItem>
              <FormItem
                label="活动期间每人每账号限购"
                {...formItemLayout}>
                <FormItem
                  noStyle
                  name="perUserLimit">
                  <Input style={{ width: "100px" }} autoComplete="off" />
                </FormItem>
                <span className="suffix_tips">如不填写则不限制购买数量</span>
              </FormItem>
            </div>
          )}
      </div>
    </Modal>
  );
}
export default setModal;
