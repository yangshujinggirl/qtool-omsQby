import { Input, Select, Radio,Form } from "antd";
import UploadImg from "common/QuploadImgLimt";

const Cooperate = (props) => {
  return (
    <React.Fragment>
      <Form.Item name="channelStatus" label="门店状态"  rules={[{ required: true, message: "请选择门店状态" }]}>
        <Select placeholder="请选择门店状态">
          <Option value={2}>待开业</Option>
          <Option value={1}>开业中</Option>
          <Option value={3}>关业中</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="channelType"
        label="门店类型"
        rules={[{ required: true, message: "请选择门店类型" }]}
      >
        <Select placeholder="请选择门店状态">
          <Option value={1}>直营店</Option>
          <Option value={2}>联营店</Option>
          <Option value={3}>加盟店</Option>
        </Select>
      </Form.Item>
      <Form.Item label="分成比例">
        <Form.Item name='divideIntoA'>
          <Input style={{width:'280px'}} placeholder="请输入食品尿不湿" suffix="%" autoComplete='off'/>
        </Form.Item>
        <Form.Item name='divideIntoB'>
          <Input style={{width:'280px'}} placeholder="请输入非食品尿不湿" suffix="%" autoComplete='off'/>
        </Form.Item>
      </Form.Item>
      <Form.Item
        name="weiPayStatus"
        label="微信支付扫码"
        rules={[{ required: true, message: "请选择微信支付扫码" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={0}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="alipayStatus"
        label="支付宝扫码"
        rules={[{ required: true, message: "请选择支付宝扫码" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={0}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="customerAppStatus"
        label="C端App"
        rules={[{ required: true, message: "请选择C端App" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={0}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="customerDelivery"
        label="C端同城配送"
        rules={[{ required: true, message: "请选择C端同城配送" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={0}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="contractPic"
        label="合同信息"
      >
        <UploadImg limit={1} upDateList={props.upDateContractList} fileList={props.contractPic} />
      </Form.Item>
    </React.Fragment>
  );
};
export default Cooperate;
