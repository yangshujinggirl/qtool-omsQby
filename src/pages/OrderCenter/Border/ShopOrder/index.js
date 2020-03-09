import React, {Component} from 'react';
import moment from "moment";
import FilterForm from "./components/FilterForm";
import {NET_REQUEST_SUCCESS_CODE} from "../../../../api/Req";
import {GetShopOrderListApi} from "../../../../api/home/OrderCenter/Border/ShopOrder";
import {Qbtn, Qpagination, Qtable} from "common/index";
import Columns from "./column";
import {Link} from "react-router-dom";
import {EXPORT_TYPE_PURCHASE_ORDER_OUT, ExportApi, getExportData} from "../../../../api/Export";

/**
 * 功能作用：门店订单列表页面
 * 初始注释时间： 2020/3/9 12:13
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class ShopOrderList extends Component {
    /**
     * 时间格式化字符串
     * @type {string}
     */
    timeFormatStr = "YYYY-MM-DD";

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
            inputValues: {
                stime: moment(new Date(new Date() - 2592000000)).format(this.timeFormatStr),
                etime: moment(new Date()).format(this.timeFormatStr)
            },
            /**
             * 选中的数据key列表
             */
            selectedRowKeys: [],
            /**
             * 选中的数据实体列表
             */
            selectedRows: [],
            /**
             * 是否显示加载中
             */
            showLoading: false,
        }
    }

    /**
     * 第一次渲染之后调用数据
     */
    componentDidMount = () => {
        this.searchDataList();
    };

    /**
     * 搜索数据列表
     * @param values 搜索数据
     */
    searchDataList = (values) => {
        let {stime, etime} = this.state.inputValues;
        if (values != null && values.orderTimes != null) {
            stime = values.orderTimes[0].format(this.timeFormatStr);
            etime = values.orderTimes[1].format(this.timeFormatStr);
            values.orderTimes = null
        }
        this.setState({
            stime, etime
        });
        this.showLoading();
        const params = {...this.state.inputValues, ...values};
        GetShopOrderListApi(params).then(res => {
            this.hideLoading();
            if (res.httpCode === NET_REQUEST_SUCCESS_CODE) {
                const {resultList, everyPage, totalCount, currentPage} = res.result;
                let dataList = [];
                //必须要有key，否则无法进行选择
                resultList.map((item) => {
                    dataList.push({
                        key: item["stockingCode"],
                        ...item
                    })
                });
                this.setState({
                    dataList: dataList,
                    everyPage,
                    totalCount: totalCount,
                    currentPage,
                    inputValues: params,
                    selectedRowKeys: []
                });
            }
        }).catch(() => {
            this.hideLoading();
        });
    };

    /**
     * 选择改变回调
     * @param selectedRowKeys
     * @param selectedRows
     */
    rowSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows
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
     * 显示加载中
     */
    showLoading = () => {
        this.setState({
            showLoading: true
        })
    };

    /**
     * 隐藏加载中
     */
    hideLoading = () => {
        this.setState({
            showLoading: false
        })
    };

    /**
     * 绘制渲染部分
     * @return {*}
     */
    render() {
        const {
            selectedRowKeys, dataList, everyPage, currentPage,
            totalCount
        } = this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={this.searchDataList}
                            stime={this.state.inputValues.stime}
                            etime={this.state.inputValues.etime}/>
                <div className="handle-operate-btn-action">
                    <Link to='/account/add_purchasein'><Qbtn size="free">新建门店订单</Qbtn></Link>
                    <Link to='/account/add_purchasein'><Qbtn size="free">新建赠品单</Qbtn></Link>
                    <Qbtn size="free"
                          onClick={() => ExportApi(getExportData(this.state.inputValues.stime, this.state.inputValues.etime,
                              EXPORT_TYPE_PURCHASE_ORDER_OUT, this.state.inputValues))}>导出数据</Qbtn>
                </div>
                <Qtable
                    columns={Columns}
                    select={true}
                    dataSource={dataList}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: this.rowSelectChange,
                    }}/>
                <Qpagination
                    data={{everyPage, currentPage, totalCount}}
                    onChange={this.changePage}
                />
            </div>
        );
    }
}
