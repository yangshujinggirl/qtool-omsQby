import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {BaseFilter, Qbtn} from "common";
import moment from "moment";
import {
    FEEDBACK_HANDLE_TIME_TYPE_FIRST,
    FEEDBACK_HANDLE_TIME_TYPE_SECOND,
    FEEDBACK_HANDLE_TIME_TYPE_THIRD,
    FEEDBACK_STATUS_END,
    FEEDBACK_STATUS_IN_HAND,
    FEEDBACK_STATUS_WAIT,
    FEEDBACK_TYPE_ATTRACT_INVESTMENT,
    FEEDBACK_TYPE_DESIGN,
    FEEDBACK_TYPE_GOODS,
    FEEDBACK_TYPE_OPERATION, FEEDBACK_TYPE_OTHER, FEEDBACK_TYPE_SYSTEM,
} from "../../config";
import {FilterSearchRangeTime} from "common/QdisabledDateTime";

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
                            <FormItem label="反馈编号" name="feedbackNo" {...this.formItemLayout}>
                                <Input placeholder="请输入反馈编号" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="spShopName" label="反馈门店" {...this.formItemLayout}>
                                <Input placeholder="请输入反馈门店" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="反馈类型" name="type"   {...this.formItemLayout}>
                                <Select placeholder="请选择反馈类型" allowClear={true}>
                                    <Option value={FEEDBACK_TYPE_OPERATION}>运营相关问题</Option>
                                    <Option value={FEEDBACK_TYPE_GOODS}>商品相关问题</Option>
                                    <Option value={FEEDBACK_TYPE_DESIGN}>设计相关问题</Option>
                                    <Option value={FEEDBACK_TYPE_ATTRACT_INVESTMENT}>招商相关问题</Option>
                                    <Option value={FEEDBACK_TYPE_SYSTEM}>系统相关问题</Option>
                                    <Option value={FEEDBACK_TYPE_OTHER}>其他</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="反馈状态" name="status"   {...this.formItemLayout}>
                                <Select placeholder="请选择反馈状态" allowClear={true}>
                                    <Option value={FEEDBACK_STATUS_WAIT}>待处理</Option>
                                    <Option value={FEEDBACK_STATUS_IN_HAND}>处理中</Option>
                                    <Option value={FEEDBACK_STATUS_END}>已处理</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="处理时长" name="handleTimeType"   {...this.formItemLayout}>
                                <Select placeholder="请选择处理时长" allowClear={true}>
                                    <Option value={FEEDBACK_HANDLE_TIME_TYPE_FIRST}>0-5h</Option>
                                    <Option value={FEEDBACK_HANDLE_TIME_TYPE_SECOND}>5-24h</Option>
                                    <Option value={FEEDBACK_HANDLE_TIME_TYPE_THIRD}>24h以上</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                defaultValue={[moment(this.searchCriteriaDefaultStartTime), moment(this.searchCriteriaDefaultEndTime)]}
                                startTimeName="createTimeST" endTimeName="createTimeET" label="反馈时间"
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
