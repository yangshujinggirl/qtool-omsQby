import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import CommonMod from '../CommonMod';
import './index.less';

class IconMod extends Component {
  goEdit=()=> {
    const { componkey } = this.props;
    const {homepageModuleId} = this.props.info.icon
    const paneitem={
      title:'icon模块',
      key:`${componkey}edit-icon`+homepageModuleId,
      componkey:`${componkey}edit-icon`,
      parentKey:componkey,
      data:{
        homepageModuleId,
        homepageId:this.props.data.homepageId
      }
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    })
  }
  render() {
    const { icon, homepageInfoVo } =this.props.info;
    let { homepageModuleId, moduleContent, moduleBackColor, isDisplay } =icon;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    moduleBackColor = moduleBackColor?`${moduleBackColor}`:null;
    return(
      <CommonMod
        homepageModuleId={homepageModuleId}
        className={`icon-mod hasLine ${!isDisplay?'hiddle-module':''}`}
        style={{'backgroundColor':moduleBackColor}}>
        {
          moduleContent&&moduleContent.length>0?
          <div className="mod-wrap">
            {
              moduleContent&&moduleContent.map((el,index) => (
                <div className="item-icon" key={el.iconId}>
                  <div className="pic-wrap"><img src={`${fileDomain}${el.iconPic}`}/></div>
                  <p className={!!icon.titleColor?'white-title':'black-title'}>{el.iconName}</p>
                </div>
              ))
            }
          </div>
          :
          <div className="no-module-data icon-no-data">Icon 模块</div>
        }
        <div className="handle-btn-action">

          {
            !this.props.data.info&&homepageInfoVo&&!!homepageInfoVo.releasable&&
            <div>
              <Button onClick={this.goEdit}>编辑</Button>
              <Button onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'显示'}</Button>
            </div>
          }
        </div>
      </CommonMod>
    )
  }
}

function mapStateToProps(state) {
  const { homeEdit } =state;
  return homeEdit;
}
export default connect(mapStateToProps)(IconMod);
