import React from 'react'
import {QbaseList, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {GetStoreInventoryList} from "../../../../../api/home/DataCenter/FromB/StoreData";

/**
 * 功能作用：门店库存页面
 * 初始注释时间： 2020/3/22 21:03
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const StoreInventory = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
        <Qtable
            columns={Columns}
            dataSource={dataList}/>
        <Qpagination
            data={{everyPage: everyPage, currentPage: currentPage, total: total}}
            onChange={_this.changePage}/>
    </div>
}, GetStoreInventoryList, true);
export default StoreInventory;
