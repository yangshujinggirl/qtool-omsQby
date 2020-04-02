import React , { Component } from 'react';
import { useState, useEffect } from 'react';
import { Modal }from 'antd';
import './index.less';


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
    <div className={`part-tabs ${props.modType=="2"?"icon-part-tabs":""}`}>
      {
      props.panes.map((el,index) => (
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
