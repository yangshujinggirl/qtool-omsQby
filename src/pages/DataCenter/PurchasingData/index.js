import React from 'react'
import {QtabShow} from "common/index";
import PurchasingAnalysis from "./PurchasingAnalysis";

/**
 * 功能作用：数据中心之采购数据
 * 初始注释时间： 2020/3/20 19:14
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class PurchasingData extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "采购分析", component: <PurchasingAnalysis/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
