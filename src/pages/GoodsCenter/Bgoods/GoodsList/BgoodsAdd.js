import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Radio,
  message,
  Checkbox,
  Card,
} from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  GetGoodDetailApi,
  saveGoodApi,
} from "api/home/GoodsCenter/Bgoods/GoodList";
import "./index.less";
import Editable from "./components/Editable";
import { editColumns as Columns } from "./column";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: {
    span: 18,
  },
};
const BgoodsAdd = (props) => {
  const [form] = Form.useForm();
  const [infos, setInfos] = useState({});
  const [tipStatus, setTipStatus] = useState(0);
  const [goodList, setGoodList] = useState([]);
  const batchTips = useRef();
  //请求详情
  useEffect(() => {
    const { id } = props.match.params;
    console.log(typeof id);
    GetGoodDetailApi({ id }).then((res) => {
      if (res.httpCode == "200") {
        const { result } = res;
        formatValue(result);
        form.setFieldsValue({
          productBname: result.productBname,
          isBeforeSales: result.isBeforeSales,
          label: result.label,
        });
      }
    });
  }, []);
  //得到数据后处理
  const formatValue = (result) => {
    let goodList = [];
    const { subList } = result;
    if (subList.length > 0) {
      goodList = result.subList.map((item) => {
        item.key = item.id;
        return item;
      });
    }
    const label = [];
    if (result.isHot) {
      label.push("畅销");
    }
    if (result.isNew) {
      label.push("上新");
    }
    result.label = label;
    setInfos(result);
    setGoodList(goodList);
  };
  //更新table数据
  const changeDataSource = (newData) => {
    setGoodList(newData);
  };
  //保存
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const { label, ..._values } = values;
      _values.isNew = label.some((item) => item == "上新") ? 1 : 0;
      _values.isHot = label.some((item) => item == "畅销") ? 1 : 0;
      const listSkus = [];
      goodList.map((item) => {
        listSkus.push({ id: item.id, skuTips: item.skuTips });
      });
      _values.listSkus = listSkus;
      _values.id = props.match.params.id;
      saveGoodApi(_values).then((res) => {
        message.success("保存成功", 0.8);
        props.history.push("/account/commodities_list");
      });
    } catch (error) {
      console.log(error);
    }
  };
  //返回
  const goBack = () => {
    props.history.push("/account/commodities_list");
  };
  //批量操作显示
  const changeStatus = () => {
    setTipStatus(1);
  };
  //批量操作
  const batchOperate = () => {
    const { value } = batchTips.current.state;
    const newData = goodList.map((item) => {
      item.skuTips = value;
      return item;
    });
    setGoodList([...newData]);
    setTipStatus(0);
  };
  return (
    <div className="oms-common-addEdit-pages bgood_add">
      <Form form={form} name="search_form" {...formItemLayout}>
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
              >
                <Input
                  style={{ width: "250px" }}
                  placeholder="请输入内容，54字符以内"
                  autoComplete="off"
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
          {goodList.length > 0 && (
            <Editable
              changeDataSource={changeDataSource}
              Columns={Columns}
              dataSource={goodList}
            />
          )}
          <div className="batch_operate">
            批量操作:
            <div className="sub_content">
              {tipStatus == 1 ? (
                <span>
                  <Input
                    ref={batchTips}
                    placeholder="该内容会显示在掌柜，请谨慎填写"
                    style={{ width: "250px", margin: "0 8px" }}
                  />
                  <CheckOutlined
                    onClick={batchOperate}
                    style={{ fontSize: "12px", color: "#35bab0" }}
                  />
                </span>
              ) : (
                <a onClick={changeStatus}>商品提示</a>
              )}
            </div>
          </div>
        </Card>
        <Card title="图文信息">
          <Row>
            <Col span={18}>
              <Form.Item
                label="商品主图"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                {infos.spuImg &&
                  infos.spuImg.length > 0 &&
                  JSON.parse(infos.spuImg).map((item, index) => (
                    <img
                      key={index}
                      className="main_img"
                      src={sessionStorage.getItem("oms_fileDomain") + item}
                    />
                  ))}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <Form.Item
                label="图文描述"
                className="container"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                {infos.productDetailImg &&
                  infos.productDetailImg.length > 0 &&
                  JSON.parse(infos.productDetailImg).map((item, index) =>
                    item.type == 1 ? (
                      <div key={index} className="b_list_img_content">
                        {item.content}
                      </div>
                    ) : (
                      <img
                        className="content_img"
                        key={index}
                        src={
                          sessionStorage.getItem("oms_fileDomain") +
                          item.content
                        }
                      />
                    )
                  )}
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <div className="handle-operate-save-action">
          <Button onClick={goBack}>返回</Button>
          <Button type="primary" onClick={onFinish}>
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default BgoodsAdd;
