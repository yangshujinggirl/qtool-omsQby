import React from "react";
import { BaseFilter, Qbtn } from "common";
import { Form, Row, Col, Input, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends BaseFilter {
  //点击搜索
  handleSubmit = e => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      removeSpace(values);
      this.props.submit && this.props.submit(values);
    });
  };
  //初始化
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="sku编码">
                {getFieldDecorator("skuCode")(
                  <Input placeholder="请输入sku编码" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="最后修改人">
                {getFieldDecorator("operator")(
                  <Input placeholder="请输入最后修改人" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="定时操作">
                {getFieldDecorator("operateType")(
                  <Select
                    allowClear={true}
                    placeholder="请选择定时操作"
                    className="select"
                  >
                    <Option value="1">商品状态</Option>
                    <Option value="2">商品提示</Option>
                    <Option value="3">商品标签</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="状态">
                {getFieldDecorator("taskStatus")(
                  <Select
                    allowClear={true}
                    placeholder="请选择状态"
                    className="select"
                  >
                    <Option value="0">待执行</Option>
                    <Option value="1">已执行</Option>
                    <Option value="-1">已失效</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem className="oms-condition-operate">
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

const FilterForm = Form.create({})(NormalForm);
export default FilterForm
