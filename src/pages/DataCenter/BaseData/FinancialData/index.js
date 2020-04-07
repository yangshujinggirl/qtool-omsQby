import React from 'react'
import {QtabShow} from "common/index";
import CostOfStores from './CostOfStores'
import CostAccounting from "./CostAccounting";
import PurchasingTheArrivalOfTheGoods from "./PurchasingTheArrivalOfTheGoods";
import StoresTheInvoice from "./StoresTheInvoice";

/**
 * 功能作用：数据中心之财务数据
 * 初始注释时间： 2020/3/20 19:14
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class FinancialData extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "门店成本", component: <CostOfStores/>});
        showDomTabList.push({tabTitle: "成本核算", component: <CostAccounting/>});
        showDomTabList.push({tabTitle: "采购到货", component: <PurchasingTheArrivalOfTheGoods/>});
        showDomTabList.push({tabTitle: "门店发票", component: <StoresTheInvoice/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
