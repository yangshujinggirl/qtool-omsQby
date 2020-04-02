import React, { Component } from "react";
import { Button } from "antd";
import { Sessions } from 'utils';
import Swiper from "swiper/js/swiper.js";
import Line from '../Line';
import CommonMod from '../CommonMod';
import "./index.less";

class ThemeMod extends Component {
  componentDidUpdate() {
    var themeSwiper = new Swiper(".theme-swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      observer: true,
      observeParents:true,
    });
  }
  goEdit=()=> {
    const { homepageModuleId } =this.props.info;
    this.props.history.push(`/account/cbannerSet/${homepageModuleId}`);
  }
  render() {
    let { titleColor, title, isDisplayMore, moduleContent, moduleBackColor, homepageModuleId } =this.props.info;
    const fileDomain = Sessions.get('fileDomain');
    return (
      <CommonMod
        goEdit={this.goEdit}
        homepageModuleId={homepageModuleId}
        className="theme-mod"
        style={{'backgroundColor':moduleBackColor}}>
          <div className="mod-wrap">
            <div className={titleColor == 0?'black-title mod-common-head':'white-title mod-common-head'}>
              <div className="hd-item">
                <span>{title}</span>
              </div>
              {!!isDisplayMore&&<p className="hd-item">查看更多</p>}
            </div>
            {
              moduleContent&&moduleContent.length>0?
              <div className="swiper-container theme-swiper-container">
                <div className="swiper-wrapper">
                  {moduleContent.map((el, index) => (
                    <div className="swiper-slide" key={el.themeId}>
                      <div className="item-icon">
                        <div className="pic-wrap">
                          <img src={`${fileDomain}${el.themePic}`} />
                        </div>
                        <p className="title-level-one">{el.themeTitle}</p>
                        <p className="price">{el.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              :
              <div className="no-module-data theme-noData">主题模块</div>
            }
          </div>
      </CommonMod>
    );
  }
}

export default ThemeMod;
