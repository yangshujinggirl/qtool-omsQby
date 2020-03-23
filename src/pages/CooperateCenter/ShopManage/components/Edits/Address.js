import { Input,Cascader,Form  } from "antd";
import {CascaderAddressOptions} from 'common'

const Address = () => {
  return (
    <React.Fragment>
      <Form.Item name='areacode' label="所属城市" rules={[{ required: true, message: "请选择所属城市" }]}>
        <Cascader placeholder="请选择所属城市" options={CascaderAddressOptions}/>
      </Form.Item>
      <Form.Item
        name="address"
        label="门店地址"
        rules={[{ required: true, message: "请输入门店地址" }]}
      >
        <Input placeholder="请输入门店地址" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="warp"
        label="门店经度"
        rules={[{ required: true, message: "请输入门店经度" }]}
      >
        <Input placeholder="请输入门店经度" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="weft"
        label="门店纬度"
        rules={[{ required: true, message: "请输入门店纬度" }]}
      >
        <Input placeholder="请输入门店纬度" autoComplete='off'/>
      </Form.Item>
      <Form.Item
        name="shAreacode"
        label="收货城市"
        rules={[{ required: true, message: "请输入收货城市" }]}
      >
        <Cascader placeholder="请输入收货城市" options={CascaderAddressOptions}/>
      </Form.Item>
      <Form.Item
        name="shAddress"
        label="收货地址"
        rules={[{ required: true, message: "请输入收货地址" }]}
      >
        <Input placeholder="请输入收货地址"/>
      </Form.Item>
    </React.Fragment>
  );
};
export default Address
