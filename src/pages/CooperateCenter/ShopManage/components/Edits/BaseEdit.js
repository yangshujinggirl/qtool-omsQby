import { Input,Form } from "antd";
import { useState } from "react";
import UploadImg from "common/QupLoadImgLimt";

const BaseEdit = () => {
  const [fileList,setFileList] = useState([]);
  const upDateList=(fileList)=>{
    setFileList(fileList)
  }
  return (
    <React.Fragment>
      <Form.Item label="门店图片">
        <UploadImg upDateList={upDateList} fileList={fileList} />
      </Form.Item>
      <Form.Item
        name="name"
        label="门店名称"
        rules={[{ required: true, message: "请输入门店名称" }]}
      >
        <Input placeholder="请输入门店名称" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="sname"
        label="门店简称"
        rules={[{ required: true, message: "请输入门店简称" }]}
      >
        <Input placeholder="请输入门店简称" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="printName"
        label="打印名称"
        rules={[{ required: true, message: "请输入打印简称" }]}
      >
        <Input placeholder="请输入打印简称" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="ecName"
        label="电商名称"
        rules={[{ required: true, message: "请输入电商名称" }]}
      >
        <Input placeholder="请输入电商名称" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="shopman"
        label="门店店主"
        rules={[{ required: true, message: "请输入门店简称" }]}
      >
        <Input placeholder="请输入门店简称" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="mobile"
        label="店主手机"
        rules={[{ required: true, message: "请输入店主手机" }]}
      >
        <Input placeholder="请输入店主手机" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="telephone"
        label="门店电话"
        rules={[{ required: true, message: "请输入门店电话" }]}
      >
        <Input placeholder="请输入门店电话" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="serverTel"
        label="客服电话"
        rules={[{ required: true, message: "请输入客服电话" }]}
      >
        <Input placeholder="请输入客服电话" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="bank"
        label="开户银行"
        rules={[{ required: true, message: "请输入开户银行" }]}
      >
        <Input placeholder="请输入开户银行" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="bankNo"
        label="银行卡号"
        rules={[{ required: true, message: "请输入银行卡号" }]}
      >
        <Input placeholder="请输入银行卡号" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="bankName"
        label="开户名"
        rules={[{ required: true, message: "请输入开户名" }]}
      >
        <Input placeholder="请输入开户名" autoComplete='off'/>
      </Form.Item>
    </React.Fragment>
  );
};
export default BaseEdit
