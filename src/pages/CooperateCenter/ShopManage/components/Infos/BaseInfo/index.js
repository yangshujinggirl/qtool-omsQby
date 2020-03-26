import { Form } from "antd";

const BaseEdit = props => {
  return (
    <React.Fragment>
      <Form.Item label="门店图片">
        {props.infos.channelPic && (
          <img style={{width:'100px',height:'100px;'}}
            src={
              sessionStorage.getItem("oms_fileDomain") + props.infos.channelPic
            }
          />
        )}
      </Form.Item>
      <Form.Item name="channelName" label="门店名称">
        {props.infos.channelName}
      </Form.Item>
      <Form.Item name="channelJName" label="门店简称">
        {props.infos.channelJName}
      </Form.Item>
      <Form.Item name="printName" label="打印名称">
        {props.infos.printName}
      </Form.Item>
      <Form.Item name="businessName" label="电商名称">
        {props.infos.businessName}
      </Form.Item>
      <Form.Item name="person" label="门店店主">
        {props.infos.person}
      </Form.Item>
      <Form.Item name="personMobile" label="店主手机">
        {props.infos.personMobile}
      </Form.Item>
      <Form.Item name="channelPhone" label="门店电话">
        {props.infos.channelPhone}
      </Form.Item>
      <Form.Item name="servicePhone" label="客服电话">
        {props.infos.servicePhone}
      </Form.Item>
      <Form.Item name="openingBank" label="开户银行">
        {props.infos.openingBank}
      </Form.Item>
      <Form.Item name="bankCardNo" label="银行卡号">
        {props.infos.bankCardNo}
      </Form.Item>
      <Form.Item name="openingName" label="开户名">
        {props.infos.openingName}
      </Form.Item>
    </React.Fragment>
  );
};
export default BaseEdit;
