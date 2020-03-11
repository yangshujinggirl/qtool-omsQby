import React from 'react'
import { Input, Row, Col, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;

class Search extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem
                name="countryName"
                label="国家地区名称"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入国家地区名称" autoComplete="off" />
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
export default Search;
