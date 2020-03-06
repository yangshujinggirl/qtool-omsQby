import React from "react";
import FilterForm from "./components/FilterForm";
import {Qbtn, Qmessage, Qpagination} from "common/index";
import Columns from "./column";
import Qtable from "common/Qtable";
import {
    GetPurchaseInOrderListApi, NET_REQUEST_SUCCESS_CODE, PushPurchaseInOrderBatchReview,
    PushPurchaseInOrderForceComplete
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import ConfirmModal from "common/ConfirmModal";
import {Col, Form, Modal, Row} from "antd";
import './index.less'
import BatchReviewModalForm from "./components/BatchReviewModalForm";

const FormItem = Form.Item;
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
     * 强制完成key
     * @type {number}
     */
    tipsTextKeyForceComplete = 1;
    /**
     * 批量审核
     * @type {number}
     */
    tipsTextKeyBatchReview = 2;
    /**
     * 打印采购单
     * @type {number}
     */
    tipsTextKeyPrintPurchaseOrder = 3;
    /**
     * 导出数据
     * @type {number}
     */
    tipsTextKeyExportData = 4;
    /**
     * 批量审核选择状态， 每次显示弹窗时都会清空
     * @type {null}
     */
    batchReviewSelectStatus = null;

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
            selectedRowKeys: [],
            /**
             * 是否显示Modal弹窗
             */
            showModal: false,
            /**
             * 显示modal弹窗key
             */
            showModalKey: "",
            /**
             * 是否显示加载中
             */
            showLoading: false,
            /**
             * 强制完成失败数据
             */
            forceCompleteHaveFail: []
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
     */
    rowSelectChange = (selectedRowKeys) => {
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
        this.showLoading();
        const params = {...this.state.inputValues, ...values};
        GetPurchaseInOrderListApi(params).then(res => {
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
     * @param key 弹窗显示的key值
     */
    showModalClick = (key) => {
        //每次显示弹窗时都会清空
        this.batchReviewSelectStatus = null;
        //判断是否有选择
        if (this.state.selectedRowKeys.length === 0) {
            Qmessage.warn("请至少选择一个采购单")
        } else {
            this.setState({
                showModal: true,
                showModalKey: key
            });
        }
    };

    /**
     * 弹窗确定点击
     */
    onModalConfirmClick = () => {
        switch (this.state.showModalKey) {
            case this.tipsTextKeyForceComplete:
                this.showLoading();
                //强制完成请求
                PushPurchaseInOrderForceComplete(this.state.selectedRowKeys)
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
                                                <span>以下采购单强制完成失败，失败原因：采购单未审核通过或已收货</span>
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
                                Qmessage.success("所选采购单已强制完成")
                            }
                        }
                        this.hideLoading();
                    })
                    .catch((e) => {
                        this.hideLoading();
                        Qmessage.warn(e.message != null ? e.message : "")
                    });
                break;
            case this.tipsTextKeyBatchReview:
                if (this.batchReviewSelectStatus == null) {
                    Qmessage.warn("请选择审核结果")
                } else {
                    this.showLoading();
                    //提交审核结果
                    PushPurchaseInOrderBatchReview(this.state.selectedRowKeys, this.batchReviewSelectStatus)
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
                                                    <span>以下采购单信息审核失败，失败原因：采购单已被审核</span>
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
                break;
            case this.tipsTextKeyExportData:
                break;
            default:
                break;
        }
    };

    /**
     * 弹窗取消按钮点击
     */
    onModalCancelClick = () => {
        this.setState({
            showModal: false,
            showModalKey: ""
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
            totalCount, showModal, showModalKey, showLoading
        } = this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={this.searchDataList}/>
                <div className="handle-operate-btn-action">
                    <Qbtn size="free">新建采购单</Qbtn>
                    <Qbtn size="free"
                          onClick={() => this.showModalClick(this.tipsTextKeyForceComplete)}>强制完成</Qbtn>
                    <Qbtn size="free"
                          onClick={() => this.showModalClick(this.tipsTextKeyBatchReview)}>批量审核</Qbtn>
                    <Qbtn size="free">打印采购单</Qbtn>
                    <Qbtn size="free"
                          onClick={() => this.showModalClick(this.tipsTextKeyExportData)}>导出数据</Qbtn>
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
                {showModal && showModalKey === this.tipsTextKeyForceComplete && (
                    <ConfirmModal
                        visible={showModal}
                        title="强制完成"
                        onOk={this.onModalConfirmClick}
                        onCancel={this.onModalCancelClick}
                        confirmLoading={showLoading}
                        okText="确认"
                        cancelText="取消">
                        <div className="tips"> 强制完成后，所选采购单状态将变更成“已收货”，是否确定强制完成？</div>
                    </ConfirmModal>
                )}
                {showModal && showModalKey === this.tipsTextKeyBatchReview && (
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
