import react, { Component } from "react";
import { Sessions } from 'utils';
import { Button } from "antd";
import Line from '../Line';
import CommonMod from '../CommonMod';
import "./index.less";

const MorePicMod=({...props})=> {
  let { titleColor, isDisplaySplitLine, title, moduleContent, moduleBackColor, isDisplay, homepageModuleId } =props.info;
  const fileDomain = Sessions.get('fileDomain');
  const goEdit = () => {
    props.history.push(`/account/cMorePicSet/${homepageModuleId}`);
  };

  let lImg,tImg,bImg;
  moduleContent&&moduleContent.map((el,index) => {
    if(el.position==41) {
      lImg = el.picUrl;
    } else if(el.position==42) {
      tImg = el.picUrl;
    } else if(el.position==43) {
      bImg = el.picUrl;
    }
  })
  return (
    <div>
      {!!isDisplaySplitLine&&<Line />}
      <CommonMod
        goEdit={goEdit}
        homepageModuleId={homepageModuleId}
        className="common-sty morePic-mod"
        style={{'backgroundColor':moduleBackColor}}>
          <div className="mod-wrap">
            <div className={titleColor == 0?'black-title mod-common-head':'white-title mod-common-head'}>
              <span>{title}</span>
            </div>
            <div className="main-layout">
              <div className="layout-l">
                {lImg&&<img src={`${fileDomain}${lImg}`}/>}
              </div>
              <div className="layout-r">
                <div className="lay-t">
                  {tImg&&<img src={`${fileDomain}${tImg}`}/>}
                </div>
                <div className="lay-b">
                  {bImg&&<img src={`${fileDomain}${bImg}`}/>}
                </div>
              </div>
            </div>
          </div>
      </CommonMod>
    </div>
  );
}

export default MorePicMod;
