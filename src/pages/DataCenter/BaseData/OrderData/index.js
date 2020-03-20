import React from 'react'
import {QtabShow} from "common/index";
import Store from "./Store";
import POS from "./POS";

/**
 * 功能作用：数据中心之订单数据
 * 初始注释时间： 2020/3/20 19:14
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class OrderData extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "门店订单", component: <Store/>});
        showDomTabList.push({tabTitle: "POS订单", component: <POS/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
