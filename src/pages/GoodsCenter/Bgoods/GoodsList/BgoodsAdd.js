import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Input, Radio, message, Checkbox } from "antd";
import { GetGoodDetailApi, saveGoodApi } from "api/home/Bgoods";
import { Qtable } from "common";
const Columns = [
  {
    title: "SKU编码",
    dataIndex: "skucode"
  }
];
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const BgoodsAdd = props => {
  const [form] = Form.useForm();
  const [infos, setInfos] = useState({});
  const [goodList, setGoodList] = useState({});
  useEffect(() => {
    const { id } = props.match.params;
    GetGoodDetailApi({ sku_id: id, saleRange: "b" }).then(res => {
      setInfos(res.result);
      setGoodList(res.result.subList);
    });
  }, []);
  const onFinish = async () => {
    const values = await form.validateFields;
    saveGoodApi({ values }).then(res => {
      message.success("保存成功");
      props.history.push("/account/Bsite");
    });
  };
  const goBack = () => {
    props.history.push("/account/Bsite");
  };
  return (
    <div className="oms-common-addEdit-pages">
      <Form
        initialValues={{
          productBname: infos.productBname,
          isBeforeSales: infos.isBeforeSales,
          label: infos.label
        }}
        form={form}
        onFinish={onFinish}
      >
        <div>
          <h4 className="oms_edit_title">基础信息</h4>
          <Row>
            <Col>
              <Form.Item label="spu编码">{infos.spuCode}</Form.Item>
            </Col>
            <Col>
              <Form.Item label="品牌">{infos.supplierName}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="基础商品名称">{infos.skuCode}</Form.Item>
            </Col>
            <Col>
              <Form.Item label="品牌归属地">{infos.barCode}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="后台类目">{infos.salesAttributeName}</Form.Item>
            </Col>
            <Col>
              <Form.Item label="产地">{infos.supplierName}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                label="B端商品名称"
                name="productBname"
                rules={[{ required: true, message: "请输入商品名称" }]}
              ></Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <h4 className="oms_edit_title">销售信息</h4>
          <Form.Item label="供货方式">代发（下单后7个工作日发货）</Form.Item>
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
          <Form.Item
            name="label"
            label="商品标签"
            rules={[{ required: true, message: "请输入商品标签" }]}
          >
            <Checkbox.Group>
              <Checkbox value="畅销">畅销</Checkbox>
              <Checkbox value="上新">上新</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </div>
        <div>
          <h4 className="oms_edit_title">SKU信息</h4>
          {/* <Qtable Columns={Columns} dataSource={goodList} /> */}
        </div>
        <div>
          <h4 className="oms_edit_title">图文信息</h4>
          <Form.Item name="label" label="商品主图"></Form.Item>
          <Form.Item label="图文描述"></Form.Item>
        </div>
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
