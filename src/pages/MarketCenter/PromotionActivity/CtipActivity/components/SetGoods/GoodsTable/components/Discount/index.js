import React, { Component } from "react";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;
import "./index.less";

const Discount=({...props})=> {
  let { promotionRules } = props;
  promotionRules && promotionRules.length > 0 &&promotionRules.map((item, index) => {
    item.key = index;
  })
  const handleDelete = index => {
    promotionRules.splice(index, 1);
  };
  const add = () => {
    promotionRules.push({ param: { leastQty: "", giftQty: "" } });
  };
  const onChange = (e, index, key) => {
    promotionRules[index]["param"][key] = e.target.value.replace(/\D/g,'').replace(/^[0]+/,'');
  };
  const validator=(rule, value, index) => {
    if (+value>0) {
        if(+value>99){
          return Promise.reject('需小于等于99');
        };
        const currentGiftQty = +promotionRules[index].param.giftQty;//当前减额
        if(promotionRules[index - 1]){
          const prevLeastQty = +promotionRules[index - 1].param.leastQty;//上一条门槛
          const prevGiftQty = +promotionRules[index - 1].param.giftQty;//上一条减额
          if(prevLeastQty){
            if(+value <= prevLeastQty){
              return Promise.reject('此阶梯优惠门槛需大于上一阶梯');
            };
            if(prevGiftQty&&currentGiftQty){
              const currentDiscount = +value/(+value+currentGiftQty)//当前折扣
              const prevDiscount = prevLeastQty/(prevLeastQty + prevGiftQty) //上一条折扣
              if(currentDiscount > prevDiscount){
                return Promise.reject('此阶梯优惠力度需大于等于上一阶梯');
              };
            };
          };
        };
        if(promotionRules[index+1]){
          const nextLeastQty = +promotionRules[index + 1].param.leastQty;//下一条门槛
          const nextGiftQty = +promotionRules[index + 1].param.giftQty;//下一条减额
          if(nextLeastQty){
            if(+value >= nextLeastQty){
              return Promise.reject('此阶梯优惠门槛需小于下一阶梯');
            };
            if(nextGiftQty&&currentGiftQty){
              const currentDiscount = +value/(+value+currentGiftQty)//当前折扣
              const nextDiscount = nextLeastQty/(nextLeastQty + nextGiftQty) //下一条折扣
              if(currentDiscount < nextDiscount){
                return Promise.reject('此阶梯优惠力度需小于等于下一阶梯');
              };
            };
          };
        };
      };
      return Promise.resolve();
  }
  const validatorTwo= (rule, value, index) => {
      if (+value>0) {
        if(+value>99){
          return Promise.reject('需小于等于99');
        };
        const currentLeastQty = +promotionRules[index].param.leastQty;//当前减额
        if(currentLeastQty){
          const currentDiscount = currentLeastQty/(+value+currentLeastQty)//当前折扣
          if(promotionRules[index - 1]){
            const prevLeastQty = +promotionRules[index - 1].param.leastQty;//上一条门槛
            const prevGiftQty = +promotionRules[index - 1].param.giftQty;//上一条减额
            if(prevGiftQty && prevLeastQty){
              const prevDiscount = prevLeastQty/(prevLeastQty + prevGiftQty) //上一条折扣
              if(currentDiscount > prevDiscount){
                return Promise.reject('此阶梯优惠力度需大于等于上一阶梯');
              };
            };
          };
          if(promotionRules[index+1]){
            const nextLeastQty = +promotionRules[index + 1].param.leastQty;//下一条门槛
            const nextGiftQty = +promotionRules[index + 1].param.giftQty;//下一条减额
            if(nextLeastQty && nextGiftQty){
              const nextDiscount = nextLeastQty/(nextLeastQty + nextGiftQty) //下一条折扣
              if(currentDiscount < nextDiscount){
                return Promise.reject('此阶梯优惠力度需小于等于下一阶梯');
              }
            };
          };
        }
      };
      return Promise.resolve();
  }
  return (
    <div className="discountTwo">
      <div className="discount_tips">
        <span>每阶梯的优惠力度需大于等于上一阶梯的优惠力度</span>
        <br />
        <span>例：买X送Y，每阶梯的X/（X+Y）需小于等于上一阶梯的X/（X+Y）</span>
      </div>
      {
        promotionRules.length>0&&promotionRules.map((item, index) => (
          <div className="step" key={index}>
            <FormItem className="satified_price">
              阶梯{index + 1}：<span style={{ color: "red" }}>*</span>
              单笔订单满 　
              <FormItem
                noStyle
                name={`fieldValues[${index}].leastQty`}
                getValueFromEvent={(event)=>{
                  return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                }}
                rules={[
                  { required: true, message: "请填写优惠内容" },
                  {pattern: /^([1-9][0-9]*){1,3}$/,message: "请填写大于0的正整数"},
                  { validator: validator(rule, value, index)}
                ]}>
                <Input
                  onChange={(e) => onChange(e, index, "leastQty")}
                  autoComplete="off"
                  style={{ width: "100px" }}/>
                </FormItem>
                件, 送　
            </FormItem>
            <FormItem className="reduce_price">
              <FormItem
                name={`fieldValues[${index}].giftQty`}
                rules={[
                  {required: true, message: "请填写优惠内容" },
                  {pattern: /^([1-9][0-9]*){1,3}$/,message: "请填写大于0的正整数"},
                  { validator: validatorTwo(rule, value, index)}
                ]}
                getValueFromEvent={(event)=>{
                  return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                }}>
                <Input
                  autoComplete="off"
                  style={{ width: "100px" }}
                  onChange={(e) => this.onChange(e, index, "giftQty")}/>
              </FormItem>
                件
            </FormItem>
            {promotionRules.length > 1 && (
              <a className="theme-color" onClick={() => handleDelete(index)}>
                删除等级
              </a>
            )}
          </div>
        ))
      }
      <div className="discountTwo_add">
        <Button
          disabled={promotionRules.length == 3}
          type="primary"
          onClick={add}>
          继续新增等级优惠
        </Button>
      </div>
    </div>
  )
}

export default Discount;
