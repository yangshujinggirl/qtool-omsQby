import { Input, Select, Radio,Form } from "antd";
import { useState } from "react";
import UploadImg from "common/QuploadImgLimt";

const Cooperate = () => {
  const [fileList, setFileList] = useState([]);
  const upDateList = fileList => {
    setFileList(fileList);
  };
  return (
    <React.Fragment>
      <Form.Item name="" label="门店状态">
        <Select placeholder="请选择门店状态">
          <Option value="0">待开业</Option>
          <Option value="10">开业中</Option>
          <Option value="20">关业中</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="门店类型"
        rules={[{ required: true, message: "请输入门店类型" }]}
      >
        <Select placeholder="请选择门店状态">
          <Option value="0">待开业</Option>
          <Option value="10">开业中</Option>
          <Option value="20">关业中</Option>
        </Select>
      </Form.Item>
      <Form.Item label="分成比例">
        <Form.Item>
          <Input style={{width:'280px'}} placeholder="请输入食品尿不湿" suffix="%" autoComplete='off'/>
        </Form.Item>
        <Form.Item>
          <Input style={{width:'280px'}} placeholder="请输入非食品尿不湿" suffix="%" autoComplete='off'/>
        </Form.Item>
      </Form.Item>
      <Form.Item
        name="printName"
        label="微信支付扫码"
        rules={[{ required: true, message: "请输入门店纬度" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={2}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="ecName"
        label="支付宝扫码"
        rules={[{ required: true, message: "请输入收货城市" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={2}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="ecName"
        label="C端App"
        rules={[{ required: true, message: "请输入收货城市" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={2}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="ecName"
        label="C端同城配送"
        rules={[{ required: true, message: "请输入收货城市" }]}
      >
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={2}>关闭</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="ecName"
        label="C端同城配送"
        rules={[{ required: true, message: "请输入收货城市" }]}
      >
        <UploadImg upDateList={upDateList} fileList={fileList} />
      </Form.Item>
    </React.Fragment>
  );
};
export default Cooperate;
