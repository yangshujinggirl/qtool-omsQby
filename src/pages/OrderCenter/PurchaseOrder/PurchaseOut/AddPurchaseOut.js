import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  message,
  AutoComplete,
  Select,
  Radio,
  Button,
  Modal,
  Cascader
} from "antd";
import {
  addPurchaseOutApi,
  getPriceApi,
  searchStoreApi,
} from "api/home/orderCenter/PurchaseOrder/PurchaseOut";
import "./index.less";
import { Qbtn } from "common";
import moment from "moment";
const { Option } = AutoComplete;
const TextArea = Input.TextArea;
import Editable from "common/Editable";
import Columns from "./components/GoodsTable/column";
import { CascaderAddressOptions } from "common";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};
const AddPurchaseIn = props => {
  const [form] = Form.useForm();
  const [storeList, setStoreList] = useState([]);
  const [goodList, setGoodList] = useState([{ itemCode: "", key: 1 }]);
  const [supplierList, setSupplierList] = useState([]);
  useEffect(() => {
    getStoreList();
    initPage();
  }, []);
  //初始化
  const initPage = () => {
    const { id } = props.match.params;
    if (id) {
      // GetPurchaseInOrderDetailApi({ stockingCode: id }).then(res => {
      //   if (res.httpCode == 200) {
      //     const { data, ...infos } = res.result;
      //     form.setFieldsValue(infos);
      //     setGoodList(data);
      //   }
      // });
      const res = {
        suppliersName: "qtools",
        documentType: 1,
        predictCtimeStr: "2020-08-08",
        warehouseCode: 200,
        logisticsType: 1,
        postage: 10,
        paymentMode: "账期",
        remarkes: "备注",
        data: [
          {
            id: 0,
            productNature: 1,
            procurementTarget: 2,
            itemCode: "12122",
            productName: "商品名",
            salesAttributeName: "红色",
            price: "10.00",
            amount: 100,
            createTime: "23234"
          }
        ]
      };
      const { data, ...infos } = res;
      infos.predictCtimeStr = moment(infos.predictCtimeStr);
      setLogisticsType(infos.logisticsType);
      form.setFieldsValue(infos);
      data.map(item => {
        item.key = item.id;
      });
      setGoodList(data);
    }
  };
  //获取仓库列表
  const getStoreList = () => {
    // searchStoreApi().then(res=>{
    //   if(res.httpCode == 200){
    //     setStoreList(res.result)
    //   }
    // })
    const storeList = [
      {
        id: 1,
        warehouseCode: 200,
        warehouseName: "大仓"
      }
    ];
    setStoreList(storeList);
  };
  //根据名称搜索供应商
  const onSearch = value => {
    // searchSupplierApi({ sname: value }).then(res => {
    //   setSupplierList(res.result)
    // });
    const list = [
      {
        id: 1,
        name: "供应商名1"
      },
      {
        id: 2,
        name: "供应商名2"
      }
    ];
    setSupplierList(list);
  };
  //根据供应商名称搜索账期
  const onSelect = value => {
    // const sname = value.split('/')[0];
    // getPayTypeApi({ sname }).then(res => {
    //   if (res.httpCode == 200) {
    //     const { accountsType, accountsDay } = res.result;
    //     const str =
    //       accountsType == 1
    //         ? "现结"
    //         : accountsType == 2
    //         ? `货到${accountsDay}天`
    //         : `票到${accountsDay}天`;
    //     form.setFieldsValue({paymentMode:str})
    //   }
    // });
    const res = { accountsType: 2, accountsDay: 10 };
    const { accountsType, accountsDay } = res;
    const str =
      accountsType == 1
        ? "现结"
        : accountsType == 2
        ? `货到${accountsDay}天`
        : `票到${accountsDay}天`;
    form.setFieldsValue({ paymentMode: str });
  };

  //提交
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
  return (
    <div className="oms-common-addEdit-pages add_supplier_info">
      <Form form={form} {...formItemLayout}>
        <Form.Item
          name="stockingCode"
          label="采购单号"
          rules={[{ required: true, message: "请填写供应商名称" }]}
        >
          <AutoComplete
            onSearch={onSearch}
            onSelect={onSelect}
            placeholder="请选择供应商"
          >
            {supplierList.map(item => (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            ))}
          </AutoComplete>
        </Form.Item>
        <Form.Item
          label="采退原因"
          name="reRemark"
          rules={[{ required: true, message: " 请输入采退原因" }]}
        >
          <Input placeholder="请输入采退原因" />
        </Form.Item>
        <Form.Item label="采退商品">
          <Editable
            Columns={Columns}
            dataSource={goodList}
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
          <Input placeholder="请输入电话或手机号" />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          rules={[{ required: true, message: "请输入电话或手机号" }]}
        >
          <Input placeholder="请输入电话或手机号" />
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
              style={{'width':'200px'}}
            />
          </Form.Item>
          <Form.Item name="address" noStyle>
            <Input style={{width:'300px'}} placeholder="请输入详细地址" />
          </Form.Item>
        </Form.Item>
        <Form.Item name="remarkes" label="订单备注">
          <TextArea rows={7} placeholder="请输入订单备注，100字以内" />
        </Form.Item>
      </Form>
      <div className="handle-operate-save-action">
        <Qbtn onClick={goBack}>返回</Qbtn>
        <Qbtn onClick={handleSubmit}>提交审核</Qbtn>
      </div>
    </div>
  );
};

export default AddPurchaseIn;
