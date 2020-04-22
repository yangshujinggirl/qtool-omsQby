import React from "react";
import { Form, Row, Col, Input } from "antd";
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
              <Form.Item name="channelCode" label="门店编码">
                <Input placeholder="请输入门店编码" autoComplete="off"  allowClear={true} />
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item name="channelName" label="门店名称">
                <Input placeholder="请输入门店名称" autoComplete="off"  allowClear={true} />
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
