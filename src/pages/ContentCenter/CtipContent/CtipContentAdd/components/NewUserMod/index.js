import react, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import CommonMod from '../CommonMod';

import './index.less'

class NewUserMod extends Component {
  goEdit = () => {
    const { componkey } = this.props;
    const {homepageModuleId} = this.props.info.coupon
    const paneitem = {
      title: "新人礼模块",
      key: `${componkey}edit-new-user`+homepageModuleId,
      componkey: `${componkey}edit-new-user`,
      parentKey:componkey,
      data: {
        homepageModuleId
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  render() {
    let { coupon, homepageInfoVo } =this.props.info;
    let { homepageModuleId, moduleBackColor,isDisplay, moduleContent } =coupon;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    moduleBackColor = moduleBackColor?`${moduleBackColor}`:null;
    return (
      <CommonMod
        homepageModuleId={ homepageModuleId }
        className={`new-user-mod ${!isDisplay?'hiddle-module':''}`}
        style={{'backgroundColor':moduleBackColor}}>
        <div>
          {
            moduleContent&&moduleContent.newComerPicUrl?
            <div className="content-wrap">
              <img src={`${fileDomain}${moduleContent.newComerPicUrl}`}/>
            </div>
            :
            <div className="no-module-data new-user-noData">新人礼</div>
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
        </div>
      </CommonMod>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(NewUserMod);
