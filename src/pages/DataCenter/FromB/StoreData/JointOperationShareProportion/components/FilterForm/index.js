import React from "react";
import moment from "moment";
import {Form, Row, Col, DatePicker, AutoComplete, Input, Select} from "antd";
import {BaseFilter, Qbtn} from "common";
import {GetStoreIntelligentSearchList} from "../../../../../../../api/home/DataCenter/BaseData/FinancialData";

const FormItem = Form.Item;

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
    };

    componentDidMount() {
        const params = {codes: moment()};
        //设置默认数据
        this.formRef.current.setFieldsValue(params);
        //初次请求
        if (this.props.selectTimeChange != null) {
            this.props.selectTimeChange(params, true)
        }
        //初始化智能搜索数据
        this.handleSearch();
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
                            <FormItem label="门店名称" name="name" {...this.formItemLayout}>
                                <AutoComplete
                                    options={this.state.dataSources}
                                    onSelect={this.onSelect.bind(this)}
                                    onSearch={this.handleSearch.bind(this)}
                                    placeholder='请选择门店名称'
                                    filterOption={(inputValue, option) => option.value != null && option.value.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}/>
                            </FormItem>
                        </Col>
                        <FormItem name="codes" label="选择时间" {...this.formItemLayout}>
                            <DatePicker
                                format={"YYYY-MM"}
                                allowClear={false}
                            />
                        </FormItem>
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
