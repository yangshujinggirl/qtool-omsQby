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
export default function QbaseDetail(ChildComponent, dataOptions) {
    const [showLoadingStatus, setShowLoadingStatus] = useState([]);

    useEffect(() => {
        showLoading();
        dataOptions(showLoading,hideLoading);
    }, []);
    /**
     * 显示加载中
     */
    const showLoading = () => {
        setShowLoadingStatus(true);
    };

    /**
     * 隐藏加载中
     */
    const hideLoading = () => {
        setShowLoadingStatus(false);
    };

    return (<Spin spinning={showLoadingStatus}> {ChildComponent}</Spin>);
}
