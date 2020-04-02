import React , { Component } from 'react';
import { useState, useEffect } from 'react';
import { Modal }from 'antd';
import './index.less';

const TabsMod=({...props})=> {
  const onChange = (key) => {
    if(key == props.activiKey) {
      return;
    }
    Modal.confirm({
      title: '温馨提示',
      content: '切换页面请确认保存',
      okText:'保存',
      onOk:()=>{
        props.onOk(key);
      },
      onCancel:()=> {props.onCancel(key)},
    });
  };
  return(
    <div className="more-pic-set-pages common-modal-set-component">
      <div className="pic-tabs-wrap">
        <div className="lev-one-l">
          <div className="content-wrap">
            <div
              className={`lev-two-l ${props.activiKey == "1" ? "activikey" : ""}`}
              onClick={()=>onChange("1")}>
              左一大图
            </div>
            <div className="lev-two-r">
              <p
                className={`con ${props.activiKey == "2" ? "activikey" : ""}`}
                onClick={()=>onChange("2")}>
                右上小图
              </p>
              <p
                className={`con ${props.activiKey == "3" ? "activikey" : ""}`}
                onClick={()=>onChange("3")}>
                右下小图
              </p>
            </div>
          </div>
        </div>
        <div className="lev-one-r">
          <p className="r-item">
            <span className="label">左一大图</span><br />
            图片宽高比为313:400，格式为png、jpg。大小不能超过2m。只能上传一张。
          </p>
          <p className="r-item">
            <span className="label">右上小图</span><br />
            图片宽高比为357:192，格式为png、jpg。大小不能超过2m。只能上传一张。
          </p>
          <p className="r-item">
            <span className="label">右下小图</span><br />
            图片宽高比为357:192，格式为png、jpg。大小不能超过2m。只能上传一张。
          </p>
        </div>
      </div>
    </div>
  )
}

export default TabsMod;
