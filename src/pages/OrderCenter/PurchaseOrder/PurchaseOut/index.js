import React from "react";
import FilterForm from "./components/FilterForm";
import {Qbtn, Qmessage, Qpagination} from "common/index";
import Columns from "./column";
import Qtable from "common/Qtable";
import {
    NET_REQUEST_SUCCESS_CODE
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import ConfirmModal from "common/ConfirmModal";
import './index.less'
import {Modal} from "antd";
import BatchReviewModalForm from "./components/BatchReviewModalForm";
import {
    EXPORT_TYPE_PURCHASE_ORDER_OUT,
    ExportApi,
    getExportData
} from "../../../../api/Export";
import moment from "moment";
import {
    GetPurchaseOutOrderListApi,
    PushPurchaseOutOrderBatchReview
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseOut";

/**
 * 功能作用：采退订单列表界面
 * 初始注释时间： 2020/3/5 18:08
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class PurchaseOutOrderList extends React.Component {
    /**
     * 批量审核选择状态， 每次显示弹窗时都会清空
     * @type {null}
     */
    batchReviewSelectStatus = null;
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
            stime: null,
            etime: null,
            /**
             * 选中的数据key列表
             */
            selectedRowKeys: [],
            /**
             * 选中的数据实体列表
             */
            selectedRows: [],
            /**
             * 是否显示Modal弹窗
             */
            showModal: false,
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
     * 搜索数据列表
     * @param values 搜索数据
     */
    searchDataList = (values) => {
        let {stime, etime} = this.state.inputValues;
        if (values != null && values.times != null) {
            stime = values.times[0].format(this.timeFormatStr);
            etime = values.times[1].format(this.timeFormatStr);
            values.times = null
        }
        this.setState({
            stime, etime
        });
        this.showLoading();
        const params = {...this.state.inputValues, ...values};
        GetPurchaseOutOrderListApi(params).then(res => {
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
     * 刷新数据列表，同时隐藏各个弹窗
     */
    refreshDataList = () => {
        //隐藏弹窗同时隐藏加载中
        this.onModalCancelClick();
        //刷新数据
        let currentPage = this.state.currentPage;
        let everyPage = this.state.everyPage;
        this.searchDataList({
            ...this.state.inputValues,
            currentPage,
            everyPage
        });
    };

    /**
     * 显示弹窗
     */
    showModalClick = () => {
        //每次显示弹窗时都会清空
        this.batchReviewSelectStatus = null;
        //判断是否有选择
        if (this.state.selectedRowKeys.length === 0) {
            Qmessage.warn("请至少选择一个采退单")
        } else {
            this.setState({
                showModal: true,
            });
        }

    };

    /**
     * 弹窗确定点击
     */
    onModalConfirmClick = () => {
        if (this.batchReviewSelectStatus == null) {
            Qmessage.warn("请选择审核结果")
        } else {
            this.showLoading();
            //提交审核结果
            PushPurchaseOutOrderBatchReview(this.state.selectedRowKeys, this.batchReviewSelectStatus)
                .then(rep => {
                    if (rep.httpCode === NET_REQUEST_SUCCESS_CODE) {
                        this.refreshDataList();
                        if (rep.result != null) {
                            let resultData = JSON.parse(rep.result);
                            if (resultData != null && resultData["failList"].length > 0) {
                                //存在失败数据，显示失败弹窗
                                Modal.info({
                                    title: '提示',
                                    content: (
                                        <div>
                                            <span>以下采退单信息审核失败，失败原因：采退单已被审核</span>
                                            <br/><br/>
                                            {
                                                resultData["failList"].map((item) => (
                                                    <span>{item}</span>
                                                ))
                                            }

                                        </div>
                                    ),
                                });
                            }
                        } else {
                            Qmessage.success("批量审核成功")
                        }
                    }
                    this.hideLoading();
                })
                .catch((e) => {
                    this.hideLoading();
                    Qmessage.warn(e.message != null ? e.message : "")
                });
        }
    };

    /**
     * 弹窗取消按钮点击
     */
    onModalCancelClick = () => {
        this.setState({
            showModal: false,
        });
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
     * 批量审核选择状态变更
     */
    onBatchReviewSelectStatusChange = (e) => {
        this.batchReviewSelectStatus = e.target.value
    };

    /**
     * 绘制渲染部分
     * @return {*}
     */
    render() {
        const {
            selectedRowKeys, dataList, everyPage, currentPage,
            totalCount, showModal, showLoading
        } = this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={this.searchDataList}
                            stime={this.state.inputValues.stime}
                            etime={this.state.inputValues.etime}/>
                <div className="handle-operate-btn-action">
                    <Qbtn size="free">新建采退单</Qbtn>
                    <Qbtn size="free" onClick={() => this.showModalClick}>批量审核</Qbtn>
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
                {showModal && (
                    <ConfirmModal
                        visible={showModal}
                        title="批量审核"
                        onOk={this.onModalConfirmClick}
                        onCancel={this.onModalCancelClick}
                        confirmLoading={showLoading}
                        okText="提交"
                        cancelText="取消">
                        <BatchReviewModalForm
                            selectedRowKeys={selectedRowKeys}
                            onValuesChange={this.onBatchReviewSelectStatusChange}/>
                    </ConfirmModal>
                )}
            </div>
        );
    }
}
