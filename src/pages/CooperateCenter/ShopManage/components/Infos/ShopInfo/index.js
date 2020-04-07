import { Form } from "antd";
import moment from "moment";

const ShopEdit = (props) => {
  return (
    <React.Fragment>
      <Form.Item name="channelArea" label="门店面积">
        {props.infos.channelArea}
      </Form.Item>
      <Form.Item name="renovationPrice" label="装修费用">
        {props.infos.renovationPrice}
      </Form.Item>
      <Form.Item name="rent" label="门店租金">
        {props.infos.rent}
      </Form.Item>
      <Form.Item name="staffPrice" label="人事费用">
        {props.infos.staffPrice}
      </Form.Item>
      <Form.Item name="personWechat" label="店主微信">
        {props.infos.personWechat}
      </Form.Item>
      <Form.Item label="营业时间">
        <React.Fragment>
          <Form.Item noStyle name="businessHoursS">
            {props.infos.businessHoursS}
          </Form.Item>
          　至　
          <Form.Item noStyle name="businessHoursE">
            {props.infos.businessHoursE}
          </Form.Item>
        </React.Fragment>
      </Form.Item>
      <Form.Item name="openingTime" label="开业时间">
        {moment(props.infos.openingTime).format("YYYY-MM-DD")}
      </Form.Item>
      <Form.Item label="店主备注">{props.infos.personRemark}</Form.Item>
    </React.Fragment>
  );
};
export default ShopEdit;
