import { Button } from 'antd';
import { Sessions } from 'utils';
import ErrorText from '../ErrorText';
import CommonMod from '../CommonMod';
import Swiper from 'swiper/js/swiper.js';
import './index.less';

let mySwiper;
class BannerMod extends React.Component {
  componentDidUpdate() {
    const { moduleContent } =this.props.info;
    if(mySwiper&&mySwiper.el){//销毁
      mySwiper.destroy(true,true)
    }
    mySwiper = new Swiper ('.banner-swiper-container', {
          speed:200,
          observer: true,
          observeParents:true,
          observeSlideChildren:true,
          autoplay: {   //滑动后继续播放（不写官方默认暂停）
            disableOnInteraction: false,
          },
          pagination: {  //分页器
            el: '.banner-swiper-pagination'
          },
        })
  }
  goEdit=()=> {
    const { homepageModuleId } =this.props.info;
    this.props.history.push(`/account/cbannerSet/${homepageModuleId}`);
  }
  render() {
    let { moduleContent, backgroundPicUrl,homepageModuleId } =this.props.info;
    const fileDomain = Sessions.get('fileDomain');
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return(
      <CommonMod
        pageType={this.props.pageType}
        checkResult={this.props.checkResult}
        goEdit={this.goEdit}
        homepageModuleId={homepageModuleId}
        className="banner-mod hasLine"
        style={{'background':`#fff url(${backgroundPicUrl}) center`}}>
          {
            moduleContent&&moduleContent.length>0?
            ( moduleContent.length==1?
              <div className="swiper-slide" key={moduleContent[0].bannerId}>
                <img src={`${fileDomain}${moduleContent[0].bannerPic}`}/>
              </div>
              :
              <div className="swiper-container banner-swiper-container">
                <div className="swiper-wrapper">
                  {
                    moduleContent.map((el,index) => (
                      <div className="swiper-slide" key={el.bannerId}>
                        <img src={`${fileDomain}${el.bannerPic}`}/>
                      </div>
                    ))
                  }
                </div>
                <div className="banner-swiper-pagination swiper-pagination"></div>
              </div>
            )
            :
            <div className="no-module-data banner-no-module">Banner模块</div>
          }
      </CommonMod>
    )
  }
}
// export default BannerMod;
export default BannerMod;
