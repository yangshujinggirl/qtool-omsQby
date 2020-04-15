import React from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input, Select } from "antd";
const Option = Select.Option;

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  //初始化
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} className="serach-common-form">
          <Row>
            <Col {...this.colspans}>
              <Form.Item
                name="themeName"
                label="主题名称"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入主题名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item
                name="operator"
                label="最后修改人"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入最后修改人" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item
                name="themeStatus"
                label="主题状态"
                {...this.formItemLayout}
              >
                <Select allowClear={true} placeholder="请选择主题状态">
                  <Option value={4}>上线</Option>
                  <Option value={5}>下线</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="oms-condition-operate">
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
