import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from 'react';
import lodash from 'lodash';

const FormItem = Form.Item;
import "./index.less";

const Discount=({...props})=> {
  let newSource = lodash.cloneDeep(props.promotionRules);
  newSource&&newSource.map((item, index) => item.key = index);
  let [rules, setRules]=useState(newSource);

  const handleDelete = index => {
    rules.splice(index, 1);
    rules=[...rules]
    setRules(rules)
  };
  const add = () => {
    rules.push({ param: { leastQty: "", giftQty: "" } });
    rules=[...rules]
    setRules(rules)
  };
  const onChange = (e, index, key) => {
    rules[index]["param"][key] = e.target.value;
  };
  const validator=(rule, value, index) => {
    if (+value>0) {
        if(+value>99){
          return Promise.reject('需小于等于99');
        };
        const currentGiftQty = +rules[index].param.giftQty;//当前减额
        if(rules[index - 1]){
          const prevLeastQty = +rules[index - 1].param.leastQty;//上一条门槛
          const prevGiftQty = +rules[index - 1].param.giftQty;//上一条减额
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
        if(rules[index+1]){
          const nextLeastQty = +rules[index + 1].param.leastQty;//下一条门槛
          const nextGiftQty = +rules[index + 1].param.giftQty;//下一条减额
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
  console.log(rules)
  return (
    <div className="discountTwo">
      <div className="discount_tips">
        <span>每阶梯的优惠力度需大于等于上一阶梯的优惠力度</span>
        <br />
        <span>例：买X送Y，每阶梯的X/（X+Y）需小于等于上一阶梯的X/（X+Y）</span>
      </div>
      {
        rules.length>0&&rules.map((item, index) => (
          <div className="step" key={index}>
            <FormItem className="satified_price">
              阶梯{index + 1}：<span style={{ color: "red" }}>*</span>
              单笔订单满 　
                <FormItem
                  noStyle
                  name={['fieldValues',index,'param','leastQty']}
                  rules={[
                    { required: true, message: "请填写优惠内容" },
                    { pattern: /^[1-9]+(\d*)$/,message: "请填写大于0的正整数"},
                    { validator: (rule, value,)=>validator(rule, value, index)}
                  ]}>
                    <Input
                      onChange={(e) => onChange(e, index, "leastQty")}
                      autoComplete="off"
                      style={{ width: "100px" }}/>
                </FormItem>
                  件, 送　
                <FormItem
                  noStyle
                  name={['fieldValues',index,'param','giftQty']}
                  rules={[
                    {required: true, message: "请填写优惠内容" },
                    {pattern: /^[1-9]+(\d*)$/,message: "请填写大于0的正整数"},
                    {validator: (rule, value,)=>validatorTwo(rule, value, index)}
                  ]}>
                  <Input
                    autoComplete="off"
                    style={{ width: "100px" }}
                    onChange={(e) =>onChange(e, index, "giftQty")}/>
                </FormItem>
                  件
                {rules.length > 1 && (
                  <span className="pointerSty" onClick={() => handleDelete(index)}> 删除等级</span>
                )}
            </FormItem>
          </div>
        ))
      }
      <div className="discountTwo_add">
        <Button
          disabled={rules.length == 3}
          type="primary"
          onClick={add}>
          继续新增等级优惠
        </Button>
      </div>
    </div>
  )
}

export default Discount;
