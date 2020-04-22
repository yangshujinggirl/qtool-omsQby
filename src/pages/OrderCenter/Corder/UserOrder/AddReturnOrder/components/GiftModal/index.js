import { Modal, Button } from "antd";
import { Qtable } from "common";
import "./index.less";
const Columns = [
  {
    title: "商品名称",
    dataIndex: "giftName",
    render: text => {
      return (
        <div>
          <span className="add_toC_gift">赠品</span>
          <span>{text}</span>
        </div>
      );
    }
  },
  {
    title: "规格",
    dataIndex: "giftSalesAttributeName"
  },
  {
    title: "数量",
    dataIndex: "giftNum"
  }
];
const GiftModal = props => {
  const { visible, onOk, dataSource } = props;
  return (
    <Modal
      visible={visible}
      footer={<Button type='primary' onClick={onOk}>我知道了</Button>}
      closable={false}
      maskClosable={false}
    >
      <div style={{padding:'10px',background:'lightyellow','marginBottom':'10px'}}>当前申请退款的商品金额导致订单中其他商品无法参加组合满赠活动，以下赠品需一并退回。</div>
      <Qtable columns={Columns} dataSource={dataSource} />
    </Modal>
  );
};
export default GiftModal;
