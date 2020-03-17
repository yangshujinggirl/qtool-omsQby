import React from 'react'
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import {
    ErpExportApi,
    EXPORT_TYPE_PURCHASE_ORDER_OUT,
    getExportData
} from "../../../../../api/Export";
import Columns from "./column";
import {GetGoodsDataList} from "../../../../../api/home/DataCenter/BaseData/GoodsData";

/**
 * 功能作用：商品分析
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const GoodsDataList = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, totalCount
        } = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
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
    }, GetGoodsDataList,
    false, "stockingCode", null,
    null, null);
export default GoodsDataList;
