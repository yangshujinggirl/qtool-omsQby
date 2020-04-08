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
        <Form
          ref={this.formRef}
          className="serach-common-form"
          {...this.formItemLayout}
        >
          <Row>
            <Col {...this.colspan}>
              <Form.Item name="themeName" label="主题名称">
                <Input placeholder="请输入主题名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="operator" label="最后修改人">
                <Input placeholder="请输入最后修改人" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="themeStatus" label="主题状态">
                <Select allowClear={true} placeholder="请选择主题状态">
                  <Option value={4}>上线</Option>
                  <Option value={5}>下线</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Col span={24}>
          <Form.Item className="oms-condition-operate">
            <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
              搜索
            </Qbtn>
          </Form.Item>
        </Col>
      </div>
    );
  }
}

export default NormalForm;
