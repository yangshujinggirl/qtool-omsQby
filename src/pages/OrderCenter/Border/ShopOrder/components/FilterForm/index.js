import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {Qbtn} from "common";
import moment from "moment";
import {BaseFilter} from "common/index";
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
                            <FormItem label="订单号" name="orderNo" {...this.formItemLayout}>
                                <Input placeholder="请输入订单号" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="shopName" label="下单门店" {...this.formItemLayout}>
                                <Input placeholder="请输入门店名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="recName" label="收货人" {...this.formItemLayout}>
                                <Input placeholder="请输入收货人" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品编码" name="code" {...this.formItemLayout}>
                                <Input placeholder="请输入商品编码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品名称" name="pdSpuName" {...this.formItemLayout}>
                                <Input placeholder="请输入商品名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="订单状态" name="status" {...this.formItemLayout}>
                                <Select placeholder="请选择订单状态" allowClear={true}>
                                    <Option value={10}>待发货</Option>
                                    <Option value={20}>已发货</Option>
                                    <Option value={30}>已取消</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="订单来源" name="source" {...this.formItemLayout}>
                                <Select placeholder="请选择订单来源" allowClear={true}>
                                    <Option value={2}>Q本营</Option>
                                    <Option value={1}>Q掌柜</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="是否预售" name="preSellStatus" {...this.formItemLayout}>
                                <Select placeholder="请选择" allowClear={true}>
                                    <Option value={1}>是</Option>
                                    <Option value={0}>否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="是否代发" name="sendType" {...this.formItemLayout}>
                                <Select placeholder="请选择" allowClear={true}>
                                    <Option value={2}>是</Option>
                                  <Option value={1}>否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                allowClear={true}
                                selectTimeChange={this.props.selectTimeChange}
                                defaultValue={[moment(this.searchCriteriaDefaultStartTime), moment(this.searchCriteriaDefaultEndTime)]}
                                startTimeName="dateStart" endTimeName="dateEnd" label="下单时间"
                                itemLayout={this.formItemLayout2}/>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                allowClear={true}
                                selectTimeChange={this.props.selectTimeChange}
                                startTimeName="deliveryTimeST" endTimeName="deliveryTimeET" label="发货时间"
                                itemLayout={this.formItemLayout2}/>
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
