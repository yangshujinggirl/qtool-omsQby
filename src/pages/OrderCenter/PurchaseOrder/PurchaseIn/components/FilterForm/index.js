import React from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import { BaseFilter, Qbtn } from "common";
import moment from "moment";
import {
  AUDIT_STATUS_NO_PASS,
  AUDIT_STATUS_PASS,
  AUDIT_STATUS_WAIT,
  ORDER_STATUS_LOADING,
  ORDER_STATUS_RECEIVED,
  ORDER_STATUS_WAIT,
} from "../../config";
import { FilterSearchRangeTime } from "common/QdisabledDateTime";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default class SearchForm extends BaseFilter {
  formRef = React.createRef();

  render() {
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form" ref={this.formRef}>
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem
                label="采购单号"
                name="stockingCode"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入采购单号" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                name="suppliersName"
                label="供应商名称"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入供应商名称" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                name="itemCode"
                label="商品编码"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入商品编码" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="商品名称"
                name="itemName"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入商品名称" autoComplete="off"  allowClear={true} />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="审核状态" name="status" {...this.formItemLayout}>
                <Select placeholder="请选择审核状态" allowClear={true}>
                  <Option value={AUDIT_STATUS_WAIT}>待审核</Option>
                  <Option value={AUDIT_STATUS_PASS}>审核通过</Option>
                  <Option value={AUDIT_STATUS_NO_PASS}>审核不通过</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="订单状态" name="step" {...this.formItemLayout}>
                <Select placeholder="请选择订单状态" allowClear={true}>
                  <Option value={ORDER_STATUS_WAIT}>待收货</Option>
                  <Option value={ORDER_STATUS_LOADING}>收货中</Option>
                  <Option value={ORDER_STATUS_RECEIVED}>已收货</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FilterSearchRangeTime
                selectTimeChange={this.props.selectTimeChange}
                defaultValue={[
                  moment(this.searchCriteriaDefaultStartTime),
                  moment(this.searchCriteriaDefaultEndTime),
                ]}
                startTimeName="stime"
                endTimeName="etime"
                label="下单时间"
                itemLayout={this.formItemLayout2}
                showTime
              />
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
