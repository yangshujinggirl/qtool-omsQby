import React from "react";
import {Form, Input, Select, Row, Col, DatePicker} from "antd";
import {BaseFilter, Qbtn} from "common";
import moment from "moment";
import {
    WORK_ORDER_C_HANDLE_TIME_TYPE_FIRST,
    WORK_ORDER_C_HANDLE_TIME_TYPE_SECOND,
    WORK_ORDER_C_HANDLE_TIME_TYPE_THIRD,
    WORK_ORDER_C_PRIORITY_HIGH,
    WORK_ORDER_C_PRIORITY_LOW,
    WORK_ORDER_C_PRIORITY_STANDARD,
    WORK_ORDER_C_PRIORITY_URGENCY,
    WORK_ORDER_C_STATUS_CLOSE,
    WORK_ORDER_C_STATUS_OPEN,
    WORK_ORDER_C_STATUS_SOLVE,
    WORK_ORDER_C_STATUS_SOLVING,
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
                            <FormItem label="工单id" name="udeskTicketId" {...this.formItemLayout}>
                                <Input placeholder="请输入工单id" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="subject" label="工单主题" {...this.formItemLayout}>
                                <Input placeholder="请输入工单主题" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="工单状态" name="status"   {...this.formItemLayout}>
                                <Select placeholder="请选择工单状态" allowClear={true}>
                                    <Option value={WORK_ORDER_C_STATUS_OPEN}>开启</Option>
                                    <Option value={WORK_ORDER_C_STATUS_SOLVE}>已解决</Option>
                                    <Option value={WORK_ORDER_C_STATUS_CLOSE}>已关闭</Option>
                                    <Option value={WORK_ORDER_C_STATUS_SOLVING}>解决中</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="优先级" name="priority"   {...this.formItemLayout}>
                                <Select placeholder="请选择优先级" allowClear={true}>
                                    <Option value={WORK_ORDER_C_PRIORITY_URGENCY}>紧急</Option>
                                    <Option value={WORK_ORDER_C_PRIORITY_HIGH}>高</Option>
                                    <Option value={WORK_ORDER_C_PRIORITY_STANDARD}>标准</Option>
                                    <Option value={WORK_ORDER_C_PRIORITY_LOW}>低</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="agentGroupName" label="受理客服" {...this.formItemLayout}>
                                <Input placeholder="请输入受理客服" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="处理时长" name="type"   {...this.formItemLayout}>
                                <Select placeholder="请选择处理时长" allowClear={true}>
                                    <Option
                                        value={WORK_ORDER_C_HANDLE_TIME_TYPE_FIRST}>0-5h</Option>
                                    <Option
                                        value={WORK_ORDER_C_HANDLE_TIME_TYPE_SECOND}>5-24h</Option>
                                    <Option
                                        value={WORK_ORDER_C_HANDLE_TIME_TYPE_THIRD}>24h以上</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                defaultValue={[moment(this.searchCriteriaDefaultStartTime), moment(this.searchCriteriaDefaultEndTime)]}
                                startTimeName="createTimeSTStr" endTimeName="createTimeETStr"
                                label="创建时间"
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
