import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';
import Line from '../Line';
import CommonMod from '../CommonMod';
import './index.less';

class MoreGoodsMod extends Component {
  componentDidMount() {

  }
  goEdit=()=> {
    const { componkey } = this.props;
    const {homepageModuleId} = this.props.info.multilineProduct
    const paneitem={
      title:'2行3列商品模块配置',
      key:`${componkey}edit-more-goods`+homepageModuleId,
      componkey:`${componkey}edit-more-goods`,
      parentKey:componkey,
      data:{
        homepageModuleId
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    let { multilineProduct, homepageInfoVo } =this.props.info;
    let { homepageModuleId, moduleContent, moduleBackColor } =multilineProduct;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    moduleBackColor = moduleBackColor?`${moduleBackColor}`:null;
    return(
      <CommonMod
        homepageModuleId={homepageModuleId}
        className="more-goods-mod"
        style={{'backgroundColor':moduleBackColor}}>
        <div>
          <div className="mod-wrap">
            <div className={multilineProduct.titleColor == 0?'black-title mod-common-head':'white-title mod-common-head'}>
              <div className="hd-item">
                <spa>{multilineProduct.title}</spa>
              </div>
              {
                multilineProduct.isDisplayMore==1&&
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
          <div className="handle-btn-action">
            {
              !this.props.data.info&&homepageInfoVo&&!!homepageInfoVo.releasable&&
              <Button onClick={this.goEdit}>编辑</Button>
            }
          </div>
        </div>
      </CommonMod>
    )
  }
}

function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}
export default connect(mapStateToProps)(MoreGoodsMod);
