import React from "react";
import { Form, Row, Col, Input, Select} from "antd";
import { BaseFilter, Qbtn } from "common";

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  //初始化
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <Form.Item name="tabName" label="标签名称">
                <Input placeholder="请输入标签名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item name="tabStatus" label="状态">
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value="1">启用</Option>
                  <Option value="0">禁用</Option>
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
