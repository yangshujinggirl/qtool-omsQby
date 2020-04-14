import { Button } from "antd";
import { Sessions } from 'utils';
import Countdown from "react-countdown-now";
import Line from "../Line";
import CommonMod from "../CommonMod";
import Swiper from "swiper/js/swiper.js";
import moment from "moment";
import "./index.less";

class GoodsMod extends React.Component {
  componentDidUpdate() {
    var goodsSwiper = new Swiper(".goods-swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      slidesPerGroup: 3,
      loopFillGroupWithBlank: true
    });
  }
  goEdit = () => {
    const { homepageModuleId } = this.props.info;
    this.props.history.push(`/account/singleGoods/${homepageModuleId}`);
  };
  render() {
    let { isDisplaySplitLine, titleColor, title, preHeatIcon, isDisplayCountdown, displayEndTime, isDisplayMore,
      homepageModuleId, moduleContent, moduleBackColor, isDisplay } = this.props.info;
    const fileDomain = Sessions.get('fileDomain');
    const endDate = new Date("2019-8-24"); // Christmas, yay
    return (
      <div>
        {!!isDisplaySplitLine&&<Line />}
        <CommonMod
          goEdit={this.goEdit}
          hasDisplayBtn={true}
          toggleShow={this.props.toggleShow}
          isDisplay={isDisplay}
          homepageModuleId={homepageModuleId}
          className={`goods-mod ${!isDisplay ? "hiddle-module" : ""}`}
          style={{ backgroundColor: moduleBackColor }}>
          <div className="mod-wrap">
            <div
              className={
                titleColor == 0
                  ? "black-title mod-common-head"
                  : "white-title mod-common-head"
              }>
              <div className="hd-item">
                <span>{title}</span>
                {
                  preHeatIcon?preHeatIcon
                    :
                    (
                      !!isDisplayCountdown &&
                      displayEndTime && (
                        <Countdown date={displayEndTime} />
                      )
                    )
                  }
              </div>
              {!!isDisplayMore && <p className="hd-item">查看更多</p>}
            </div>
            {moduleContent && moduleContent.length > 0 ? (
              <div className="swiper-container goods-swiper-container">
                <div className="swiper-wrapper">
                  {moduleContent.map((el, index) => (
                    <div className="swiper-slide" key={`${el.pdSpuId}/${index}`}>
                      <div className="item-icon">
                        <div className="pic-wrap">
                          <img src={`${fileDomain}${el.pdPic}`} />
                          {el.tags && (
                            <span className="tags-icon">{el.tags}</span>
                          )}
                        </div>
                        <p className="title-level-one textOneLine">
                          {el.sellingPoints ? el.sellingPoints : el.name}
                        </p>
                        <p className="price">
                          ¥{el.showPrice}
                          {el.hiddenPrice && (
                            <span className="hiddle-price">
                              ¥{el.hiddenPrice}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-module-data goods-no-module">商品模块</div>
            )}
          </div>
        </CommonMod>
      </div>
    );
  }
}

export default GoodsMod;
