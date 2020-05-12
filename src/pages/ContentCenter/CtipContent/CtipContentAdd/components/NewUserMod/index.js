import react, { Component } from "react";
import { Button } from "antd";
import { Sessions } from 'utils';
import CommonMod from '../CommonMod';

import './index.less'

const NewUserMod=({...props})=> {
  let { homepageModuleId, moduleBackColor,isDisplay, moduleContent } =props.info;
  const fileDomain = Sessions.get('fileDomain');
  const goEdit=()=> {
    props.history.push(`/account/cNewUserSet/${homepageModuleId}`);
  }

  return (
    <CommonMod
      pageType={props.pageType}
      checkResult={props.checkResult}
      hasDisplayBtn={true}
      toggleShow={props.toggleShow}
      goEdit={goEdit}
      isDisplay={isDisplay}
      homepageModuleId={ homepageModuleId }
      className={`new-user-mod ${!isDisplay?'hiddle-module':''}`}
      style={{'backgroundColor':moduleBackColor}}>
        {
          moduleContent&&moduleContent.newComerPicUrl?
          <div className="content-wrap">
            <img src={`${fileDomain}${moduleContent.newComerPicUrl}`}/>
          </div>
          :
          <div className="no-module-data new-user-noData">新人礼</div>
        }
    </CommonMod>
  );
}

export default NewUserMod;
