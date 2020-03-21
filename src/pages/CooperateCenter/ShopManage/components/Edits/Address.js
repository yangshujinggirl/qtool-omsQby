import { Input,Cascader,Form  } from "antd";
import {CascaderAddressOptions} from 'common'

const Address = () => {
  return (
    <React.Fragment>
      <Form.Item label="所属城市">
        <Cascader placeholder="请选择所属城市" options={CascaderAddressOptions}/>
      </Form.Item>
      <Form.Item
        name="name"
        label="门店地址"
        rules={[{ required: true, message: "请输入门店地址" }]}
      >
        <Input placeholder="请输入门店地址" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="sname"
        label="门店经度"
        rules={[{ required: true, message: "请输入门店经度" }]}
      >
        <Input placeholder="请输入门店经度" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="printName"
        label="门店纬度"
        rules={[{ required: true, message: "请输入门店纬度" }]}
      >
        <Input placeholder="请输入门店纬度" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="ecName"
        label="收货城市"
        rules={[{ required: true, message: "请输入收货城市" }]}
      >
        <Cascader placeholder="请输入收货城市" options={CascaderAddressOptions}/>
      </Form.Item>
    </React.Fragment>
  );
};
export default Address
