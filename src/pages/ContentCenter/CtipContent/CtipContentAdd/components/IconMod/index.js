import { Sessions } from 'utils';
import { Button } from 'antd';
import CommonMod from '../CommonMod';
import './index.less';

const IconMod=({...props})=> {
  let { homepageModuleId, moduleContent, moduleBackColor, titleColor, isDisplay } =props.info;
  const fileDomain = Sessions.get('fileDomain');
  moduleBackColor = moduleBackColor?`${moduleBackColor}`:null;

  const goEdit=()=> {
    props.history.push(`/account/cIconSet/${homepageModuleId}`);
  }
  return(
    <CommonMod
      checkResult={props.checkResult}
      hasDisplayBtn={true}
      toggleShow={props.toggleShow}
      goEdit={goEdit}
      isDisplay={isDisplay}
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
                <p className={!!titleColor?'white-title':'black-title'}>{el.iconName}</p>
              </div>
            ))
          }
        </div>
        :
        <div className="no-module-data icon-no-data">Icon 模块</div>
      }
    </CommonMod>
  )
}

export default IconMod;
