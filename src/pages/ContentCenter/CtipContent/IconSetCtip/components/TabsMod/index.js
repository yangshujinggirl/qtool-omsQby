import React , { Component } from 'react';
import { useState, useEffect } from 'react';
import { Modal }from 'antd';
import './index.less';

const panes = [
  { title: '第一坑', key: '1' },
  { title: '第二坑', key: '2' },
  { title: '第三坑', key: '3'},
  { title: '第四坑', key: '4'},
];
const TabsMod=({...props})=> {
  const onChange = (el) => {
    if(el.key == props.activiKey) {
      return;
    }
    Modal.confirm({
      title: '温馨提示',
      content: '切换页面请确认保存',
      okText:'保存',
      onOk:()=>{
        props.onOk(el.key);
      },
      onCancel:()=> {props.onCancel(el.key)},
    });
  };

  return(
    <div className={`part-tabs icon-part-tabs`}>
      {
      panes.map((el,index) => (
          <p
            key={el.key}
            className={`tab-bar-item ${el.key==props.activiKey?'tab-bar-activity':''}`}
            onClick={()=>onChange(el)}>{el.title}</p>
        ))
      }
    </div>
  )
}

export default TabsMod;
