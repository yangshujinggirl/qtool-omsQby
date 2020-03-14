import React from "react";
import {Modal} from "antd";
import {Link} from 'react-router-dom'
import {QbaseList, Qbtn, Qmessage, Qpagination, Qtable,ConfirmModal} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import './index.less'
import {
    GetPurchaseInOrderListApi, PushPurchaseInOrderForceComplete
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import {
    ErpExportApi,
    EXPORT_TYPE_PURCHASE_ORDER_IN, getExportData
} from "../../../../api/Export";

/**
 * 弹窗确定点击
 */
function showForceCompleteModalClick(_this) {
    _this.showLoading();
    PushPurchaseInOrderForceComplete(_this.state.selectedRowKeys)
        .then(rep => {
            _this.refreshDataList();
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
            _this.hideLoading();
        })
        .catch((e) => {
            _this.hideLoading();
            Qmessage.warn(e.message != null ? e.message : "")
        });
}

/**
 * 显示弹窗
 */
function showModalClick(_this) {
    //判断是否有选择
    if (_this.state.selectedRowKeys.length === 0) {
        Qmessage.warn("请至少选择一个采购单")
    } else {
        _this.setState({
            showModal: true,
        });
    }
}

/**
 * 弹窗取消按钮点击
 */
function onModalCancelClick(_this) {
    _this.setState({
        showModal: false,
    });
}

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
const PurchaseInOrderList = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, totalCount, searchCriteriaList
        } = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
                    <Link to='/account/add_purchasein'><Qbtn size="free">新建采购单</Qbtn></Link>
                    <Qbtn size="free"
                          onClick={() => showModalClick(_this)}>强制完成</Qbtn>
                    <Qbtn size="free">打印采购单</Qbtn>
                    <Qbtn size="free"
                          onClick={() => new ErpExportApi(getExportData(searchCriteriaList.stime, searchCriteriaList.etime,
                              EXPORT_TYPE_PURCHASE_ORDER_IN, searchCriteriaList))}>导出数据</Qbtn>
                </div>
                <Qtable
                    columns={Columns}
                    select={true}
                    dataSource={dataList}
                    rowSelection={_this.getTableRowSelection()}/>
                <Qpagination
                    data={{everyPage, currentPage, totalCount}}
                    onChange={_this.changePage}/>
                {
                    _this.state.showModal && (
                        <ConfirmModal
                            visible={_this.state.showModal}
                            title="强制完成"
                            onOk={showForceCompleteModalClick(_this)}
                            onCancel={onModalCancelClick(_this)}
                            confirmLoading={_this.showLoading}
                            okText="确认"
                            cancelText="取消">
                            <div className="tips"> 强制完成后，所选采购单状态将变更成“已收货”，是否确定强制完成？</div>
                        </ConfirmModal>
                    )
                }
            </div>
        );
    }, GetPurchaseInOrderListApi,
    false, "stockingCode", {forceCompleteHaveFail: [],},
    null, onModalCancelClick);
export default PurchaseInOrderList
