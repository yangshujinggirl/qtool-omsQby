import React from "react";
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import {
    GetCommodityExpirySateList,
    GetHistoryInventoryList
} from "../../../../../api/home/DataCenter/BaseData/WarehouseData";
import FilterForm from "./components/FilterForm";
import TableDataListUtil from "utils/TableDataListUtil";
import Columns from "./column";

/**
 * 功能作用：历史库存页面
 * 初始注释时间： 2020/3/21 18:16
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const CommodityExpirySate = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <div className="handle-operate-btn-action">
                <Qbtn>导出数据</Qbtn>
            </div>
            <Qtable
                columns={Columns}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage: everyPage, currentPage: currentPage, total: total}}
                onChange={_this.changePage}/>
        </div>
    )
}, GetCommodityExpirySateList, true);
export default CommodityExpirySate;
