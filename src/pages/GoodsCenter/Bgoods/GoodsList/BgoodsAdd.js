import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Radio,
  message,
  Table,
  Checkbox,
  Card
} from "antd";
import {
  GetGoodDetailApi,
  saveGoodApi
} from "api/home/GoodsCenter/Bgoods/GoodList";
import { Qtable } from "common";
import "./index.less";
import Editable from "./components/Editable";

const Columns = [
  {
    title: "SKU编码",
    dataIndex: "skuCode",
   
  },
  {
    title: "商品条码",
    dataIndex: "barCode"
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName"
  },
  {
    title: "SKU图片",
    dataIndex: "img"
  },
  {
    title: "掌柜售价(元)",
    dataIndex: "businessPrice"
  },
  {
    title: "POS零售价(元)",
    dataIndex: "proposalPrice"
  },
  {
    title: "在售库存",
    dataIndex: "stockQty"
  },
  {
    title: "销售数量",
    dataIndex: "saleQty"
  },
  {
    title: "商品提示",
    dataIndex: "skuTips",
    editable: true
  },
  {
    title: "商品状态",
    dataIndex: "upperStatus",
    render: (text, record) => {
      record.upperStatus == 0
        ? "下架"
        : record.upperStatus == 1
        ? "上架"
        : "待引用";
    }
  }
];
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: {
    span: 18
  }
};
const BgoodsAdd = props => {
  const [form] = Form.useForm();
  const [infos, setInfos] = useState({});
  const [goodList, setGoodList] = useState([]);
  //请求详情
  useEffect(() => {
    const { id } = props.match.params;
    GetGoodDetailApi({ id }).then(res => {
      if (res.httpCode == "200") {
        const { result } = res;
        let goodList = [];
        if (result.subList.length > 0) {
          goodList = result.subList.map(item => {
            item.key = item.id;
            return item;
          });
        }
        setInfos(result);
        setGoodList(goodList);
      }
    });
  }, []);
  const changeDataSource=(newData)=>{
    console.log(111)
    setGoodList(newData)
  }
  //保存
  const onFinish = async () => {
    console.log();
    saveGoodApi({ values }).then(res => {
      message.success("保存成功");
      props.history.push("/account/Bsite");
    });
  };
  const goBack = () => {
    props.history.push("/account/Bsite");
  };
  return (
    <div className="oms-common-addEdit-pages bgood_add">
      <Form
        initialValues={{
          productBname: infos.productBname,
          isBeforeSales: infos.isBeforeSales,
          label: infos.label
        }}
        form={form}
        onFinish={onFinish}
        name="search_form"
        {...formItemLayout}
      >
        <Card title="基础信息">
          <Row>
            <Col span={12}>
              <Form.Item label="spu编码">{infos.spuCode}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="品牌">{infos.brandName}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="基础商品名称">{infos.productName}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="品牌归属地">{infos.brandAddress}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="后台类目">{infos.cateStr}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="产地">{infos.country}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="B端商品名称"
                name="productBname"
                rules={[{ required: true, message: "请输入B端商品名称" }]}
                shouldUpdate={(preValues, currentValues) =>
                  preValues !== currentValues
                }
              >
                <Input
                  style={{ width: "250px" }}
                  placeholder="请输入内容，54字符以内"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="销售信息">
          <Row>
            <Col span={12}>
              <Form.Item label="供货方式">
                代发（下单后7个工作日发货）
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="是否预售"
                name="isBeforeSales"
                rules={[{ required: true, message: "请选择是否预售" }]}
              >
                <Radio.Group>
                  <Radio value={0}>非预售</Radio>
                  <Radio value={1}>预售</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="label"
                label="商品标签"
                rules={[{ required: true, message: "请输入商品标签" }]}
              >
                <Checkbox.Group>
                  <Checkbox value="上新">上新</Checkbox>
                  <Checkbox value="畅销">畅销</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="SKU信息">
          <Editable changeDataSource={changeDataSource} Columns={Columns} dataSource={goodList} />
          <div className="batch_operate">
            批量操作:　<a>商品提示</a>
          </div>
        </Card>
        <Card title="图文信息">
          <Row>
            <Col span={12}>
              <Form.Item label="商品主图"></Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="图文描述"></Form.Item>
            </Col>
          </Row>
        </Card>
        <div className="handle-operate-save-action">
          <Button onClick={goBack}>返回</Button>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default BgoodsAdd;
