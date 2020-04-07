import React from 'react'
import {Tabs} from "antd";

const TabPane = Tabs.TabPane;
/**
 * 功能作用：tab显示页面，主要针对于在页面内部有tab切换的页面所使用的组件
 * 初始注释时间： 2020/3/14 20:52
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class QtabShow extends React.Component {
    state = {
        key: '0'
    };
    /**
     * tab切换点击触发事件
     * @param index
     */
    tabChange = (index) => {
        this.setState({
            key: index
        })
    };

    render() {
        const {defaultIndex, tabList} = this.props;
        const showDom = [];
        let tabKey;
        tabList.forEach((item, index) => {
            tabKey = (index).toString();
            showDom.push(
                <TabPane tab={item.tabTitle} key={tabKey}>
                    {this.state.key === tabKey && item.component}
                </TabPane>
            )
        });
        return <Tabs defaultActiveKey={defaultIndex != null ? defaultIndex : this.state.key}
                     onTabClick={this.tabChange.bind(this)}>
            {showDom}
        </Tabs>
    }
}
