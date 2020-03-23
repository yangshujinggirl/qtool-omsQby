import React from 'react'
import {QtabShow} from "common/index";
import BaseData from "./BaseData";

/**
 * 功能作用：App数据页面
 * 初始注释时间： 2020/3/22 19:53
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class AppData extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "基础数据", component: <BaseData/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
