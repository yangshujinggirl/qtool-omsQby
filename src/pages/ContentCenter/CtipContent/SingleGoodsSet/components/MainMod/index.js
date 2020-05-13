import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { useState, useEffect, memo } from 'react';
import lodash from 'lodash';
import DragableBodyRow from '../DragField';
import { GetSearCodeApi } from 'api/contentCenter/SingleGoodsSet';
import { columnsFun, columnsTwoFun } from '../../columns';

const FormItem = Form.Item;

const Mod=({...props})=> {
  let { list, goods, params } =props;
  let newList = lodash.cloneDeep(props.list);
  let [addkey,setAddkey] =useState(newList.length);
  //绑定方法
  const processData=(data)=> {
    data && data.map((item, i) => {
        item.onOperateClick = (type) => { onOperateClick(item,type) };
    })
    return data;
  }
  //新增
  const handleAdd=()=> {
    addkey++;
    setAddkey(addkey);
    newList.push({ key:addkey })
    props.upDateList(newList);
  }
  //删除
  const handleDelete=(record)=> {
    newList = newList.filter(item => item.key !== record.key);
    props.upDateList(newList);
  }
  //表单事件
  const onOperateClick=(record,type)=> {
    switch(type) {
      case 'delete':
        handleDelete(record);
        break;
    }
  }
  //拖拽
  const moveRow = (dragParent, hoverParent, dragIndex, hoverIndex) => {
    let tempHover = goods[dragParent][dragIndex];
    let tempDrag = goods[hoverParent][hoverIndex];
    goods[hoverParent].splice(hoverIndex, 1, tempHover);
    goods[dragParent].splice(dragIndex, 1, tempDrag);
    const { listOne, listTwo } =goods;
    let totalList = [...listOne, ...listTwo];
    props.upDateList(totalList);
  };
  //code查询商品
  const handleBlur=(e,record,type)=> {
    let value = e.target.value;
    if(!value) { return; }
    value = lodash.trim(value)
    if(value == record.FixedPdSpuId) { return; }
    GetSearCodeApi({[type]:value})
    .then((res) => {
      let { result } =res;
      let idx = newList.findIndex((el) => el.FixedPdSpuId == result.pdSpuId);
      if(idx != -1) {
        message.error('商品重复，请重新添加');
      } else {
        newList = newList.map((el,idx) => {
          if(el.key == record.key) {
            el.FixedPdSpuId = result.pdSpuId;
            el = {...el,...result};
          };
          return el
        });
        props.upDateList(newList);
      }
    })
  }
  //拖拽行
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };
  let columnsOne = columnsFun(handleBlur,params.type);
  let columnsTwo = columnsTwoFun(handleBlur,params.type);

  let listTwo = processData(goods.listTwo)
  let listOne = processData(goods.listOne)
  let len = newList.length;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="drag-tables-component">
        <Table
          bordered
          rowClassName={(record,index)=>(
            record.isLine==20||record.isPresell||record.pdSpuInv==0?'haveBackColor':null
          )}
          pagination={false}
          columns={columnsOne}
          dataSource={listOne}
          components={components}
          onRow={(record, index) => ({
            'data-row-key':record.key,
            'data-row-parent':'listOne',
            'data-row-index':index,
            moveRow
          })}/>
        <Table
          bordered
          rowClassName={(record,index)=>(
            record.isLine==20||record.isPresell||record.pdSpuInv==0?'haveBackColor':null
          )}
          pagination={false}
          columns={columnsTwo}
          dataSource={listTwo}
          components={components}
          footer={()=><Button type="default" disabled={len>=100?true:false} onClick={handleAdd}>+新增</Button>}
          onRow={(record, index) => ({
            'data-row-key':record.key,
            'data-row-index':index,
            'data-row-parent':'listTwo',
            moveRow
          })}/>
      </div>
    </DndProvider>
  );
}
export default memo(Mod);
