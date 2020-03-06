import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {BaseFilter, Qbtn} from "common";
import moment from "moment";
import {
    AUDIT_STATUS_NO_PASS, AUDIT_STATUS_PASS, AUDIT_STATUS_WAIT,
    ORDER_STATUS_LOADING, ORDER_STATUS_RECEIVED, ORDER_STATUS_WAIT
} from "../../config";

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();

    /**
     * 第一次渲染之后调用数据
     */
    componentDidMount = () => {
        let date = new Date();
        this.formRef.current.setFieldsValue({
            times: [moment(this.props.stime), moment(this.props.etime)]
        })
    };

    render() {
        return (
            <div className="qtoolOms-condition">
                <Form className="serach-common-form" ref={this.formRef}{...this.formItemLayout}>
                    <Row gutter={24}>
                        <Col {...this.colspans}>
                            <FormItem label="采购单号" name="stockingCode" {...this.formItemLayout}>
                                <Input placeholder="请输入采购单号" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="suppliersName" label="供应商名称" {...this.formItemLayout}>
                                <Input placeholder="请输入供应商名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="itemCode" label="商品编码" {...this.formItemLayout}>
                                <Input placeholder="请输入商品编码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品名称" name="itemName" {...this.formItemLayout}>
                                <Input placeholder="请输入商品名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="审核状态" name="status"   {...this.formItemLayout}>
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
                            <FormItem label="下单时间" name="times" rul {...this.formItemLayout}>
                                <RangePicker
                                    placeholder={this.placeholder}
                                    format={this.formatType}
                                    showTime
                                />
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
