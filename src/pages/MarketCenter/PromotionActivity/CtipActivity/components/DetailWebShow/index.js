import {QenlargeImg} from 'common';
import { Row, Col } from 'antd';

function DetailWebShow({...props}) {
  const { labelCol, wrapperCol, info } =props;
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            <Col span={labelCol}>活动配置促销活动页头图：</Col>
            <Col span={wrapperCol}><QenlargeImg url={info.websiteBanner}/></Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>是否需要商详横幅条：</Col>
            <Col span={wrapperCol}>{info.isBanner?'是':'否'}</Col>
          </Row>
          {
            !!info.isBanner&&
            <div>
              <Row className="item-row">
                <Col span={labelCol}>横幅条开始展示时间：</Col>
                <Col span={wrapperCol}>{info.bannerBeginTime}</Col>
              </Row>
              <Row className="item-row">
                <Col span={labelCol}>横幅条标题：</Col>
                <Col span={wrapperCol}>{info.bannerTitle}</Col>
              </Row>
              <Row className="item-row">
                <Col span={labelCol}>横幅条副标题：</Col>
                <Col span={wrapperCol}>{info.bannerSubtitle}</Col>
              </Row>
              <Row className="item-row">
                <Col span={labelCol}>商品详情页横幅条背景图：</Col>
                <Col span={wrapperCol}><QenlargeImg url={info.pdDetailBannerPic}/></Col>
              </Row>


            </div>
          }
          <Row className="item-row">
            <Col span={labelCol}>是否需要主题logo图：</Col>
            <Col span={wrapperCol}>{info.isLogo?'是':'否'}</Col>
          </Row>
          {
            !!info.isLogo&&
            <div>
              <Row className="item-row">
                <Col span={labelCol}>logo图开始展示时间：</Col>
                <Col span={wrapperCol}>{info.logoBeginTime}</Col>
              </Row>
              <Row className="item-row">
                <Col span={labelCol}>活动主题logo图：</Col>
                <Col span={wrapperCol}><QenlargeImg url={info.logoPic}/></Col>
              </Row>
            </div>
          }
          <Row className="item-row">
            <Col span={labelCol}>营销活动页商品排序规则：</Col>
            <Col span={wrapperCol}>{info.collation==1?'按最新上架排序':'按近30天App+POS的销量排序'}</Col>
          </Row>
         </div>
}
export default DetailWebShow;
