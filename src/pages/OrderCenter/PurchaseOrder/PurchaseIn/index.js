import React from "react";
import FilterForm from "./components/FilterForm";
import {Link} from 'react-router-dom'
import {Qbtn, Qmessage, Qpagination} from "common/index";
import Columns from "./column";
import Qtable from "common/Qtable";
import {
    GetPurchaseInOrderListApi, PushPurchaseInOrderBatchReview,
    PushPurchaseInOrderForceComplete
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import ConfirmModal from "common/ConfirmModal";
import './index.less'
import {Modal} from "antd";
import BatchReviewModalForm from "./components/BatchReviewModalForm";
import {EXPORT_TYPE_PURCHASE_ORDER_IN, ExportApi, getExportData} from "../../../../api/Export";
import moment from "moment";
import {BaseDataShowList} from "common/QbaseDataShowList";

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
export default class PurchaseInOrderList extends BaseDataShowList {
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
     * 初始化
     */
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
     * @param key 弹窗显示的key值
     */
    showModalClick = (key) => {
        if (key === this.tipsTextKeyForceComplete) {
            //判断是否有选择
            if (this.state.selectedRowKeys.length === 0) {
                Qmessage.warn("请至少选择一个采购单")
            } else {
                this.setState({
                    showModal: true,
                    showModalKey: key
                });
            }
        } else {
            if (key === this.tipsTextKeyExportData) {
                //导出数据
                ExportApi(getExportData(this.state.searchCriteriaList.stime, this.state.searchCriteriaList.etime,
                    EXPORT_TYPE_PURCHASE_ORDER_IN, this.state.searchCriteriaList));
            }
        }

    };

    /**
     * 弹窗确定点击
     */
    onModalConfirmClick = () => {
        if (this.state.showModalKey === this.tipsTextKeyForceComplete) {
            this.showLoading();
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
        } else {
        }
    };

    /**
     * 弹窗取消按钮点击
     */
    onModalCancelClick() {
        this.setState({
            showModal: false,
            showModalKey: ""
        });
    }

    /**
     * 获取子类定义的变量数据
     */
    getChildStateParams() {
        return {
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
            forceCompleteHaveFail: [],
        };
    }

    /**
     * 获取数据列表请求，返回的为Promise<R>
     */
    getDataListRequest(params) {
        return GetPurchaseInOrderListApi(params);
    }

    /**
     * 获取搜索条件筛选
     * @return {null}
     */
    getRenderFilterForm() {
        return <FilterForm onSubmit={this.searchDataList} selectTimeChange={this.selectTimeChange}/>
    }

    /**
     * 获取操作按钮列表
     * @param defaultContainerClsName 默认容器样式类名
     */
    getRenderOperateBtnAction(defaultContainerClsName) {
        return <div className={defaultContainerClsName}>
            <Link to='/account/add_purchasein'><Qbtn size="free">新建采购单</Qbtn></Link>
            <Qbtn size="free"
                  onClick={() => this.showModalClick(this.tipsTextKeyForceComplete)}>强制完成</Qbtn>
            <Qbtn size="free">打印采购单</Qbtn>
            <Qbtn size="free"
                  onClick={() => this.showModalClick(this.tipsTextKeyExportData)}>导出数据</Qbtn>
        </div>;
    }

    /**
     * 获取其他部分数据
     */
    getRenderOther() {
        return this.state.showModal && this.state.showModalKey === this.tipsTextKeyForceComplete && (
            <ConfirmModal
                visible={showModal}
                title="强制完成"
                onOk={this.onModalConfirmClick}
                onCancel={this.onModalCancelClick}
                confirmLoading={this.showLoading}
                okText="确认"
                cancelText="取消">
                <div className="tips"> 强制完成后，所选采购单状态将变更成“已收货”，是否确定强制完成？</div>
            </ConfirmModal>
        );
    }
}
