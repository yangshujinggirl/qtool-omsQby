import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { useEffect, useState } from 'react';
const FormItem = Form.Item;
import "./index.less";

const DiscountTwo=({...props})=>{
  let newDataSource = [...props.dataSource];
  let currentdata = props.currentdata;
  const handleDelete = index => {
    newDataSource.splice(index, 1);
    props.upDateList(newDataSource);
  };
  const add = () => {
    newDataSource.push({ param: { leastAmount: "", reduceAmount: "" } });
    props.upDateList(newDataSource);
  };
  const onChange = (e, index, key) => {
    newDataSource[index]["param"][key] = e.target.value.replace(/\D/g,'').replace(/^[0]+/,'');
    props.upDateList(newDataSource);
  };
  const validatorOne=(rule, value, callback,index) => {
    if (+value) {
      if(+value>99999){
        return Promise.reject('需小于等于99999');
      };
      const currentreduceAmount = +newDataSource[index].param.reduceAmount||'';//当前减额
      if(currentreduceAmount){
        if(currentreduceAmount >= +value){
          return Promise.reject('提示优惠金额需小于优惠门槛');
        };
      };
      if(newDataSource[index - 1]){
        const prevleastAmount = +newDataSource[index - 1].param.leastAmount //上一条门槛
        const prevreduceAmount = +newDataSource[index - 1].param.reduceAmount //上一条减额
        if(prevleastAmount){
          if(+value <= prevleastAmount){
            return Promise.reject('此阶梯优惠门槛需大于上一阶梯');
          };
          if(prevreduceAmount){
            const prevDiscount = prevreduceAmount/prevleastAmount //上一条折扣
            if(currentreduceAmount){
              const currentDiscount = currentreduceAmount/+value//当前折扣
              if(currentDiscount < prevDiscount){
                return Promise.reject('此阶梯优惠力度需大于等于上一阶梯');
              };
            };
          };
        };
      }
      if(newDataSource[index+1]){
        const nextleastAmount = +newDataSource[index + 1].param.leastAmount;//下一条门槛
        const nextreduceAmount = +newDataSource[index + 1].param.reduceAmount;//下一条减额
        if(nextleastAmount){
          if(+value >= nextleastAmount){
            return Promise.reject('此阶梯优惠门槛需小于下一阶梯');
          };
          if(nextreduceAmount){
            const nextDiscount = nextreduceAmount/nextleastAmount//下一条折扣
            if(currentreduceAmount){
              const currentDiscount = currentreduceAmount/+value//当前折扣
              if(currentDiscount > nextDiscount){
                return Promise.reject('此阶梯优惠力度需小于等于下一阶梯');
              };
            };
          };
        };
      };
    };
    return Promise.resolve();
  }
  const validatorTwo=(rule, value, callback, index ) => {
    if (+value) {
      if(+value>99){
        return Promise.reject('需小于等于99');
      };
      const currentReduceQty = newDataSource[index].param.reduceQty;
      if(currentReduceQty){
        if(+value <= +currentReduceQty){
          return Promise.reject('不得小于等于减额');
        };
      };
      if(newDataSource[index - 1] && newDataSource[index - 1].param.leastQty){
        const prevLeastQty = +newDataSource[index - 1].param.leastQty;//上一条门槛
        if(+value <= prevLeastQty){
          return Promise.reject('此阶梯优惠门槛需大于上一阶梯');
        };
      };
      if(newDataSource[index+1] && newDataSource[index + 1].param.leastQty){
        const nextLeastQty = +newDataSource[index + 1].param.leastQty;//下一条门槛
        if(+value >= nextLeastQty){
          return Promise.reject('此阶梯优惠门槛需小于下一阶梯');
        };
      };
    };
    return Promise.resolve();
  }
  const validatorThr=(rule, value, callback, index) => {
    if (+value) {
      if(+value>9999){
        return Promise.reject('需小于等于9999');
      };
      const currentLeastAmount = +newDataSource[index].param.leastAmount;//当前减额
      if(currentLeastAmount){
        if(+value >= currentLeastAmount){
          return Promise.reject('提示优惠金额需小于优惠门槛');
        };
        const currentDiscount = +value/currentLeastAmount//当前折扣
        if(newDataSource[index - 1]){
          const prevLeastAmount = +newDataSource[index - 1].param.leastAmount;//上一条门槛
          const prevReduceAmount = +newDataSource[index - 1].param.reduceAmount;//上一条减额
          if(prevLeastAmount && prevReduceAmount){
            const prevDiscount = prevReduceAmount/prevLeastAmount //上一条折扣
            if(currentDiscount < prevDiscount){
              return Promise.reject('此阶梯优惠力度需大于等于上一阶梯');
            };
          }
        };
        if(newDataSource[index+1]){
          const nextLeastAmount = +newDataSource[index + 1].param.leastAmount;//下一条门槛
          const nextReduceAmount = +newDataSource[index + 1].param.reduceAmount;//下一条减额
          if(nextLeastAmount && nextReduceAmount){
            const nextDiscount = nextReduceAmount/nextLeastAmount //下一条折扣
            if(currentDiscount > nextDiscount){
              return Promise.reject('此阶梯优惠力度需小于等于下一阶梯');
            };
          };
        };
      };
    };
    return Promise.resolve();
  }
  const validatorFour=(rule, value, callback, index) => {
    if (+value) {
      if(+value>99){
        return Promise.reject('需小于等于99');
      };
      const currentLeastQty = newDataSource[index].param.leastQty;
      if(currentLeastQty){
        if(+value >= currentLeastQty){
          return Promise.reject('不得大于等于优惠门槛');
        };
      };
      if(newDataSource[index - 1] && +newDataSource[index - 1].param.reduceQty){
        const prevReduceQty = +newDataSource[index - 1].param.reduceQty;//上一条减额
        if( +value <= prevReduceQty){
          return Promise.reject('此阶梯减额需大于上一阶梯');
        };
      };
      if(newDataSource[index+1] && +newDataSource[index + 1].param.reduceQty){
        const nextReduceQty = +newDataSource[index + 1].param.reduceQty;//下一条减额
        if(+value >= nextReduceQty){
          return Promise.reject('此阶梯减额需小于下一阶梯');
        };
      };
    };
    return Promise.resolve();
  }

  return (
    <div className="discountTwo">
      <div className='discountTwo-tips'>
        {
        currentdata&&currentdata.promotionType == 22?
          "每阶梯的优惠力度需大于等于上一阶梯的优惠力度。例：满X送Y，每阶梯的Y/X需大于等于上一阶梯的Y/X"
          :
          "每阶梯的优惠力度需大于上一阶梯的优惠力度。例：买X免Y，每阶梯X和Y均需大于上一阶梯的X和Y"
        }
      </div>
      {newDataSource&& newDataSource.map((item, index) => (
        <div className="step" key={index}>
          {currentdata&&currentdata.promotionType == 22 ?
            <div>
              <FormItem className="satified_price">
                阶梯{index + 1}：<span style={{ color: "red" }}>*</span>单笔订单满　
                <FormItem
                  className="satified_price"
                  name={['fieldValues',index,'leastAmount']}
                  getValueFromEvent={(event)=>{
                    return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                  }}
                  rules={[ { required: true, message: "请填写优惠内容" },{ validator:(rule, value, callback)=>validatorOne(rule, value, callback,index) }]}>
                    <Input
                      onChange={(e)=> onChange(e, index, "leastAmount")}
                      autoComplete="off"
                      style={{ width: "150px" }}/>
                </FormItem>
                元, 减　
              </FormItem>
              <FormItem noStyle>
                <FormItem
                  className="reduce_price"
                  name={['fieldValues',index,'reduceAmount']}
                  getValueFromEvent={(event)=>{
                    return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                  }}
                  rules={[
                    { required: true, message: "请填写优惠内容" },
                    { validator:(rule, value, callback)=>validatorThr(rule, value, callback,index) }
                  ]}>
                  <Input
                    onChange={(e)=> onChange(e, index, "reduceAmount")}
                    autoComplete="off" style={{ width: "150px" }} />
                </FormItem>
                元
              </FormItem>
            </div>
            :
            <div>
              <FormItem className="satified_price">
                阶梯{index + 1}：<span style={{ color: "red" }}>*</span> 单笔买满　
                <FormItem
                  className="satified_price"
                  name={['fieldValues',index,'leastQty']}
                  rules={[ { required: true, message: "请填写优惠内容" },{ validator:(rule, value, callback)=>validatorTwo(rule, value, callback, index) }]}
                  getValueFromEvent={(event)=>{
                    return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                  }}>
                    <Input
                      onChange={(e) => onChange(e, index, "leastQty") }
                      autoComplete="off"
                      style={{ width: "150px" }}/>　　
                </FormItem>
               件, 减免
              </FormItem>
              <FormItem noStyle>
                <FormItem
                  className="reduce_price"
                  getValueFromEvent={(event)=>{
                    return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                  }}
                  name={['fieldValues',index,'reduceQty']}
                  rules={[ { required: true, message: "请填写优惠内容" },{ validator: (rule, value, callback)=>validatorFour(rule, value, callback, index) }]}>
                  <Input
                    onChange={e => onChange(e, index, "reduceQty")}
                    autoComplete="off" style={{ width: "150px" }} />
                  </FormItem>
                  件
              </FormItem>
            </div>
          }
          {newDataSource.length > 1 && (
            <a className="theme-color" onClick={() => handleDelete(index)}>
              删除等级
            </a>
          )}
        </div>
      ))}
      <div className="discountTwo_add">
        <Button
          disabled={newDataSource && newDataSource.length == 8}
          type="primary"
          onClick={add}>
          继续新增等级优惠
        </Button>
      </div>
    </div>
  );
}

export default DiscountTwo;
