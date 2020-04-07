import React from 'react'
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {GetHistoryOfInventoryList} from "../../../../../api/home/DataCenter/FromB/StoreData";

/**
 * 功能作用：历史库存页面
 * 初始注释时间： 2020/3/22 21:03
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const HistoryOfInventory = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return <div className="oms-common-index-pages-wrap">
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
}, GetHistoryOfInventoryList, false);
export default HistoryOfInventory;
