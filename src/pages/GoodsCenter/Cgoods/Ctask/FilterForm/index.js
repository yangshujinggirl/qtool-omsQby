import React from "react";
import { BaseFilter, Qbtn } from "common";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Input, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          className="serach-common-form"
          {...this.formItemLayout}
        >
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem name="skuCode" label="sku编码">
                <Input
                  name="skuCode"
                  placeholder="请输入sku编码"
                  autoComplete="off"
                />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="operator" label="最后修改人">
                <Input
                  name="skuCode"
                  placeholder="请输入最后修改人"
                  autoComplete="off"
                />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="operateType" label="定时操作">
                <Select
                  allowClear={true}
                  placeholder="请选择定时操作"
                  className="select"
                >
                  <Option value="1">商品状态</Option>
                  <Option value="2">商品提示</Option>
                  <Option value="3">商品标签</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="taskStatus" label="状态">
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value="0">待执行</Option>
                  <Option value="1">已执行</Option>
                  <Option value="-1">已失效</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Col span={24}>
          <FormItem className="oms-condition-operate">
            <Qbtn type="primary" onClick={this.handleSubmit}>
              搜索
            </Qbtn>
          </FormItem>
        </Col>
      </div>
    );
  }
}

export default FilterForm;
