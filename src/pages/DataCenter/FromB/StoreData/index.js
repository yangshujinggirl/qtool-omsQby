import React from 'react'
import {QtabShow} from "common/index";
import SaleData from "./SaleData";
import StoreInventory from "./StoreInventory";
import HistoryOfInventory from "./HistoryOfInventory";
import JointOperationShareProportion from "./JointOperationShareProportion";

/**
 * 功能作用：门店数据页面
 * 初始注释时间： 2020/3/22 19:53
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class StoreData extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "销售数据", component: <SaleData/>});
        showDomTabList.push({tabTitle: "门店库存", component: <StoreInventory/>});
        showDomTabList.push({tabTitle: "历史库存", component: <HistoryOfInventory/>});
        showDomTabList.push({tabTitle: "联营分成", component: <JointOperationShareProportion/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
