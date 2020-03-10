import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {Qbtn} from "common";
import moment from "moment";
import {BaseFilter} from "common/index";
import {AUDIT_STATUS_SENT, AUDIT_STATUS_WAIT_SEND} from "../../config";
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
                            <FormItem label="退货单号" name="stockingCode" {...this.formItemLayout}>
                                <Input placeholder="请输入退货单号" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="suppliersName" label="门店名称" {...this.formItemLayout}>
                                <Input placeholder="请输入门店名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="itemCode" label="关联门店订单号" {...this.formItemLayout}>
                                <Input placeholder="请输入关联门店订单号" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品编码" name="itemName" {...this.formItemLayout}>
                                <Input placeholder="请输入商品编码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品名称" name="itemName" {...this.formItemLayout}>
                                <Input placeholder="请输入商品名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="订单状态" name="step" {...this.formItemLayout}>
                                <Select placeholder="请选择订单状态" allowClear={true}>
                                    <Option value={AUDIT_STATUS_WAIT_SEND}>待发货</Option>
                                    <Option value={AUDIT_STATUS_SENT}>已发货</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                defaultValue={[moment(this.searchCriteriaDefaultStartTime), moment(this.searchCriteriaDefaultEndTime)]}
                                startTimeName="stime" endTimeName="etime" label="下单时间"
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
