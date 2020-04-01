import react, { Component } from "react";
import { Button } from "antd";
import CommonMod from '../CommonMod';

import './index.less'

class NewUserMod extends Component {
  goEdit=()=> {
    const { homepageModuleId } =this.props.info;
    this.props.history.push(`/account/cNewUserSet/${homepageModuleId}`);
  }
  render() {
    let { homepageModuleId, moduleBackColor,isDisplay, moduleContent } =this.props.info;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
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
            <div>
                <Button onClick={this.goEdit}>编辑</Button>
                <Button onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'显示'}</Button>
            </div>
          </div>
        </div>
      </CommonMod>
    );
  }
}

export default NewUserMod;
