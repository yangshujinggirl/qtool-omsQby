import { Input, TimePicker, Form, DatePicker } from "antd";
const TextArea = Input.TextArea;

const ShopEdit = () => {
  return (
    <React.Fragment>
      <Form.Item name="name" label="门店面积">
        <Input placeholder="请输入门店面积" autoComplete="off" />
      </Form.Item>
      <Form.Item name="sname" label="装修费用">
        <Input placeholder="请输入装修费用" autoComplete="off" />
      </Form.Item>
      <Form.Item name="printName" label="门店租金">
        <Input placeholder="请输入门店租金" autoComplete="off" />
      </Form.Item>
      <Form.Item name="ecName" label="人事费用">
        <Input placeholder="请输入人事费用" autoComplete="off" />
      </Form.Item>
      <Form.Item name="no" label="店主微信">
        <Input placeholder="请输入店主微信" autoComplete="off" />
      </Form.Item>
      <Form.Item label="营业时间">
        <React.Fragment>
          <Form.Item noStyle name="fromtime">
            <TimePicker format="HH:mm" />
          </Form.Item>　至　 
          <Form.Item noStyle name="endtime">
            <TimePicker format="HH:mm" />
          </Form.Item>
        </React.Fragment>
      </Form.Item>
      <Form.Item
        name="mobile"
        label="开业时间"
        rules={[{ required: true, message: "请输入开业时间" }]}
      >
        <DatePicker format="YYYY-MM-DD" placeholder="请输入开业时间" />
      </Form.Item>
      <Form.Item
        name="telephone"
        label="店主备注"
        rules={[{ required: true, message: "请输入店主备注" }]}
      >
        <TextArea placeholder="请输入店主备注" />
      </Form.Item>
    </React.Fragment>
  );
};
export default ShopEdit;
