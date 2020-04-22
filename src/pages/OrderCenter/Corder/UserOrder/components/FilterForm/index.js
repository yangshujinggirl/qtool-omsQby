import React from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import { BaseFilter, Qbtn } from "common";
const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class SearchForm extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          className="serach-common-form"
          ref={this.formRef}
          {...this.formItemLayout}
        >
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem name="spShopName" label="门店名称">
                <Input placeholder="请输入门店名称" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="orderNo" label="订单号">
                <Input placeholder="请输入订单号" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="productName" label="商品名称">
                <Input placeholder="请输入商品名称" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="skuCode" label="商品编码">
                <Input placeholder="请输入商品编码" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="mobilePhone" label="用户电话">
                <Input placeholder="请输入用户电话" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="orderStatus" label="订单状态">
                <Select allowClear={true} placeholder="请选择" allowClear={true}>
                  <Option value={10}>待付款</Option>
                  <Option value={11}>待发货</Option>
                  <Option value={2}>部分发货</Option>
                  <Option value={13}>已发货</Option>
                  <Option value={14}>已完成</Option>
                  <Option value={-1}>已取消</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="orderType" label="订单类型">
                <Select allowClear={true} placeholder="请选择" allowClear={true}>
                  <Option value={1}>普通订单</Option>
                  <Option value={2}>保税订单</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="deliveryType" label="配送方式">
                <Select allowClear={true} placeholder="请选择" allowClear={true}>
                  <Option value={1}>自提</Option>
                  <Option value={2}>邮寄</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="deliveryWarehouseType" label="出货仓">
                <Select allowClear={true} placeholder="请选择" allowClear={true}>
                  <Option value={2}>混合出仓</Option>
                  <Option value={0}>门店</Option>
                  <Option value={1}>大仓</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="cancelType" label="取消类型">
                <Select allowClear={true} placeholder="请选择" allowClear={true}>
                  <Option value={1}>用户支付前取消</Option>
                  <Option value={2}>用户超时未支付</Option>
                  <Option value={5}>用户超时支付</Option>
                  <Option value={3}>用户发货前整单取消</Option>
                  <Option value={4}>其他</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="platform" label="下单平台">
                <Select allowClear={true} placeholder="请选择" allowClear={true}>
                  <Option value={1}>ios</Option>
                  <Option value={2}>安卓</Option>
                  <Option value={3}>小程序</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="paymentType" label="支付方式">
                <Select allowClear={true} placeholder="请选择" allowClear={true}>
                  <Option value={31}>支付宝</Option>
                  <Option value={41}>微信</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="time" label="下单时间">
                <RangePicker allowClear={true} showTime/>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem wrapperCol={{span:24}} className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit}>
                  搜索
                </Qbtn>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default SearchForm;
