import React from 'react';
import {BaseDataShowList} from "common/QbaseDataShowList";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {GetShopOrderListApi} from "../../../../api/home/OrderCenter/Border/ShopOrder";
import {Link} from "react-router-dom";
import {Qbtn, Qmessage} from "common/index";
import {
    EXPORT_TYPE_PURCHASE_ORDER_IN,
    EXPORT_TYPE_PURCHASE_ORDER_OUT,
    ExportApi,
    getExportData
} from "../../../../api/Export";
import {PushPurchaseInOrderForceComplete} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import {Modal} from "antd";

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
export default class ShopReturnOrder  extends React.Component {
    render(){
        return null;
    }
    // /**
    //  * 确认收货key
    //  * @type {number}
    //  */
    // tipsTextKeyConfirmReceipt = 1;
    // /**
    //  * 确认退款key
    //  * @type {number}
    //  */
    // tipsTextKeyConfirmTheRefund = 2;
    // /**
    //  * 取消订单key
    //  * @type {number}
    //  */
    // tipsTextKeyCancellationOfOrder = 3;
    //
    // /**
    //  * 初始化
    //  */
    // constructor() {
    //     super();
    //     //设置列表操作key字段
    //     this.dataListOptionsKey = "stockingCode";
    //     //显示行操作
    //     this.isShowTableRowSelection = true;
    //     //设置表字段
    //     this.tableShowColumns = Columns
    // }
    //
    // /**
    //  * 显示弹窗
    //  * @param key 弹窗显示的key值
    //  */
    // showModalClick = (key) => {
    //     //判断是否有选择
    //     if (this.state.selectedRowKeys.length === 0) {
    //         Qmessage.warn("请至少选择一个采购单")
    //     } else {
    //         switch (key) {
    //             case this.tipsTextKeyConfirmReceipt:
    //                 Modal.confirm({
    //                     title: "确认收货",
    //                     content: "确认收货后，所选退单将不支持继续收货，是否确定执行？",
    //                     okText: "确定",
    //                     cancelText: "取消",
    //                     onOk: () => {
    //                         Qmessage.success("点击了确认收货确认");
    //                     }
    //                 });
    //                 break;
    //             case this.tipsTextKeyConfirmTheRefund:
    //                 Modal.confirm({
    //                     title: "确认退款",
    //                     content: "确认退款后，将会退款到门店掌柜余额中，是否确定执行？",
    //                     okText: "确定",
    //                     cancelText: "取消",
    //                     onOk: () => {
    //                         Qmessage.success("点击了确认退款确认");
    //                     }
    //                 });
    //                 break;
    //             case this.tipsTextKeyCancellationOfOrder:
    //                 Modal.confirm({
    //                     title: "取消订单",
    //                     content: "取消订单后，所选退单将被取消，是否确定执行？",
    //                     okText: "确定",
    //                     cancelText: "取消",
    //                     onOk: () => {
    //                         Qmessage.success("点击了取消订单确认");
    //                     }
    //                 });
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // };
    //
    // /**
    //  * 获取数据列表请求
    //  * @param params 参数
    //  * @return {*}
    //  */
    // getDataListRequest(params) {
    //     return GetShopOrderListApi(params)
    // }
    //
    // /**
    //  * 获取搜索筛选渲染部分
    //  * @return {*}
    //  */
    // getRenderFilterForm() {
    //     return <FilterForm onSubmit={this.searchDataList} selectTimeChange={this.selectTimeChange}/>
    // }
    //
    // /**
    //  * 获取操作按钮列表
    //  * @param defaultContainerClsName 默认容器样式类名
    //  */
    // getRenderOperateBtnAction(defaultContainerClsName) {
    //     return <div className={defaultContainerClsName}>
    //         <Link to='/account/add_purchasein'><Qbtn size="free">新建退单</Qbtn></Link>
    //         <Qbtn size="free"
    //               onClick={() => this.showModalClick(this.tipsTextKeyConfirmReceipt)}>确认收货</Qbtn>
    //         <Qbtn size="free"
    //               onClick={() => this.showModalClick(this.tipsTextKeyConfirmTheRefund)}>确认退款</Qbtn>
    //         <Qbtn size="free"
    //               onClick={() => this.showModalClick(this.tipsTextKeyCancellationOfOrder)}>取消订单</Qbtn>
    //         <Qbtn size="free"
    //               onClick={() => ExportApi(getExportData(this.state.searchCriteriaList.stime, this.state.searchCriteriaList.etime,
    //                   EXPORT_TYPE_PURCHASE_ORDER_OUT, this.state.searchCriteriaList))}>导出数据</Qbtn>
    //     </div>
    // }

}
