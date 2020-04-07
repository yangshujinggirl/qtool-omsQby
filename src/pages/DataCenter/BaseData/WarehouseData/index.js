import React from 'react'
import {QtabShow} from "common/index";
import RealTimeInventory from "./RealTimeInventory";
import HistoryInventory from "./HistoryInventory";
import CommodityExpirySate from "./CommodityExpirySate";

/**
 * 功能作用：数据中心之仓库数据
 * 初始注释时间： 2020/3/20 19:14
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class WarehouseData extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "实时库存", component: <RealTimeInventory/>});
        showDomTabList.push({tabTitle: "历史库存", component: <HistoryInventory/>});
        showDomTabList.push({tabTitle: "商品效期", component: <CommodityExpirySate/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
