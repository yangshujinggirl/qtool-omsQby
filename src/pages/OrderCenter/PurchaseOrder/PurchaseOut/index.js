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
        return <FilterForm onSubmit={this.searchDataList} selectTimeChange={this.selectTimeChange}/>
    }

    /**
     * 获取操作按钮列表
     * @param defaultContainerClsName 默认容器样式类名
     */
    getRenderOperateBtnAction(defaultContainerClsName) {
        return <div className={defaultContainerClsName}>
            <Link to='/account/add_purchaseOut'><Qbtn size="free">新建采退单</Qbtn></Link>
            <Qbtn size="free"
                  onClick={() => ExportApi(getExportData(this.state.searchCriteriaList.stime, this.state.searchCriteriaList.etime,
                      EXPORT_TYPE_PURCHASE_ORDER_OUT, this.state.searchCriteriaList))}>导出数据</Qbtn>
        </div>;
    }

}
