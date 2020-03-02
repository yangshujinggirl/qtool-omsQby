import React from "react";
import { BaseFilter, Qbtn } from "common";
import { Form, Row, Col, Input, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends BaseFilter {
  //初始化
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="sku编码">
                {getFieldDecorator("code")(
                  <Input placeholder="请输入sku编码" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            
            <Col {...this.colspans}>
              <FormItem label="操作类型">
                {getFieldDecorator("opstatus")(
                  <Select
                    allowClear={true}
                    placeholder="请选择操作类型"
                    className="select"
                  >
                    <Option value="1">上架</Option>
                    <Option value="2">下架</Option>
                    <Option value="3">上新</Option>
                    <Option value="4">下新</Option>
                    <Option value="5">上畅销</Option>
                    <Option value="6">下畅销</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="状态">
                {getFieldDecorator("status")(
                  <Select
                    allowClear={true}
                    placeholder="请选择状态"
                    className="select"
                  >
                    <Option value="1">待执行</Option>
                    <Option value="2">已执行</Option>
                    <Option value="0">已失效</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="最后修改人">
                {getFieldDecorator("updateUserName")(
                  <Input placeholder="请输入最后修改人" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
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
