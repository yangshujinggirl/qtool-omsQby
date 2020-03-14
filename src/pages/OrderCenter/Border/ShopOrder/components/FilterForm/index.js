import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {Qbtn} from "common";
import moment from "moment";
import {
    AGENCY_SEND_STATUS_NO,
    AGENCY_SEND_STATUS_YES,
    AUDIT_STATUS_CANCEL,
    AUDIT_STATUS_SENT,
    AUDIT_STATUS_STAY_IN_A_SINGLE,
    AUDIT_STATUS_WAIT_PENDING,
    AUDIT_STATUS_WAIT_SEND, DIRECT_MAIL_STATUS_NO, DIRECT_MAIL_STATUS_YES,
    ORDER_FROM_Q_SHOPKEEPER,
    ORDER_FROM_Q_TOY_STORY_LAND, PRE_SELL_STATUS_NO,
    PRE_SELL_STATUS_YES
} from "../../config";
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
                                    <Option value={AUDIT_STATUS_WAIT_PENDING}>待处理</Option>
                                    <Option value={AUDIT_STATUS_STAY_IN_A_SINGLE}>待合单</Option>
                                    <Option value={AUDIT_STATUS_WAIT_SEND}>待发货</Option>
                                    <Option value={AUDIT_STATUS_SENT}>已发货</Option>
                                    <Option value={AUDIT_STATUS_CANCEL}>已取消</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="订单来源" name="source" {...this.formItemLayout}>
                                <Select placeholder="请选择订单来源" allowClear={true}>
                                    <Option value={ORDER_FROM_Q_TOY_STORY_LAND}>Q本营</Option>
                                    <Option value={ORDER_FROM_Q_SHOPKEEPER}>Q掌柜</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="是否预售" name="preSellStatus" {...this.formItemLayout}>
                                <Select placeholder="请选择" allowClear={true}>
                                    <Option value={PRE_SELL_STATUS_YES}>是</Option>
                                    <Option value={PRE_SELL_STATUS_NO}>否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="是否直邮" name="step" {...this.formItemLayout}>
                                <Select placeholder="请选择" allowClear={true}>
                                    <Option value={DIRECT_MAIL_STATUS_YES}>是</Option>
                                    <Option value={DIRECT_MAIL_STATUS_NO}>否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="是否代发" name="step" {...this.formItemLayout}>
                                <Select placeholder="请选择" allowClear={true}>
                                    <Option value={AGENCY_SEND_STATUS_YES}>是</Option>
                                    <Option value={AGENCY_SEND_STATUS_NO}>否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                defaultValue={[moment(this.searchCriteriaDefaultStartTime), moment(this.searchCriteriaDefaultEndTime)]}
                                startTimeName="dateStart" endTimeName="dateEnd" label="下单时间"
                                itemLayout={this.formItemLayout}/>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                startTimeName="deliveryTimeST" endTimeName="deliveryTimeET" label="发货时间"
                                itemLayout={this.formItemLayout}/>
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
