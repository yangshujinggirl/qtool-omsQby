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
      <Qtable columns={Columns} dataSource={dataSource} />
    </Modal>
  );
};
export default GiftModal;
