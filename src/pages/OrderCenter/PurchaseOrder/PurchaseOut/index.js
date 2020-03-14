import React from "react";
import {Link} from 'react-router-dom'
import {QbaseList, Qpagination, Qbtn, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import './index.less'
import Columns from "./column";
import {
    ErpExportApi,
    EXPORT_TYPE_PURCHASE_ORDER_OUT,
    getExportData
} from "../../../../api/Export";
import {
    GetPurchaseOutOrderListApi,
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
const PurchaseOutOrderList = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, totalCount
        } = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
                    <Link to='/account/add_purchaseOut'><Qbtn size="free">新建采退单</Qbtn></Link>
                    <Qbtn size="free"
                          onClick={() => new ErpExportApi(getExportData(this.state.searchCriteriaList.stime, this.state.searchCriteriaList.etime,
                              EXPORT_TYPE_PURCHASE_ORDER_OUT, this.state.searchCriteriaList))}>导出数据</Qbtn>
                </div>
                <Qtable
                    columns={Columns}
                    select={true}
                    dataSource={dataList}/>
                <Qpagination
                    data={{everyPage, currentPage, totalCount}}
                    onChange={_this.changePage}/>
            </div>
        );
    }, GetPurchaseOutOrderListApi,
    false, "stockingCode", null,
    null, null);
export default PurchaseOutOrderList;
