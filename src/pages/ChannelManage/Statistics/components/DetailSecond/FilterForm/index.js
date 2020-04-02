import React from "react";
import { Form, Row, Col, Input, DatePicker } from "antd";
import  disabledDate  from "../../dateSet";
import { Qbtn, BaseFilter } from "common";
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className='qtoolOms-condition"'>
        <Form ref={this.formRef} className="qtools-condition-form">
          <Row gutter={8}>
            <Col>
              <FormItem name="name" label="二级渠道名称">
                <Input placeholder="请输入二级渠道名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col>
              <FormItem name="channelPopularizeCoding" label="二级渠道ID">
                <Input placeholder="请输入二级渠道ID" autoComplete="off" />
              </FormItem>
            </Col>
            <Col>
              <FormItem name="time" label="统计时间">
                <RangePicker
                  className="ant-input-fixed"
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                />
              </FormItem>
            </Col>
            <Col offset={21}>
              <div className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
                  搜索
                </Qbtn>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default NormalForm;
