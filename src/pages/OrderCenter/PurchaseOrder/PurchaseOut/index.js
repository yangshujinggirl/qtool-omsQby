import React from "react";
import FilterForm from "./components/FilterForm";
import {Qbtn, Qmessage} from "common/index";
import {Link} from 'react-router-dom'
import ConfirmModal from "common/ConfirmModal";
import './index.less'
import {Modal} from "antd";
import BatchReviewModalForm from "./components/BatchReviewModalForm";
import {
    EXPORT_TYPE_PURCHASE_ORDER_OUT,
    ExportApi,
    getExportData
} from "../../../../api/Export";
import {
    GetPurchaseOutOrderListApi,
    PushPurchaseOutOrderBatchReview
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseOut";
import {BaseDataShowList} from "common/QbaseDataShowList";
import Columns from "./column";
import {NET_REQUEST_SUCCESS_CODE} from "../../../../api/Req";

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
export default class PurchaseOutOrderList extends BaseDataShowList {
    /**
     * 批量审核选择状态， 每次显示弹窗时都会清空
     * @type {null}
     */
    batchReviewSelectStatus = null;

    constructor() {
        super();
        //设置列表操作key字段
        this.dataListOptionsKey = "stockingCode";
        //显示行操作
        this.isShowTableRowSelection = true;
        //表格字段
        this.tableShowColumns = Columns
    }

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
     * 批量审核选择状态变更
     */
    onBatchReviewSelectStatusChange = (e) => {
        this.batchReviewSelectStatus = e.target.value
    };

    /**
     * 格式化搜索条件并返回格式化后数据
     * @param values 搜索数据
     */
    formatSearchCriteriaList(values) {
        let {searchCriteriaDefaultStartTime, searchCriteriaDefaultEndTime} = this.state;
        if (values != null && values.times != null) {
            searchCriteriaDefaultStartTime = values.times[0].format(this.timeFormatYMDStr);
            searchCriteriaDefaultEndTime = values.times[1].format(this.timeFormatYMDStr);
            values.times = null
        }
        this.setState({
            searchCriteriaDefaultStartTime, searchCriteriaDefaultEndTime,
            searchCriteriaList: {
                stime: searchCriteriaDefaultStartTime,
                etime: searchCriteriaDefaultEndTime
            }
        });
        return this.state.searchCriteriaList;
    }

    /**
     * 获取数据列表请求，返回的为Promise<R>
     */
    getDataListRequest(params) {
        return GetPurchaseOutOrderListApi(params);
    }

    /**
     * 获取搜索条件筛选
     * @return {null}
     */
    getRenderFilterForm() {
        return <FilterForm onSubmit={this.searchDataList}
                           stime={this.state.searchCriteriaDefaultStartTime}
                           etime={this.state.searchCriteriaDefaultEndTime}/>
    }

    /**
     * 获取操作按钮列表
     * @param defaultContainerClsName 默认容器样式类名
     */
    getRenderOperateBtnAction(defaultContainerClsName) {
        return <div className={defaultContainerClsName}>
            <Link to='/account/add_purchaseOut'><Qbtn size="free">新建采退单</Qbtn></Link>
            <Qbtn size="free" onClick={this.showModalClick}>批量审核</Qbtn>
            <Qbtn size="free"
                  onClick={() => ExportApi(getExportData(this.state.searchCriteriaList.stime, this.state.searchCriteriaList.etime,
                      EXPORT_TYPE_PURCHASE_ORDER_OUT, this.state.searchCriteriaList))}>导出数据</Qbtn>
        </div>;
    }

    /**
     * 获取其他部分数据
     */
    getRenderOther() {
        const {
            selectedRowKeys, showModal, showLoading
        } = this.state;
        return showModal && (
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
        );
    }

}
