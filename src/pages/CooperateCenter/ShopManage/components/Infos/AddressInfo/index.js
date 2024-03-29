import { Form } from "antd";

const Address = (props) => {
  return (
    <React.Fragment>
      <Form.Item label="所属城市">{props.infos.addressPrefix}</Form.Item>
      <Form.Item label="门店地址">{props.infos.address}</Form.Item>
      <Form.Item label="门店经度">{props.infos.warp}</Form.Item>
      <Form.Item label="门店纬度">{props.infos.weft}</Form.Item>
      <Form.Item label="收货城市">{props.infos.shAddressPrefix}</Form.Item>
      <Form.Item label="收货地址">{props.infos.shAddress}</Form.Item>
    </React.Fragment>
  );
};
export default Address;
