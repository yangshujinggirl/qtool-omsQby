import React from "react";
import {QbaseList, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm/InventoryDistribution";
import {InventoryDistributionColumns} from "./column";
import {
    GetStoreInventoryDistributionList,
} from "../../../../../api/home/DataCenter/FromB/StoreData";

/**
 * 功能作用：门店库存分布页面
 * 初始注释时间： 2020/3/22 21:03
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const InventoryDistribution = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, total
        } = _this.state;
        return <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <Qtable
                columns={InventoryDistributionColumns}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage: everyPage, currentPage: currentPage, total: total}}
                onChange={_this.changePage}/>
        </div>
    }, GetStoreInventoryDistributionList, true, null, null
    , (_this, params) => {
        let {id} = _this.props.match.params;
        const ids = id.split('_');
        return {pdSpuId: ids[0], pdSkuId: ids[1]}
    });
export default InventoryDistribution;
