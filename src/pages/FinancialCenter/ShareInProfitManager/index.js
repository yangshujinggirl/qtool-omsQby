import React from "react";
import {QtabShow} from "common/index";
import DirectMail from "./DirectMail";
import Total from "./Total";
import UnderBond from "./UnderBond";

/**
 * 功能作用：分润管理主页面
 * 初始注释时间： 2020/3/20 11:10
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class ShareInProfitManager extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "分润合计", component: <Total/>});
        showDomTabList.push({tabTitle: "直邮分润明细", component: <DirectMail/>});
        showDomTabList.push({tabTitle: "保税分润明细", component: <UnderBond/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
