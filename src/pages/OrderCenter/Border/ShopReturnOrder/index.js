import React from 'react';
import {Modal} from "antd";
import {Link} from "react-router-dom";
import {QbaseList, Qbtn, Qmessage, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {GetShopOrderListApi} from "../../../../api/home/OrderCenter/Border/ShopOrder";
import {AppExportApi} from "../../../../api/Export";

/**
 * 确认收货key
 * @type {number}
 */
const TIPS_TEXT_KEY_CONFIRM_RECEIPT = 1;
/**
 * 确认退款key
 * @type {number}
 */
const TIPS_TEXT_KEY_CONFIRM_THE_REFUND = 2;
/**
 * 取消订单key
 * @type {number}
 */
const TIPS_TEXT_KEY_CANCELLATION_OF_ORDER = 3;

/**
 * 显示弹窗
 * @param _this 实例上下文
 * @param key 弹窗显示的key值
 */
function showModalClick(_this, key) {
    //判断是否有选择
    if (_this.state.selectedRowKeys.length === 0) {
        Qmessage.warn("请至少选择一个采购单")
    } else {
        switch (key) {
            case TIPS_TEXT_KEY_CONFIRM_RECEIPT:
                Modal.confirm({
                    title: "确认收货",
                    content: "确认收货后，所选退单将不支持继续收货，是否确定执行？",
                    okText: "确定",
                    cancelText: "取消",
                    onOk: () => {
                        Qmessage.success("点击了确认收货确认");
                    }
                });
                break;
            case TIPS_TEXT_KEY_CONFIRM_THE_REFUND:
                Modal.confirm({
                    title: "确认退款",
                    content: "确认退款后，将会退款到门店掌柜余额中，是否确定执行？",
                    okText: "确定",
                    cancelText: "取消",
                    onOk: () => {
                        Qmessage.success("点击了确认退款确认");
                    }
                });
                break;
            case TIPS_TEXT_KEY_CANCELLATION_OF_ORDER:
                Modal.confirm({
                    title: "取消订单",
                    content: "取消订单后，所选退单将被取消，是否确定执行？",
                    okText: "确定",
                    cancelText: "取消",
                    onOk: () => {
                        Qmessage.success("点击了取消订单确认");
                    }
                });
                break;
            default:
                break;
        }
    }
}

/**
 * 功能作用：门店退单列表页面
 * 初始注释时间： 2020/3/9 18:42
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const ShopReturnOrder = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, total, searchCriteriaList
        } = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
                    <Link to='/account/add_purchasein'><Qbtn size="free">新建退单</Qbtn></Link>
                    <Qbtn size="free"
                          onClick={() => showModalClick(TIPS_TEXT_KEY_CONFIRM_RECEIPT)}>确认收货</Qbtn>
                    <Qbtn size="free"
                          onClick={() => showModalClick(TIPS_TEXT_KEY_CONFIRM_THE_REFUND)}>确认退款</Qbtn>
                    <Qbtn size="free"
                          onClick={() => showModalClick(TIPS_TEXT_KEY_CANCELLATION_OF_ORDER)}>取消订单</Qbtn>
                    <Qbtn size="free"
                          onClick={() => new AppExportApi(searchCriteriaList)}>导出数据</Qbtn>
                </div>
                <Qtable
                    columns={Columns}
                    select={true}
                    dataSource={dataList}
                    rowSelection={_this.getTableRowSelection()}/>
                <Qpagination
                    data={{everyPage, currentPage, total}}
                    onChange={_this.changePage}/>
            </div>
        );
    }, GetShopOrderListApi,
    false, "stockingCode", {forceCompleteHaveFail: [],},
    null, null);

export default ShopReturnOrder
