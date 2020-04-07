import React from 'react'
import {QtabShow} from "common/index";
import OfflineStore from "./OfflineStore";
import MarketPromotion from "./MarketPromotion";

/**
 * 功能作用：渠道管理
 * 初始注释时间： 2020/3/18 12:00
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class ChannelManage extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "线下店", component: <OfflineStore/>});
        showDomTabList.push({tabTitle: "市场推广", component: <MarketPromotion/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
