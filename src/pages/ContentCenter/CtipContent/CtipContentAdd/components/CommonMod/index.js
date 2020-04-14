import react, { Component } from 'react';
import { Button } from 'antd';
import ErrorText from '../ErrorText';
import 'swiper/css/swiper.min.css';
import './index.less';

const CommonMod=({...props})=>{
  let { style, homepageModuleId, checkResult,isDisplay, className } = props;
  checkResult=checkResult?checkResult:[]
  let currentItem = checkResult.find((el) => el.homepageModuleId == homepageModuleId );
  currentItem=currentItem?currentItem:{};
  return(
    <div className={`homeEdit-common-sty ${className}`} style={style}>
      {
      props.children
      }
      <div className="handle-btn-action">
        <Button onClick={props.goEdit}>编辑</Button>
        {props.hasDisplayBtn&&<Button onClick={()=>props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'显示'}</Button>}
      </div>
      <ErrorText currentItem={currentItem}/>
    </div>
  )
}
export default CommonMod;
