import React, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import Swiper from "swiper/dist/js/swiper.js";
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
  goEdit = () => {
    const { componkey } = this.props;
    const {homepageModuleId} = this.props.info.themeActivity
    const paneitem = {
      title: "主题模块",
      key: `${componkey}edit-theme`+homepageModuleId,
      componkey: `${componkey}edit-theme`,
      parentKey:componkey,
      data: {homepageModuleId:this.props.info.themeActivity.homepageModuleId}
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  render() {
    let { themeActivity, homepageInfoVo } =this.props.info;
    let { moduleContent, moduleBackColor, homepageModuleId } =themeActivity;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    moduleBackColor = moduleBackColor?`${moduleBackColor}`:null;
    return (
      <CommonMod
        homepageModuleId={homepageModuleId}
        className="theme-mod"
        style={{'backgroundColor':moduleBackColor}}>
        <div>
          <div className="mod-wrap">
            <div className={themeActivity.titleColor == 0?'black-title mod-common-head':'white-title mod-common-head'}>
              <div className="hd-item">
                <span>{themeActivity.title}</span>
              </div>
              {!!themeActivity.isDisplayMore&&<p className="hd-item">查看更多</p>}
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
          <div className="handle-btn-action">
            {
              !this.props.data.info&&homepageInfoVo&&!!homepageInfoVo.releasable&&
              <Button onClick={this.goEdit}>编辑</Button>
            }
          </div>
        </div>
      </CommonMod>
    );
  }
}

function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(ThemeMod);
