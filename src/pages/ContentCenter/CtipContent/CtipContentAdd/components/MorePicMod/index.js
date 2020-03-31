import react, { Component } from "react";
import { connect } from 'dva';
import { Button } from "antd";
import Line from '../Line';
import CommonMod from '../CommonMod';
import "./index.less";

class MorePicMod extends Component {
  goEdit = () => {
    const { componkey } = this.props;
    const { homepageModuleId } = this.props.info.picMix;
    const paneitem = {
      title: "多图片组合",
      key: `${componkey}edit-more-pic`+homepageModuleId,
      componkey: `${componkey}edit-more-pic`,
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
    let { picMix, homepageInfoVo } =this.props.info;
    let { moduleContent, moduleBackColor, isDisplay, homepageModuleId } =picMix;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    let lImg,tImg,bImg;
    moduleContent&&moduleContent.map((el,index) => {
      if(el.position==41) {
        lImg = el.picUrl;
      } else if(el.position==42) {
        tImg = el.picUrl;
      } else if(el.position==43) {
        bImg = el.picUrl;
      }
    })
    moduleBackColor = moduleBackColor?`${moduleBackColor}`:null;
    return (
      <CommonMod
        homepageModuleId={homepageModuleId}
        className="common-sty morePic-mod"
        style={{'backgroundColor':moduleBackColor}}>
        <div>
          <div className="mod-wrap">
            <div className={picMix.titleColor == 0?'black-title mod-common-head':'white-title mod-common-head'}>
              <spa>{picMix.title}</spa>
            </div>
            <div className="main-layout">
              <div className="layout-l">
                {lImg&&<img src={`${fileDomain}${lImg}`}/>}
              </div>
              <div className="layout-r">
                <div className="lay-t">
                  {tImg&&<img src={`${fileDomain}${tImg}`}/>}
                </div>
                <div className="lay-b">
                  {bImg&&<img src={`${fileDomain}${bImg}`}/>}
                </div>
              </div>
            </div>
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
export default connect(mapStateToProps)(MorePicMod);
