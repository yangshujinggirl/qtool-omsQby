import React, { Component } from "react";
import { Form, Input, Select, DatePicker,Row,Col, Button } from "antd";
import { moment } from "moment";
import { BaseFilter, Qbtn } from 'common';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class Search extends BaseFilter {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className='serach-common-form'>
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="商品名称" {...this.formItemLayout}>
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入商品名称" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="货主" {...this.formItemLayout}>
                {getFieldDecorator("supplierName")(
                  <Input placeholder="请输入货主" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="spu编码">
                {getFieldDecorator("spuCode")(
                  <Input placeholder="请输入spu编码" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="sku编码" {...this.formItemLayout}>
                {getFieldDecorator("skuCode")(
                  <Input placeholder="请输入sku编码" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品品牌" {...this.formItemLayout}>
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入商品品牌" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后台一级类目" {...this.formItemLayout}>
                {getFieldDecorator("categoryCode1")(
                  <Select placeholder="请选择">
                      <Option value={1}>1</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后台二级类目" {...this.formItemLayout}>
                {getFieldDecorator("categoryCode2")(
                  <Select placeholder="请选择">
                    <Option value={1}>1</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品种类" {...this.formItemLayout}>
                {getFieldDecorator("productNature")(
                  <Select placeholder="请选择">
                      <Option value={1}>普通商品</Option>
                      <Option value={2}>跨境商品</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品类型" {...this.formItemLayout}>
                {getFieldDecorator("productType")(
                  <Select placeholder="请选择">
                      <Option value={1}>普通商品</Option>
                      <Option value={2}>赠品</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="发货方式" {...this.formItemLayout}>
                {getFieldDecorator("sendType")(
                  <Select placeholder="请选择">
                    <Option value={1}>系统发货</Option>
                    <Option value={2}>供应商发货</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="审核状态" {...this.formItemLayout}>
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
            <Col {...this.colspans}>
              <FormItem label="创建时间" {...this.formItemLayout}>
                {getFieldDecorator("time")(
                  <RangePicker
                    placeholder={this.placeholder}
                    format="YYYY-MM-DD HH:mm:ss" showTime />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem className="oms-condition-operate">
                <Qbtn
                  type="primary"
                  onClick={this.handleSubmit.bind(this)}>
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
const SearchForm = Form.create({})(Search);
export default SearchForm;
