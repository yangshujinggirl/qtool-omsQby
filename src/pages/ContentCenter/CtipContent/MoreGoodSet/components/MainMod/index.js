import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import lodash from 'lodash';
import DragField from '../DragField';
import { GetSearchApi } from 'api/contentCenter/MoreGoodSet';
import { columnsFun, columnsTwoFun } from '../../columns';

//dispatch 更新数据源
const FormItem = Form.Item;
const Mod=({...props})=> {
  let { list, goods } =props;
  let newList = lodash.cloneDeep(props.list);
  let [addkey,setAddkey] =useState(newList.length);
  //新增
  const handleAdd=()=> {
    addkey++;
    setAddkey(addkey);
    newList.push({ key:addkey })
    props.upDateList(newList);
  }
  //表单事件
  const onOperateClick=(record,type)=> {
    switch(type) {
      case 'delete':
        this.handleDelete(record);
        break;
    }
  }
  const handleDelete=(record)=> {
    newList = newList.filter(item => item.key !== record.key);
    props.upDateList(newList);
  }
  const moveRow = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    let tempHover = goods[dragParent][dragIndex];
    let tempDrag = goods[hoverParent][hoverIndex];
    goods[hoverParent].splice(hoverIndex, 1, tempHover);
    goods[dragParent].splice(dragIndex, 1, tempDrag);
    const { listOne, listTwo } =goods;
    let totalList = [...listOne, ...listTwo];
    props.upDateList(totalList);
  };
  //code
  const handleBlur=(e,record)=> {
    let value;
    value = lodash.trim(e.target.value)
    if(!value) {
      return;
    }
    if(value == record.FixedPdSpuId) {
      return;
    }
    GetSearchApi({pdSpuId:value,type:0})
    .then((res) => {
      if(res.code==0) {
        let { spuInfo } =res;
        let idx = newList.findIndex((el) => el.FixedPdSpuId == spuInfo.pdSpuId);
        if(idx != -1) {
          message.error('商品重复，请重新添加');
        } else {
          newList = newList.map((el,idx) => {
            if(el.key == record.key) {
              el.FixedPdSpuId = spuInfo.pdSpuId;
              el = {...el,...spuInfo};
            };
            return el
          });
          props.upDateList(newList);
        }
      }
    })
  }
  let columnsOne = columnsFun(handleBlur);
  let columnsTwo = columnsTwoFun(handleBlur);
  return (
    <DragField
      columnsOne={columnsOne}
      columnsTwo={columnsTwo}
      handleAdd={handleAdd}
      goods={goods}
      onOperateClick={onOperateClick}
      moveRow={moveRow}/>
  );
}
export default Mod;
