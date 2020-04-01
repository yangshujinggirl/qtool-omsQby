import React, { Component } from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input, Select, DatePicker } from "antd";
import { searchStoreApi } from "api/home/orderCenter/PurchaseOrder/PurchaseIn";
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class NormalForm extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      storeList: []
    };
  }
  formRef = React.createRef();
  componentDidMount = () => {
    searchStoreApi().then(res => {
      if (res.httpCode == 200) {
        this.setState({
          storeList: res.result
        });
      }
    });
  };

  //初始化
  render() {
    const { storeList } = this.state;
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          className="serach-common-form"
          {...this.formItemLayout}
        >
          <Row>
            <Col {...this.colspan}>
              <Form.Item name="orderDetailNo" label="订单号">
                <Input placeholder="请输入订单号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="channelOrderNo" label="渠道订单号">
                <Input placeholder="请输入渠道订单号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="outerProductCode" label="第三方商品编码">
                <Input placeholder="请输入第三方商品编码" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="skuCode" label="商品编码">
                <Input placeholder="请输入商品编码" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="productName" label="商品名称">
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="consignee" label="收货人">
                <Input placeholder="请输入收货人" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="phone" label="联系电话">
                <Input placeholder="请输入联系电话" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="idNumber" label="身份证号">
                <Input placeholder="请输入身份证号" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="orderStatus" label="订单状态">
                <Select allowClear={true} placeholder="请选择订单状态">
                  <Option value={1}>待发货</Option>
                  <Option value={2}>已发货</Option>
                  <Option value={3}>已取消</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item label="推送仓库" name="warehouseCode">
                <Select placeholder="请选择收货仓库">
                  {storeList.length > 0 &&
                    storeList.map(item => (
                      <Select.Option value={item.warehouseCode} key={item.id}>
                        {item.warehouseName}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item label="生成时间" name="time">
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item wrapperCol={{span:24}} className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
                  搜索
                </Qbtn>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default NormalForm;
