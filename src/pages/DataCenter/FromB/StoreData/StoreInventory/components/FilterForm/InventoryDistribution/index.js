import React from "react";
import {Form, Input, Row, Col, Select} from "antd";
import {BaseFilter, Qbtn} from "common";
import {
    INVENTORY_DISTRIBUTION_STORE_TYPE_DIRECT_SALES, INVENTORY_DISTRIBUTION_STORE_TYPE_JOIN_IN,
    INVENTORY_DISTRIBUTION_STORE_TYPE_JOINT_OPERATION
} from "../../../Config";

const FormItem = Form.Item;
const { Option } = Select;

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
                            <FormItem label="门店类型" name="type" {...this.formItemLayout}>
                                <Select placeholder="请选择门店类型">
                                    <Option
                                        value={INVENTORY_DISTRIBUTION_STORE_TYPE_DIRECT_SALES}>直营</Option>
                                    <Option
                                        value={INVENTORY_DISTRIBUTION_STORE_TYPE_JOINT_OPERATION}>联营</Option>
                                    <Option
                                        value={INVENTORY_DISTRIBUTION_STORE_TYPE_JOIN_IN}>加盟</Option>
                                </Select>
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
