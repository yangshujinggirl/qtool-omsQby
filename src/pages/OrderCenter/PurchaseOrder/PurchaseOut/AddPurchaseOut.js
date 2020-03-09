import React, { useState, useEffect } from "react";
import { Form, Input, message, Select, Cascader, Spin } from "antd";
import {
  GetPurchaseOutOrderDetailApi,
  addPurchaseOutApi,
  getOrderInfoApi,
  searchStoreApi
} from "api/home/orderCenter/PurchaseOrder/PurchaseOut";
import { Qbtn, CascaderAddressOptions } from "common";
import moment from "moment";
import Editable from "./components/Editable";
import NP from "number-precision";
import "./index.less";

const TextArea = Input.TextArea;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};

const AddPurchaseOut = props => {
  const [form] = Form.useForm();
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0.00);
  const [goodList, setGoodList] = useState([]);
  const [suppliersName, setSuppliersName] = useState("");
  useEffect(() => {
    getStoreList();
    initPage();
  }, []);
  /**
   * 初始化
   */
  const initPage = () => {
    const { id } = props.match.params;
    if (id) {
      setLoading(false);
      GetPurchaseOutOrderDetailApi({ stockingCode: id }).then(res => {
        setLoading(false);
        if (res.httpCode == 200) {
          const { detailList, ...infos } = res.result;
          let totalPrice = 0;
          if (detailList.length > 0) {
            detailList.map(item => {
              item.key = item.id;
              item.total = NP.times(Number(item.amount) * item.price).toFixed(
                2
              );
              totalPrice += Number(item.total);
            });
          }
          form.setFieldsValue({ goodList: detailList, ...infos });
          setGoodList(data);
          setTotalPrice(totalPrice);
        }
      });
    }
  };
  /**
   * 获取仓库列表
   */
  const getStoreList = () => {
    searchStoreApi().then(res => {
      if (res.httpCode == 200) {
        setStoreList(res.result);
      }
    });
  };
  /**
   * 根据名称搜索供应商
   * @param {*} value
   */
  const onSearch = value => {
    searchSupplierApi({ sname: value }).then(res => {
      setSupplierList(res.result);
    });
  };
  /**
   * 提交
   */
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const { provinces, ..._values } = values;
    if (provinces) {
      _values.province = provinces[0];
      _values.city = provinces[1];
      _values.area = provinces[2];
    }
    _values.predictCtimeStr = moment(predictCtimeStr).format("YYYY-MM-DD");
    _values.data = goodList;
    _values.id = props.match.params.id;
    console.log(_values);
    // addPurchaseInApi(_values).then(res => {
    //   if (res.httpCode == 200) {
    //     goBack();
    //   };
    // });
  };
  //取消
  const goBack = () => {
    this.props.history.push("/account/purchaseRefundOrder");
  };
  /**
   *根据采购编码查询采购商品
   */
  const searchInfo = e => {
    const value = e.target;
    if (value) {
      getOrderInfoApi({ stockingCode: value.trim() }).then(res => {
        if (res.code == 200) {
          const { data, suppliersName } = res.result;
          setSuppliersName(suppliersName);
          form.setFieldsValue({ goodList: data });
        }
      });
    }
  };
  /**
   * 更改goodList
   */
  const changeDataSource = goodList => {
    setGoodList(goodList);
    const totalPrice = 0;
    goodList.map(item => {
      totalPrice += Number(item.total);
    });
    setTotalPrice(totalPrice);
  };
  return (
    <Spin spinning={loading}>
      <div className="oms-common-addEdit-pages add_purchase">
        <Form form={form} {...formItemLayout}>
          <Form.Item className="item_required" label="采购单号">
            <Form.Item
              noStyle
              name="stockingCode"
              rules={[{ required: true, message: "请填写采购单号" }]}
            >
              <Input
                placeholder="请输入采购单号"
                onBlur={searchInfo}
                onPressEnter={searchInfo}
              />
            </Form.Item>
            <span>{suppliersName}</span>
          </Form.Item>
          <Form.Item
            label="采退原因"
            name="reRemark"
            rules={[{ required: true, message: " 请输入采退原因" }]}
          >
            <Input placeholder="请输入采退原因" autoComplete="off" />
          </Form.Item>
          <Form.Item label="采退商品">
            <Editable
              dataSource={goodList}
              changeDataSource={changeDataSource}
            />
          </Form.Item>
          <Form.Item
            name="warehouseCode"
            label="发货仓库"
            rules={[{ required: true, message: "请选择发货仓库" }]}
          >
            <Select placeholder="请选择发货仓库">
              {storeList.map(item => (
                <Select.Option value={item.warehouseCode} key={item.id}>
                  {item.warehouseName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="请输入收货人"
            name="consignee"
            rules={[{ required: true, message: " 请输入收货人" }]}
          >
            <Input placeholder="请输入电话或手机号" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="phone"
            rules={[{ required: true, message: "请输入电话或手机号" }]}
          >
            <Input placeholder="请输入电话或手机号" autoComplete="off" />
          </Form.Item>
          <Form.Item label="收货地址" className="item_required">
            <Form.Item
              name="provinces"
              noStyle
              label="省市区"
              rules={[{ required: true, message: "请选择省市区" }]}
            >
              <Cascader
                options={CascaderAddressOptions}
                placeholder="请选择地区"
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item name="address" noStyle rules={[{ required: true, message: "请输入详细地址" }]}>
              <Input
                maxLength='50'
                style={{ width: "300px" }}
                placeholder="请输入详细地址"
                autoComplete="off"
              />
            </Form.Item>
          </Form.Item>
          <Form.Item name="remarkes" label="订单备注">
            <TextArea rows={7} placeholder="请输入订单备注，100字以内" />
          </Form.Item>
        </Form>
        <Form.Item wrapperCol={{offset:4}}>
          <div>
            <Qbtn onClick={handleSubmit}>保存</Qbtn>
            <div className="return_price">
              <span>
                商品数量：
                <span className="return_price_color">{goodList.length}</span>，
              </span>
              <span>
                共计：<span className="return_price_color">{totalPrice}</span>元
              </span>
            </div>
          </div>
        </Form.Item>
      </div>
    </Spin>
  );
};

export default AddPurchaseOut;
