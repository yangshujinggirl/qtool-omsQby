import React from "react";
import {Form, Input, Row, Col, Select} from "antd";
import {BaseFilter, Qbtn} from "common";
import {
    GetFirstLevelClassFyList,
    GetSecondLevelClassFyList
} from "../../../../../../../api/home/DataCenter/BaseData/WarehouseData";
import {TableDataListUtil} from "utils/index";

const FormItem = Form.Item;
const Option = Select.Option;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();
    state = {
        /**
         * 一级分类列表
         */
        firstClassFyLevel: [],
        /**
         * 二级分类列表
         */
        secondClassFyLevel: [],
    };

    componentDidMount() {
        new GetFirstLevelClassFyList()
            .then(rep => {
                this.setState({
                    firstClassFyLevel: TableDataListUtil.addKeyAndResultList(rep.result.result)
                });
            });

    }

    /**
     * 一级分类变更
     * @param e
     */
    firstClassFyLevelChanged(e) {
        this.formRef.current.setFieldsValue({
            pdCategory1Id: e
        });
        new GetSecondLevelClassFyList()
            .then(rep => {
                this.setState({
                    secondClassFyLevel: TableDataListUtil.addKeyAndResultList(rep.pdCategory)
                });
            });
    }


    render() {
        return (
            <div className="qtoolOms-condition">
                <Form className="serach-common-form" ref={this.formRef}{...this.formItemLayout}>
                    <Row gutter={24}>
                        <Col {...this.colspans}>
                            <FormItem label="SPU ID" name="spuId" {...this.formItemLayout}>
                                <Input placeholder="请输入小于11位的spuid" maxLength='10'
                                       autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="pdSpuName" label="商品名称" {...this.formItemLayout}>
                                <Input placeholder="请输入商品名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品编码" name="pdCode" {...this.formItemLayout}>
                                <Input placeholder="请输入商品编码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="pdBarcode" label="商品条码" {...this.formItemLayout}>
                                <Input placeholder="请输入商品条码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="pdCategory1Id" label="一级分类" {...this.formItemLayout}>
                                <Select allowClear={true} placeholder='请选择一级分类'
                                        onChange={this.firstClassFyLevelChanged.bind(this)}>
                                    {
                                        this.state.firstClassFyLevel.map(item => (
                                            <Option value={item.pdCategoryId}
                                                    key={item.pdCategoryId}>
                                                {item.name}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="pdCategory2Id" label="二级分类" {...this.formItemLayout}>
                                <Select allowClear={true} placeholder='请选择二级分类'
                                        disabled={!this.state.secondClassFyLevel.length > 0}>
                                    {
                                        this.state.secondClassFyLevel.map(item => (
                                            <Option value={item.pdCategoryId}
                                                    key={item.pdCategoryId}>
                                                {item.name}
                                            </Option>
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
