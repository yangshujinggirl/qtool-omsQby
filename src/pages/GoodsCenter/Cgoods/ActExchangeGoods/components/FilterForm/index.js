import React from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input } from "antd";
const FormItem = Form.Item;

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          className="serach-common-form"
          {...this.formItemLayout}
        >
          <Row>
            <Col {...this.colspan}>
              <FormItem label="商品 ID" name='pdSpuActiveId'>
                  <Input  placeholder="请输入商品 ID" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspan}>
              <FormItem label="商品名称" name='name'>
                  <Input placeholder="请输入商品名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col span={24}>
              <Form.Item
                wrapperCol={{ span: 24 }}
                className="oms-condition-operate"
              >
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
