import React from "react";
import {Form, Input, Row, Col} from "antd";
import {BaseFilter, Qbtn} from "common";

const FormItem = Form.Item;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();
    state = {
        provinceList: []
    };

    render() {
        return (
            <div className="qtoolOms-condition">
                <Form className="serach-common-form" ref={this.formRef}{...this.formItemLayout}>
                    <Row gutter={24}>
                        <Col {...this.colspans}>
                            <FormItem label="一级渠道名称" name="name" {...this.formItemLayout}>
                                <Input placeholder="请输入一级渠道名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="channelPopularizeCoding"
                                      label="一级渠道ID" {...this.formItemLayout}>
                                <Input placeholder="请输入一级渠道ID" autoComplete="off"/>
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
