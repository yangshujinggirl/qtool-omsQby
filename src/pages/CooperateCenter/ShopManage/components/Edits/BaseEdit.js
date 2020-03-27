import { Input, Form } from "antd";
import UploadImg from "common/QupLoadImgLimt";

const BaseEdit = props => {
  return (
    <React.Fragment>
      <Form.Item label="门店图片">
        <UploadImg
          name="channelPic"
          limit={1}
          upDateList={props.upDateChannelPicList}
          fileList={props.channelPic}
        />
      </Form.Item>
      <Form.Item
        name="channelName"
        label="门店名称"
        rules={[{ required: true, message: "请输入门店名称" }]}
      >
        <Input placeholder="请输入门店名称" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="channelJName"
        label="门店简称"
        rules={[{ required: true, message: "请输入门店简称" }]}
      >
        <Input placeholder="请输入门店简称" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="printName"
        label="打印名称"
        rules={[{ required: true, message: "请输入打印简称" }]}
      >
        <Input placeholder="请输入打印简称" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="businessName"
        label="电商名称"
        rules={[{ required: true, message: "请输入电商名称" }]}
      >
        <Input placeholder="请输入电商名称" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="person"
        label="门店店主"
        rules={[{ required: true, message: "请输入门店简称" }]}
      >
        <Input placeholder="请输入门店简称" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="personMobile"
        label="店主手机"
        rules={[{ required: true, message: "请输入店主手机" }]}
      >
        <Input placeholder="请输入店主手机" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="channelPhone"
        label="门店电话"
        rules={[{ required: true, message: "请输入门店电话" }]}
      >
        <Input placeholder="请输入门店电话" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="servicePhone"
        label="客服电话"
        rules={[{ required: true, message: "请输入客服电话" }]}
      >
        <Input placeholder="请输入客服电话" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="openingBank"
        label="开户银行"
        rules={[{ required: true, message: "请输入开户银行" }]}
      >
        <Input placeholder="请输入开户银行" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="bankCardNo"
        label="银行卡号"
        rules={[{ required: true, message: "请输入银行卡号" }]}
      >
        <Input placeholder="请输入银行卡号" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="openingName"
        label="开户名"
        rules={[{ required: true, message: "请输入开户名" }]}
      >
        <Input placeholder="请输入开户名" autoComplete="off" />
      </Form.Item>
    </React.Fragment>
  );
};
export default BaseEdit;
