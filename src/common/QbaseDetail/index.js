import React, {useEffect, useState} from "react";
import {Spin} from "antd";
import './index.less'

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
    /**
     * 最大加载中数量
     * @type {number}
     */
    maxLoadingCount = 1;
    state = {
        showLoadingStatus: false,
    };

    componentDidMount() {
        this.showLoading()
        //判断是否要返回当前实例
        if (this.props.baseDetailComponentCallback != null) {
            this.props.baseDetailComponentCallback(this)
        }
    }

    /**
     * 显示加载中
     * @param maxLoadingCount 最大加载框数量，当多接口同时请求时传递，当搜索时可不传，默认没有加载中
     * @param isAddOneLoading 是否添加一个加载中，默认调用一次增加一个加载中
     */
    showLoading(maxLoadingCount = 0, isAddOneLoading = true) {
        this.maxLoadingCount = maxLoadingCount
        if (isAddOneLoading) {
            this.maxLoadingCount += 1;
        }
        this.setState({
            showLoadingStatus: true
        })
    }

    /**
     * 隐藏加载中
     */
    hideLoading() {
        //调用一次隐藏一个加载中
        this.maxLoadingCount -= 1;
        if (this.maxLoadingCount <= 0) {
            this.setState({
                showLoadingStatus: false
            })
        }
    }


    render() {
        return <Spin
            spinning={this.state.showLoadingStatus}>
            <div className='q-base-detail-container'>
                {this.props.childComponent != null ? this.props.childComponent : null}
            </div>
        </Spin>
    }
}
