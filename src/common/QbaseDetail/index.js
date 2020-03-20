import React, {useEffect, useState} from "react";
import {Spin} from "antd";

/**
 * 功能作用：基础详情页面,使用方式参见客服中心详情，当前主要为了统一加载中
 * 初始注释时间： 2020/3/17 17:52
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class QbaseDetail extends React.Component {
    state = {
        showLoadingStatus: false,
    };

    componentDidMount() {
        //先显示加载中
        this.showLoading();
        //判断是否要返回当前实例
        if (this.props.baseDetailComponentCallback != null) {
            this.props.baseDetailComponentCallback(this)
        }
    }

    /**
     * 显示加载中
     */
    showLoading() {
        this.setState({
            showLoadingStatus: true
        })
    }

    /**
     * 隐藏加载中
     */
    hideLoading() {
        this.setState({
            showLoadingStatus: false
        })
    }


    render() {
        return <Spin
            spinning={this.state.showLoadingStatus}> {this.props.childComponent != null ? this.props.childComponent : null}</Spin>
    }
}

