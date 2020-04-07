import react, { Component } from 'react';
import { Button } from 'antd';
import ErrorText from '../ErrorText';
import 'swiper/css/swiper.min.css';
import './index.less';

class CommonMod extends Component {
  render() {
    let { style, homepageModuleId, checkResult,isDisplay } =this.props;
    checkResult=[]
    let currentItem = checkResult.find((el) => el.homepageModuleId == this.props.homepageModuleId);
    currentItem=currentItem?currentItem:{};
    return(
      <div className={`homeEdit-common-sty ${this.props.className}`} style={style}>
        {
          this.props.children
        }
        <div className="handle-btn-action">
          <Button onClick={this.props.goEdit}>编辑</Button>
          {this.props.hasDisplayBtn&&<Button onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>{isDisplay?'隐藏':'显示'}</Button>}
        </div>
        <ErrorText currentItem={currentItem}/>
      </div>
    )
  }
}
export default CommonMod;
