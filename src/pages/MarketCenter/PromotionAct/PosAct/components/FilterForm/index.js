import React, { Component } from "react";
import { Form, Row, Col, Input, Button, Icon, Select } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const Option = Select.Option;
class NormalForm extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          {...this.formItemLayout}
          className="serach-common-form"
        >
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem name="pdCode" label="商品编码">
                <Input placeholder="请输入商品编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="promotionId" label="活动ID">
                <Input placeholder="请输入活动ID" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="name" label="活动名称">
                <Input placeholder="请输入活动名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="status" label="活动状态">
                <Select allowClear={true} placeholder="请选择活动状态">
                  <Option value={0} key={0}>
                    全部
                  </Option>
                  <Option value={1} key={1}>
                    待提交
                  </Option>
                  <Option value={2} key={2}>
                    审核中
                  </Option>
                  <Option value={3} key={3}>
                    待开始
                  </Option>
                  <Option value={4} key={4}>
                    进行中
                  </Option>
                  <Option value={5} key={5}>
                    已结束
                  </Option>
                  <Option value={6} key={6}>
                    已作废
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="type" label="促销类型">
                <Select allowClear={true} placeholder="请选择促销类型">
                  <Option value={0} key={0}>
                    全部
                  </Option>
                  <Option key={10} value={10}>
                    单品直降
                  </Option>
                  <Option key={11} value={11}>
                    单品多级满赠
                  </Option>
                  <Option key={20} value={20}>
                    专区多级满元赠
                  </Option>
                  <Option key={21} value={21}>
                    专区多级满件赠
                  </Option>
                  <Option key={22} value={22}>
                    专区多级满元减
                  </Option>
                  <Option key={23} value={23}>
                    专区满件减免
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="createUser" label="发起人">
                <Col {...this.colspans}></Col>
                <Input placeholder="请输入发起人" autoComplete="off" />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Col offset={21}>
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

export default NormalForm;
