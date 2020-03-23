import React from "react";
import {Form, Input, Row, Col, AutoComplete, Select} from "antd";
import {BaseFilter, Qbtn} from "common";
import {GetStoreIntelligentSearchList} from "../../../../../../../api/home/DataCenter/BaseData/FinancialData";
import {GetFirstLevelClassFyList} from "../../../../../../../api/home/DataCenter/BaseData/WarehouseData";

const FormItem = Form.Item;
const { Option } = Select;

export default class SearchForm extends BaseFilter {
    formRef = React.createRef();
    state = {
        /**
         * 自动完成数据
         */
        dataSources: [],
        /**
         * 智能提示中选择的门店id
         */
        spShopId: "",
        /**
         * 分类列表
         */
        pdCategorys: []
    };

    componentDidMount() {
        //初始化智能搜索数据
        this.handleSearch();
        //获取分类数据
        new GetFirstLevelClassFyList().then(rep => {
            this.setState({
                pdCategorys: rep.result.result
            })
        })
    }

    //智能搜索
    handleSearch(value) {
        this.setState({
            spShopId: null
        });
        let values = {name: value};
        new GetStoreIntelligentSearchList(values)
            .then(rep => {
                const shops = rep.result.result;
                const dataSources = [];
                for (let i = 0; i < shops.length; i++) {
                    dataSources.push({
                        value: shops[i].name,
                        spShopId: shops[i].spShopId
                    })
                }
                this.setState({
                    dataSources: dataSources
                });
            });
    }

    /**
     * 自动完成中的选择
     * @param value 选中的数据值
     * @param data 选中的数据实体
     */
    onSelect(value, data) {
        this.setState({
            spShopId: data.spShopId
        })
    }

    render() {
        return (
            <div className="qtoolOms-condition">
                <Form className="serach-common-form" ref={this.formRef}{...this.formItemLayout}>
                    <Row gutter={24}>
                        <Col {...this.colspans}>
                            <FormItem label="门店名称" name="bspname" {...this.formItemLayout}>
                                <AutoComplete
                                    options={this.state.dataSources}
                                    onSelect={this.onSelect.bind(this)}
                                    onSearch={this.handleSearch.bind(this)}
                                    placeholder='请选择门店名称'
                                    filterOption={(inputValue, option) => option.value != null && option.value.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}/>

                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="pdSpuName" label="商品名称" {...this.formItemLayout}>
                                <Input placeholder="请输入商品名称" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem name="barcode" label="商品条码" {...this.formItemLayout}>
                                <Input placeholder="请输入商品条码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品编码" name="code" {...this.formItemLayout}>
                                <Input placeholder="请输入商品编码" autoComplete="off"/>
                            </FormItem>
                        </Col>
                        <Col {...this.colspans}>
                            <FormItem label="商品分类" name="pdCategoryId" {...this.formItemLayout}>
                                <Select placeholder="请选择商品分类">
                                    {
                                        this.state.pdCategorys.map((item, index) => {
                                            return (<Option value={String(item.pdCategoryId)}
                                                            key={index}>{item.name}</Option>)
                                        })
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
