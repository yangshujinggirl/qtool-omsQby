import React, { Component } from "react";
import { Form, Input, Select, DatePicker,Row,Col } from "antd";
import { moment } from "moment";
import { BaseFilter } from 'common';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class Search extends BaseFilter {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className='serach-common-form'>
          <Row gutter={8}>
            <Col span={6}>
              <FormItem label="商品名称" >
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入商品名称" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="货主">
                {getFieldDecorator("supplierName")(
                  <Input placeholder="请输入货主" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="spu编码">
                {getFieldDecorator("spuCode")(
                  <Input placeholder="请输入spu编码" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <FormItem label="sku编码">
                {getFieldDecorator("skuCode")(
                  <Input placeholder="请输入sku编码" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="商品品牌">
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入商品品牌" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="后台一级类目">
                {getFieldDecorator("categoryCode1")(
                  <Select placeholder="请选择">
                      <Option value={1}>1</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <FormItem label="后台二级类目">
                {getFieldDecorator("categoryCode2")(
                  <Select placeholder="请选择">
                    <Option value={1}>1</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="商品种类">
                {getFieldDecorator("productNature")(
                  <Select placeholder="请选择">
                      <Option value={1}>普通商品</Option>
                      <Option value={2}>跨境商品</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="商品类型">
                {getFieldDecorator("productType")(
                  <Select placeholder="请选择">
                      <Option value={1}>普通商品</Option>
                      <Option value={2}>赠品</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <FormItem label="发货方式">
                {getFieldDecorator("sendType")(
                  <Select placeholder="请选择">
                    <Option value={1}>系统发货</Option>
                    <Option value={2}>供应商发货</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="审核状态">
                {getFieldDecorator("status")(
                  <Select placeholder="请选择">
                    <Option value={0}>待提交</Option>
                    <Option value={1}>待审核</Option>
                    <Option value={2}>审核不通过</Option>
                    <Option value={3}>审核通过</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="创建时间">
                {getFieldDecorator("time")(
                  <RangePicker
                    placeholder={this.placeholder}
                    format="YYYY-MM-DD HH:mm:ss" showTime />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
const SearchForm = Form.create({})(Search);
export default SearchForm;
