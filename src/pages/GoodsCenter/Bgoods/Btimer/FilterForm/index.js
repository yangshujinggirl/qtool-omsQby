import React from "react";
import { BaseFilter, Qbtn } from "common";
import { Form, Row, Col, Input, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  //初始化
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form" ref={this.formRef}>
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="sku编码" name="code" {...this.formItemLayout}>
                <Input placeholder="请输入sku编码" autoComplete="off" />
              </FormItem>
            </Col>

            <Col {...this.colspans}>
              <FormItem
                label="操作类型"
                name="opstatus"
                {...this.formItemLayout}
              >
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
              </FormItem>
            </Col>
            <Col {...this.colspans} name="status">
              <FormItem label="状态" {...this.formItemLayout}>
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value="1">待执行</Option>
                  <Option value="2">已执行</Option>
                  <Option value="0">已失效</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="最后修改人"
                name="updateUserName"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入最后修改人" autoComplete="off" />
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

export default NormalForm;
