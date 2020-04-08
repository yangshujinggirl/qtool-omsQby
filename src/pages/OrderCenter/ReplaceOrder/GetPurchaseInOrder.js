import React, { useState, useEffect } from "react";
import { Form, AutoComplete, Button, Input, Spin } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Qtable } from "common";
import NP from "number-precision";
import "./index.less";
import {
  getSupplierListApi,
  createPurchaseinOrderApi
} from "api/home/OrderCenter/ReplaceOrder";
const { Option } = AutoComplete;

const GetPurchaseInOrder = props => {
  const [form] = Form.useForm();
  const [supplierList, setSupplierList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [totalNum, setTotalNum] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState("");
  useEffect(() => {
    getDataSource();
  }, []);
  //获取采购列表
  const getDataSource = () => {
    let [dataSource, obj, totalNum, totalPrice] = [[], {}, 0, 0];
    const replaceList = JSON.parse(sessionStorage.getItem("replaceList"));
    replaceList.map(item => {
      obj[item["skuCode"]] = obj[item["skuCode"]]
        ? {
            ...item,
            orderNum: obj[item["skuCode"]]["orderNum"] + 1,
            num: obj[item["skuCode"]]["num"] + item.num
          }
        : { ...item, orderNum: 1, num: item.num };
    });
    for (let key in obj) {
      dataSource.push(obj[key]);
    }
    dataSource.map(item => {
      totalNum += item.num;
      totalPrice += item.num * item.purchasePrice;
    });
    form.setFieldsValue({ dataSource });
    setTotalNum(totalNum);
    setTotalPrice(totalPrice);
    setDataSource(dataSource);
  };

  const Columns = [
    {
      title: "SKU编码",
      dataIndex: "skuCode"
    },
    {
      title: "商品名称",
      dataIndex: "productName"
    },
    {
      title: "规格",
      dataIndex: "salesAttributeName"
    },
    {
      title: "订单数",
      dataIndex: "orderNum"
    },
    {
      title: "实付总价",
      dataIndex: "totalPrice"
    },
    {
      title: "商品数",
      dataIndex: "num"
    },
    {
      title: "采购单价",
      dataIndex: "purchasePrice",
      render: (text, record, index) => (
        <Form.Item
          name={["dataSource", index, "purchasePrice"]}
          rules={[{ required: true, message: "请输入采购单价" }]}
        >
          <Input
            placeholder="采购单价"
            onBlur={e => onChange(e, record, "purchasePrice")}
            autoComplete='off'
          />
        </Form.Item>
      )
    },
    {
      title: "备注",
      dataIndex: "remarks",
      render: (text, record, index) => (
        <Form.Item name={["dataSource", index, "remarks"]}>
          <Input
            placeholder="可输入30字备注"
            maxLength={30}
            onBlur={e => onChange(e, record, "remarks")}
            autoComplete='off'
          />
        </Form.Item>
      )
    },
    {
      title: "总毛利",
      dataIndex: "totalProfit",
      render: (text, record, index) => (
        <span>
          {NP.minus(record.totalPrice, record.num * record.purchasePrice)}
        </span>
      )
    },
    {
      title: "综合毛利率",
      dataIndex: "grossProfitRate",
      render: (text, record, index) => (
        <span>
          {(
            NP.divide(
              NP.minus(record.totalPrice, record.num * record.purchasePrice),
              record.num * record.purchasePrice
            ) * 100
          ).toFixed(2)}
          %
        </span>
      )
    }
  ];
  //采购单价发生改变时
  const onChange = (e, record, type) => {
    const value = e.target.value;
    if (value) {
      const newData = [...dataSource];
      const index = newData.findIndex(item => record.key == item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, [type]: value.trim() });
      if (type == "purchasePrice") {
        let totalPrice = 0;
        newData.map(item => {
          totalPrice += item.num * Number(item.purchasePrice);
        });
        setTotalPrice(totalPrice);
      }
      setDataSource(newData);
    }
  };
  //供应上搜索时
  const onSearch = value => {
    getSupplierListApi({ sname: value }).then(res => {
      if (res.httpCode == 200) {
        setSupplierList(res.result);
      }
    });
  };
  //供应商选中时
  const onSelect = (value, option) => {
    setId(option.key);
  };
  //提交
  const handleSubmit = () => {
    const values = form.validateFields();
    let dfList = [];
    dataSource.map(item => {
      const { id, purchasePrice, remarks } = item;
      dfList.push({ id, purchasePrice, remarks });
    });
    setLoading(true);
    createPurchaseinOrderApi({ dfList, id }).then(res => {
      setLoading(false);
      if (res.httpCode == 200) {
        props.history.push("/account/agency_delivery_orders");
      }
    }).catch(()=>{
      setLoading(false);
    });
  };
  return (
    <Spin spinning={loading}>
      <div className="replace_order_get_puchasein">
        <div className="tips">
          <ExclamationCircleFilled style={{ color: "orange" }} />
          <div className="wrapper">
            <p>1、每次采购只能选择一个供应商；</p>
            <p>
              2、为避免商品采购单价录入错误，建议单次商品采购的SKU数不超过10个；
            </p>
          </div>
        </div>
        <Form form={form}>
          <Form.Item label="供应商" rules={[{ required: true, message: "" }]}>
            <AutoComplete
              placeholder="请输入供应商"
              style={{ width: "300px" }}
              onSearch={onSearch}
              onSelect={onSelect}
            >
              {supplierList.map(item => (
                <Option key={item.id} value={item.name}>{item.name}</Option>
                ))}
            </AutoComplete>
          </Form.Item>
          <Qtable dataSource={dataSource} columns={Columns} />
        </Form>
        <div className="save_puserchase_in_order">
          <Button type="primary" size="large" onClick={handleSubmit}>
            保存
          </Button>
          <div className="show_price">
            <p>
              <span>
                商品数量：<span className="brandColor">{totalNum}</span>,
              </span>
              <span>
                共计：
                <span className="brandColor">
                  {Number(totalPrice).toFixed(2)}
                </span>
                元
              </span>
            </p>
          </div>
        </div>
      </div>
    </Spin>
  );
};
export default GetPurchaseInOrder;
