import React from "react";
import FilterForm from "./components/FilterForm";
import {connect} from "react-redux";
import {Qbtn, Qpagination} from "common/index";
import Columns from "./column";
import Qtable from "common/Qtable";
import {GetPurchaseInOrderListApi} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import QsubTable from "common/QsubTable";

/**
 * 功能作用：采购订单列表界面
 * 初始注释时间： 2020/3/5 18:08
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class PurchaseInOrderList extends React.Component {
    /**
     * 初始化
     */
    constructor() {
        super();
        this.state = {
            dataList: [],
            everyPage: 20,
            currentPage: 0,
            totalCount: 0,
            inputValues: {},
            selectedRowKeys: []
        }
    }

    /**
     * 第一次渲染之后调用数据
     */
    componentDidMount = () => {
        this.searchDataList();
    };

    /**
     * 选择改变回调
     * @param selectedRowKeys
     * @param selectedRows
     */
    rowSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys
        });
    };
    /**
     * 更改分页
     * @param currentPage 目标页面
     * @param everyPage 每页数量
     */
    changePage = (currentPage, everyPage) => {
        this.searchDataList({...this.state.inputValues, currentPage, everyPage});
    };
    /**
     * 搜索数据列表
     * @param values 搜索数据
     */
    searchDataList = (values) => {
        const params = {...this.state.inputValues, ...values};
        GetPurchaseInOrderListApi(params).then(res => {
            if (res.httpCode === 200) {
                const {resultList, everyPage, totalCount, currentPage} = res.result;
                this.setState({
                    dataList: resultList,
                    everyPage,
                    totalCount: totalCount,
                    currentPage,
                    inputValues: params
                });
            }
        });
    };

    /**
     * 绘制渲染部分
     * @return {*}
     */
    render() {
        const {selectedRowKeys, dataList, everyPage, currentPage, totalCount} = this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={this.searchDataList}/>
                <div className="handle-operate-btn-action">
                    <Qbtn size="free">新建采购单</Qbtn>
                    <Qbtn size="free">强制完成</Qbtn>
                    <Qbtn size="free">批量审核</Qbtn>
                    <Qbtn size="free">打印采购单</Qbtn>
                    <Qbtn size="free">导出数据</Qbtn>
                </div>
                <Qtable
                    columns={Columns}
                    select={true}
                    dataSource={dataList}
                    rowSelection={{
                        onChange: this.rowSelectChange,
                        selectedRowKeys
                    }}/>
                <Qpagination
                    data={{everyPage, currentPage, totalCount}}
                    onChange={this.changePage}
                />
            </div>
        );
    }
}
