import FilterForm from "./components/FilterForm";
import {GetShopOrderListApi} from "../../../../api/home/OrderCenter/Border/ShopOrder";
import {Qbtn} from "common/index";
import Columns from "./column";
import {Link} from "react-router-dom";
import {EXPORT_TYPE_PURCHASE_ORDER_OUT, ExportApi, getExportData} from "../../../../api/Export";
import {BaseDataShowList} from "common/QbaseDataShowList";
import React from "react";

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
export default class ShopOrderList extends BaseDataShowList {
    constructor() {
        super();
        this.tableShowColumns = Columns
    }

    /**
     * 获取数据列表请求
     * @param params 参数
     * @return {*}
     */
    getDataListRequest(params) {
        return GetShopOrderListApi(params)
    }

    /**
     * 获取搜索筛选渲染部分
     * @return {*}
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
            <Link to='/account/add_purchasein'><Qbtn size="free">新建门店订单</Qbtn></Link>
            <Link to='/account/add_purchasein'><Qbtn size="free">新建赠品单</Qbtn></Link>
            <Qbtn size="free"
                  onClick={() => ExportApi(getExportData(this.state.searchCriteriaList.stime, this.state.searchCriteriaList.etime,
                      EXPORT_TYPE_PURCHASE_ORDER_OUT, this.state.searchCriteriaList))}>导出数据</Qbtn>
        </div>
    }

}
