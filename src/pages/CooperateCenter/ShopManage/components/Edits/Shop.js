import { Input, TimePicker, Form, DatePicker } from "antd";
import moment from "moment";
const TextArea = Input.TextArea;

const ShopEdit = props => {
  const { businessHoursS, businessHoursE } = props;
  return (
    <React.Fragment>
      <Form.Item name="channelArea" label="门店面积">
        <Input placeholder="请输入门店面积" autoComplete="off" />
      </Form.Item>
      <Form.Item name="renovationPrice" label="装修费用">
        <Input placeholder="请输入装修费用" autoComplete="off" />
      </Form.Item>
      <Form.Item name="rent" label="门店租金">
        <Input placeholder="请输入门店租金" autoComplete="off" />
      </Form.Item>
      <Form.Item name="staffPrice" label="人事费用">
        <Input placeholder="请输入人事费用" autoComplete="off" />
      </Form.Item>
      <Form.Item name="personWechat" label="店主微信">
        <Input placeholder="请输入店主微信" autoComplete="off" />
      </Form.Item>
      <Form.Item label="营业时间">
        <React.Fragment>
          <Form.Item noStyle name="businessHoursS">
            <TimePicker format="HH:mm" />
          </Form.Item>
          　至　
          <Form.Item noStyle name="businessHoursE">
            <TimePicker format="HH:mm" />
          </Form.Item>
        </React.Fragment>
      </Form.Item>
      <Form.Item name="openingTime" label="开业时间">
        <DatePicker format="YYYY-MM-DD" placeholder="请输入开业时间" />
      </Form.Item>
      <Form.Item name="personRemark" label="店主备注">
        <TextArea placeholder="请输入店主备注" />
      </Form.Item>
    </React.Fragment>
  );
};
export default ShopEdit;
