import { Modal } from 'antd';
import moment from 'moment';
import { Qbtn } from 'common';
import './index.less';

const AuditModal=({...props})=>{
  const { content={} }=props;
  return <Modal
          className="audit-modal-wrap"
          title=""
          closable
          width={320}
          visible={props.visible}
          onOk={props.onOk}
          onCancel={props.onCancel}
          footer={[
            <Qbtn key="pass">审核通过</Qbtn>
          ]}>
          <div className="audit-main-content">
            <p>
              订单编号：{content.orderNo}
            </p>
            <p>
              订单总价：{content.orderTotal}
            </p>
            <p>
              运费：{content.orderTotal}
            </p>
            <p>
              订单创建时间：{moment(content.channelOrderCreateTime).format('YYYY-MM-DD H:mm:ss')}
            </p>
          </div>

        </Modal>
}

export default AuditModal;
