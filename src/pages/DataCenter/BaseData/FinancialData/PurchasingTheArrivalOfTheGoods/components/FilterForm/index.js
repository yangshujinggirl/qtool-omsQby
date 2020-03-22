import React from "react";
import {Form, Input, Row, Col} from "antd";
import {BaseFilter, Qbtn} from "common";
import {FilterSearchRangeTime} from "common/QdisabledDateTime";

const FormItem = Form.Item;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();

    render() {
        return (
            <div className="qtoolOms-condition">
                <Form className="serach-common-form" ref={this.formRef}{...this.formItemLayout}>
                    <Row gutter={24}>
                        <Col {...this.colspans}>
                            <FormItem label="供应商名称" name="supplierName" {...this.formItemLayout}>
                                <Input placeholder="请输入供应商名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FilterSearchRangeTime
                                selectTimeChange={this.props.selectTimeChange}
                                startTimeName="createTimeST" endTimeName="createTimeET" label="收货时间"
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
