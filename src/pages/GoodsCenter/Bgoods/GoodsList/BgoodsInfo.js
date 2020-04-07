import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Radio, Card } from "antd";
import { GetGoodDetailApi } from "api/home/GoodsCenter/Bgoods/GoodList";
import "./index.less";
import { Qtable } from "common";
import { editColumns as Columns } from "./column";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: {
    span: 18
  }
};
const BgoodsAdd = props => {
  const [infos, setInfos] = useState({});
  const [goodList, setGoodList] = useState([]);
  //请求详情
  useEffect(() => {
    const { id } = props.match.params;
    GetGoodDetailApi({ id }).then(res => {
      if (res.httpCode == "200") {
        const { result } = res;
        formatValue(result);
      }
    });
  }, []);
  //得到数据后处理
  const formatValue = result => {
    let goodList = [];
    const { subList } = result;
    if (subList.length > 0) {
      goodList = result.subList.map(item => {
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
  return (
    <div className="oms-common-addEdit-pages bgood_add">
      <Form {...formItemLayout}>
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
              <Form.Item label="B端商品名称">
                <span>{infos.productBname}</span>
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
              <Form.Item label="是否预售">
                <span>{infos.isBeforeSales ? "预售" : "非预售"}</span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="商品标签">
                {infos.label &&
                  infos.label.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="SKU信息">
          {goodList.length > 0 && (
            <Qtable dataSource={goodList} columns={Columns} />
          )}
        </Card>
        <Card title="图文信息">
          <Row>
            <Col span={12}>
              <Form.Item label="商品主图"></Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="图文描述">
                
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};
export default BgoodsAdd;
