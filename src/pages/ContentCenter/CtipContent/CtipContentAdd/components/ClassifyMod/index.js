import React, { Component } from 'react';
import { Button } from 'antd';
import { Sessions } from 'utils';
import Swiper from 'swiper/js/swiper.js';
import Line from '../Line';
import CommonMod from '../CommonMod';
import './index.less';

class ClassifyMod extends Component {
  componentDidUpdate() {
    new Swiper ('.classify-swiper-container', {
            slidesPerView: 5,
            spaceBetween: 8,
            slidesPerGroup: 3,
            loopFillGroupWithBlank: true,
            observer: true,
            observeParents:true,
        })
  }
  goEdit=()=> {
    const { homepageModuleId } =this.props.info;
    this.props.history.push(`/account/commodityFlow/${homepageModuleId}`);
  }
  toggleType=(el)=> {
    this.props.dispatch({
        type:'homeEdit/fetchGoodsInfo',
        payload:{pdFlowTabId:el.pdFlowTabId}
    })
  }
  render() {
    let { moduleContent, moduleBackColor, isDisplay, homepageModuleId, flowProductList } =this.props.info;
    const fileDomain = Sessions.get('fileDomain');

    return(
      <div>
        <Line />
        <CommonMod
          goEdit={this.goEdit}
          homepageModuleId={homepageModuleId}
          className="classify-mod">
          <div>
          {
            moduleContent&&moduleContent.length>0?
            <div className="mod-wrap">
              <div className="mod-common-head">
                <div className="hd-item classify-item">
                  <div className="swiper-container classify-swiper-container">
                    <div className="swiper-wrapper">
                      {
                        moduleContent.map((el,index) => (
                          <div className="swiper-slide" key={el.pdFlowTabId} onClick={()=>this.toggleType(el)}>
                            <span className="classify-name">{el.tabName}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              {
                flowProductList&&flowProductList.length>0&&
                <div className="mod-content">
                  {
                    flowProductList.map((el,index) => (
                      <div className="item-icon" key={index}>
                        <div className="pic-wrap"><img src={`${fileDomain}${el.pdPic}`}/></div>
                        <p className="title-level-one textTwoLine">
                          {
                            el.nationalflagPic&&
                            <span className="icon-flag">
                              {
                                <img src={`${fileDomain}${el.nationalflagPic}`}/>
                              }
                            </span>
                          }
                          {el.sellingPoints?el.sellingPoints:el.name}
                        </p>
                        <p className="price">
                          ¥{el.showPrice}
                          {el.hiddenPrice&&
                            <span className="hiddle-price">¥{el.hiddenPrice}</span>
                          }
                        </p>
                        {
                          el.iconList&&
                          <p className="label-action">
                            {
                              el.iconList.map((el,index) =>(
                                <span className="lab-item" key={index}>{el.iconName}</span>
                              ))
                            }
                          </p>
                        }
                      </div>
                    ))
                  }
                </div>
              }
            </div>
            :
            <div className="no-module-data classify-noData">商品流模块</div>
          }
          </div>
        </CommonMod>
      </div>
    )
  }
}
export default ClassifyMod;
