import React from "react";
import {Form, Input, Select, Row, Col} from "antd";
import {BaseFilter, Qbtn} from "common";
import {GetProvinceList} from "../../../../../../api/home/ChannelManage/ChannelCommon";

const FormItem = Form.Item;
const {Option} = Select;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();
    state = {
        provinceList: []
    };

    componentDidMount() {
        new GetProvinceList().then(rep => {
            this.setState({
                provinceList: rep.result
            })
        })
    }

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
                        <Col {...this.colspans}>
                            <FormItem label="省份" name="provinceId"   {...this.formItemLayout}>
                                <Select placeholder="请选择省份" allowClear={true}>
                                    {
                                        this.state.provinceList.length > 0 && this.state.provinceList.map((el) => (
                                            <Option value={el.provinceId}
                                                    key={el.provinceId}>{el.name}</Option>
                                        ))
                                    }
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
