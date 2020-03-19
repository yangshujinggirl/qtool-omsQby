import React from 'react'
import {QbaseList, Qbtn, Qtable} from "common/index";
import Columns from "./column";
import {getListApi} from "api/home/FinancialCenter/ShoperInOut";
import FilterForm from "./components/FilterForm";
import {ErpExportApi} from "../../../api/Export";

/**
 * 功能作用：掌柜收支明细页面
 * 初始注释时间： 2020/3/18 19:09
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const ShopkeeperInOut = QbaseList((_this) => {
    const {dataList} = _this.state;
    return <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
        <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={() => new ErpExportApi()}>导出数据</Qbtn>
        </div>
        <Qtable
            columns={Columns}
            select={true}
            dataSource={dataList}/>
    </div>
}, getListApi, false);
export default ShopkeeperInOut
