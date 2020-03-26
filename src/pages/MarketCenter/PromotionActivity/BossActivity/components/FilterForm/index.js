import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {Qbtn} from "common";
import moment from "moment";
import {BaseFilter} from "common";
import {FilterSearchRangeTime} from "common/QdisabledDateTime";

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();
    render() {
        return (
            <div className="qtoolOms-condition">
                <Form className="serach-common-form" ref={this.formRef}{...this.formItemLayout}>
                    <Row gutter={24}>
                        <Col {...this.colspans}>
                            <FormItem label="商品编码" name="barCode" {...this.formItemLayout}>
                                <Input placeholder="请输入商品编码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="name" label="商品名称" {...this.formItemLayout}>
                                <Input placeholder="请输入商品名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="batchName" label="活动名称" {...this.formItemLayout}>
                                <Input placeholder="请输入活动名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="活动编号" name="batchNo" {...this.formItemLayout}>
                                <Input placeholder="请输入活动编号" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="活动状态" name="status" {...this.formItemLayout}>
                              <Select allowClear={true} placeholder="请选择活动状态">
                                  <Option value={0}>未开始</Option>
                                  <Option value={1}>进行中</Option>
                                  <Option value={2}>已结束</Option>
                                  <Option value={3}>已失效</Option>
                              </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="最后修改人" name="lastUpdateUser" {...this.formItemLayout}>
                                <Input placeholder="请输入最后修改人" autoComplete="off"/>
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
