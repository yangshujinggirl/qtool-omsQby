import React from 'react'
import {QtabShow} from "common/index";
import GoodsAnalysis from "./GoodsAnalysis";
import ClassifyAnalysis from "./ClassifyAnalysis";
import GoodsDataList from "./GoodsDataList";

export default class GoodsData extends React.Component {
    render() {
        const showDomTabList = [];
        showDomTabList.push({tabTitle: "商品分析", component: <GoodsAnalysis/>});
        showDomTabList.push({tabTitle: "分类分析", component: <ClassifyAnalysis/>});
        showDomTabList.push({tabTitle: "商品数据", component: <GoodsDataList/>});

        return <QtabShow defaultIndex="0" tabList={showDomTabList}/>
    }
}
