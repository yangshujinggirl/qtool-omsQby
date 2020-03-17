import React from "react";
import {Form, Input, Select, Row, Col} from "antd";
import moment from "moment";
import {BaseFilter, Qbtn} from "common";
import {FilterSearchRangeTime} from "common/QdisabledDateTime";
import {
    WORK_ORDER_HANDLE_TIME_TYPE_FIRST, WORK_ORDER_HANDLE_TIME_TYPE_SECOND,
    WORK_ORDER_HANDLE_TIME_TYPE_THIRD,
    WORK_ORDER_STATUS_END,
    WORK_ORDER_STATUS_IN_HAND,
    WORK_ORDER_STATUS_WAIT
} from "../../config";

const FormItem = Form.Item;
const {Option} = Select;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();

    render() {
        return (
            <div className="qtoolOms-condition">
                <Form className="serach-common-form" ref={this.formRef}{...this.formItemLayout}>
                    <Row gutter={24}>
                        <Col {...this.colspans}>
                            <FormItem label="客服单号" name="customServiceNo" {...this.formItemLayout}>
                                <Input placeholder="请输入客服单号" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="customServiceTheme"
                                      label="客服主题" {...this.formItemLayout}>
                                <Input placeholder="请输入客服主题" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="waiter" label="客服人员" {...this.formItemLayout}>
                                <Input placeholder="请输入客服人员" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="客服状态" name="status"   {...this.formItemLayout}>
                                <Select placeholder="请选择客服状态" allowClear={true}>
                                    <Option value={WORK_ORDER_STATUS_WAIT}>待处理</Option>
                                    <Option value={WORK_ORDER_STATUS_IN_HAND}>处理中</Option>
                                    <Option value={WORK_ORDER_STATUS_END}>已处理</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="处理时长" name="handleTimeType"   {...this.formItemLayout}>
                                <Select placeholder="请选择处理时长" allowClear={true}>
                                    <Option
                                        value={WORK_ORDER_HANDLE_TIME_TYPE_FIRST}>0-5h</Option>
                                    <Option
                                        value={WORK_ORDER_HANDLE_TIME_TYPE_SECOND}>5-24h</Option>
                                    <Option
                                        value={WORK_ORDER_HANDLE_TIME_TYPE_THIRD}>24h以上</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                defaultValue={[moment(this.searchCriteriaDefaultStartTime), moment(this.searchCriteriaDefaultEndTime)]}
                                startTimeName="createTimeST" endTimeName="createTimeET"
                                label="开始时间"
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
