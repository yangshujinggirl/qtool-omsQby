import React from 'react'
import {QbaseList, Qpagination, Qtable} from "common/index";
import Columns from "./column";
import {GetCostAccountingDataList} from "../../../../../api/home/DataCenter/BaseData/FinancialData";

/**
 * 功能作用：门店成本数据列表
 * 初始注释时间： 2020/3/21 19:49
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const CostAccounting = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return <div className="oms-common-index-pages-wrap">
        <Qtable
            columns={Columns}
            dataSource={dataList}/>
        <Qpagination
            data={{everyPage: everyPage, currentPage: currentPage, total: total}}
            onChange={_this.changePage}/>
    </div>
}, GetCostAccountingDataList, true);
export default CostAccounting;
