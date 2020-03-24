import Imgmodel from '../../../../../components/model/modelimg';
import { Row, Col } from 'antd';

function DetailWebShow({...props}) {
  const { labelCol, wrapperCol, info } =props;
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            <Col span={labelCol}>c端是否可分享：</Col>
            <Col span={wrapperCol}>{info.isCshare?'是':'否'}</Col>
          </Row>
          {
            !!info.isCshare&&
            <div>
              <Row className="item-row">
                <Col span={labelCol}>分享微信好友标题：</Col>
                <Col span={wrapperCol}>{info.shareTitle}</Col>
              </Row>
              {
                info.promotionScope==1&&
                <Row className="item-row">
                  <Col span={labelCol}>分享微信好友图片：</Col>
                  <Col span={wrapperCol}><Imgmodel picUrl={info.shareWechatPic}/></Col>
                </Row>
              }
              <Row className="item-row">
                <Col span={labelCol}>朋友圈分享图片：</Col>
                <Col span={wrapperCol}><Imgmodel picUrl={info.shareWechatCfPic}/></Col>
              </Row>
            </div>
          }
         </div>
}
export default DetailWebShow;
