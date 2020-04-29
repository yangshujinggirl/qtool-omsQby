import React, { Component } from 'react';
import { Sessions } from 'utils';
import { Button } from 'antd';
import Line from '../Line';
import CommonMod from '../CommonMod';
import './index.less';

const MoreGoodsMod =({...props})=> {
  let { isDisplaySplitLine, homepageModuleId, titleColor,title, isDisplayMore, moduleContent, moduleBackColor } =props.info;
  const goEdit=()=> {
    props.history.push(`/account/cMoreGoodSet/${homepageModuleId}`);
  }
  const fileDomain = Sessions.get('fileDomain');
  console.log(isDisplayMore)
  return(
    <div>
      {!!isDisplaySplitLine&&<Line />}
      <CommonMod
        pageType={props.pageType}
        checkResult={props.checkResult}
        goEdit={goEdit}
        homepageModuleId={homepageModuleId}
        className="more-goods-mod"
        style={{'backgroundColor':moduleBackColor}}>
          <div className="mod-wrap">
            <div className={titleColor == 0?'black-title mod-common-head':'white-title mod-common-head'}>
              <div className="hd-item">
                <span>{title}</span>
              </div>
              {
                isDisplayMore==1&&
                <p className="hd-item">查看更多</p>
              }
            </div>
            {
              moduleContent&&moduleContent.length>0?
              <div className="mod-content">
                {
                  moduleContent.map((el,index) => (
                    <div className="item-icon" key={index}>
                      <div className="pic-wrap">
                        <img src={`${fileDomain}${el.pdPic}`}/>
                        {el.tags&&<span className="tags-icon">{el.tags}</span>}
                      </div>
                      <p className="title-level-one textOneLine">{el.sellingPoints?el.sellingPoints:el.name}</p>
                      <p className="price">
                        ¥{el.showPrice}
                        {el.hiddenPrice&&
                          <span className="hiddle-price">¥{el.hiddenPrice}</span>
                        }
                      </p>
                    </div>
                  ))
                }
              </div>
              :
              <div className="no-module-data more-goods-noData">二行三列商品模块</div>
            }
          </div>
      </CommonMod>
    </div>
  )
}

export default MoreGoodsMod;
