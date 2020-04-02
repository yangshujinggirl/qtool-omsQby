import { Input, Cascader, Form } from "antd";
import React, { useEffect, useState } from "react";
import { getProvinceListApi } from "api/home/CooperateCenter/ShopManage";

const Address = props => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    //获取省市区
    getProvinceListApi().then(res => {
      if (res.httpCode == 200) {
        setOptions(res.result);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <Form.Item
        name="areacode"
        label="所属城市"
        rules={[{ required: true, message: "请选择所属城市" }]}
      >
        <Cascader placeholder="请选择所属城市" options={options} />
      </Form.Item>
      <Form.Item
        name="address"
        label="门店地址"
        rules={[{ required: true, message: "请输入门店地址" }]}
      >
        <Input placeholder="请输入门店地址" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="warp"
        label="门店经度"
        rules={[{ required: true, message: "请输入门店经度" }]}
      >
        <Input placeholder="请输入门店经度" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="weft"
        label="门店纬度"
        rules={[{ required: true, message: "请输入门店纬度" }]}
      >
        <Input placeholder="请输入门店纬度" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="shAreacode"
        label="收货城市"
        rules={[{ required: true, message: "请输入收货城市" }]}
      >
        <Cascader placeholder="请输入收货城市" options={options} />
      </Form.Item>
      <Form.Item
        name="shAddress"
        label="收货地址"
        rules={[{ required: true, message: "请输入收货地址" }]}
      >
        <Input placeholder="请输入收货地址" />
      </Form.Item>
    </React.Fragment>
  );
};
export default Address;
