import React from "react";
import {Form, Input, Select, Row, Col} from "antd";
import {BaseFilter, Qbtn} from "common";
import moment from "moment";
import {
    SHOPKEEPER_COST_TYPE_ALLOCATE_SPENDING,
    SHOPKEEPER_COST_TYPE_CANCEL_THE_REFUND,
    SHOPKEEPER_COST_TYPE_CARRY_OUT,
    SHOPKEEPER_COST_TYPE_IN_ALLOCATING_INCOME,
    SHOPKEEPER_COST_TYPE_LOGISTICS,
    SHOPKEEPER_COST_TYPE_ORDER, SHOPKEEPER_COST_TYPE_SALES_OF_THE_REFUND,
    SHOPKEEPER_COST_TYPE_SALES_REVENUE,
    SHOPKEEPER_COST_TYPE_SETTLEMENT_OF_CASHIER,
    SHOPKEEPER_COST_TYPE_STORE_TOP_UP, SHOPKEEPER_COST_TYPE_WITHDRAWAL_RELEASE,
    SHOPKEEPER_STATUS_IN,
    SHOPKEEPER_STATUS_OUT,
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
                            <FormItem label="门店名称" name="shopName" {...this.formItemLayout}>
                                <Input placeholder="请输入门店名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="status" label="收支筛选" {...this.formItemLayout}>
                                <Select placeholder="请选择收支筛选" allowClear={true}>
                                    <Option value={SHOPKEEPER_STATUS_OUT}>收款</Option>
                                    <Option value={SHOPKEEPER_STATUS_IN}>支出</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="费用类型" name="type"   {...this.formItemLayout}>
                                <Select placeholder="请选择费用筛选" allowClear={true}>
                                    <Option value={SHOPKEEPER_COST_TYPE_ORDER}>订单费用</Option>
                                    <Option value={SHOPKEEPER_COST_TYPE_STORE_TOP_UP}>门店充值</Option>
                                    <Option value={SHOPKEEPER_COST_TYPE_LOGISTICS}>物流费用</Option>
                                    <Option
                                        value={SHOPKEEPER_COST_TYPE_SETTLEMENT_OF_CASHIER}>收银结算</Option>
                                    <Option
                                        value={SHOPKEEPER_COST_TYPE_CANCEL_THE_REFUND}>取消退款</Option>
                                    <Option
                                        value={SHOPKEEPER_COST_TYPE_ALLOCATE_SPENDING}>调拨支出</Option>
                                    <Option
                                        value={SHOPKEEPER_COST_TYPE_IN_ALLOCATING_INCOME}>调拨收入</Option>
                                    <Option value={SHOPKEEPER_COST_TYPE_SALES_REVENUE}>销售收入</Option>
                                    <Option value={SHOPKEEPER_COST_TYPE_CARRY_OUT}>提现转出</Option>
                                    <Option
                                        value={SHOPKEEPER_COST_TYPE_WITHDRAWAL_RELEASE}>提现释放</Option>
                                    <Option
                                        value={SHOPKEEPER_COST_TYPE_SALES_OF_THE_REFUND}>销售退款</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                defaultValue={[moment(this.searchCriteriaDefaultStartTime), moment(this.searchCriteriaDefaultEndTime)]}
                                startTimeName="dateStart" endTimeName="dateEnd" label="时间选择"
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
