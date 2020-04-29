import React, {useEffect, useState} from 'react'
import {
    GetPurchaseOutOrderDetailApi,
    GetPurchaseOutOrderOptionsLogsApi
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseOut";
import {Button, Card, Select, Spin} from "antd";
import moment from "moment";
import {QbaseDetail, QbaseInfo, QenlargeImg, Qtable} from "common/index";
import GoodsColumns from "./column/Goods";
import OrderLogsColumns from "../PurchaseIn/column/OrderLogs";
import ShippingInformationColumns from "./column/ShippingInformation";
import TableDataListUtil from "utils/TableDataListUtil";
import {
    FEEDBACK_STATUS_END,
    FEEDBACK_STATUS_IN_HAND,
    FEEDBACK_STATUS_SHOW_TEXT_MAP,
    FEEDBACK_STATUS_WAIT,
    FEEDBACK_TYPE_ATTRACT_INVESTMENT,
    FEEDBACK_TYPE_DESIGN,
    FEEDBACK_TYPE_GOODS,
    FEEDBACK_TYPE_OPERATION, FEEDBACK_TYPE_OTHER,
    FEEDBACK_TYPE_SHOW_TEXT_MAP, FEEDBACK_TYPE_SYSTEM
} from "../../../CustomerServiceCenter/FromB/StoreFeedback/config";
import Columns from "../../../CustomerServiceCenter/FromB/StoreFeedback/column/DetailLog";
import {Link} from "react-router-dom";

/**
 * 功能作用：采退单详情数据
 * 初始注释时间： 2020/3/7 16:23
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const PurchaseOutDetail = (props) => {
    const [orderLogs, setOrderLogs] = useState([]);
    const [outList, setOutList] = useState([]);
    const [detailList, setDetailList] = useState([]);
    const [dataInfo, setDataInfo] = useState({});

    /**
     * 页面渲染完成
     */
    const baseDetailComponentCallback = (_this) => {
        const {id} = props.match.params;
        _this.showLoading(2,false)
        //获取详情数据
        new GetPurchaseOutOrderDetailApi(id).then(res => {
            _this.hideLoading();
            //设置普通数据
            setDataInfo(res.result);
            //设置发货信息
            setOutList(TableDataListUtil.addKeyAndResultList(res.result.wtList, null));
            //设置采退商品信息
            setDetailList(TableDataListUtil.addKeyAndResultList(res.result.detailList, null));
        }).catch(e => {
            _this.hideLoading()
        });
        //获取操作日志
        new GetPurchaseOutOrderOptionsLogsApi(id).then(res => {
            _this.hideLoading();
            setOrderLogs(TableDataListUtil.addKeyAndResultList(res.result, null));
        }).catch(e => {
            _this.hideLoading()
        });
    };

    return <QbaseDetail childComponent={<div className="oms-common-addEdit-pages bgood_add">
        <Card title="采退单信息">
            <QbaseInfo dataInfo={
                [{key: "采退单号", value: dataInfo.stockingReCode},
                    {key: "关联采购单号", value: dataInfo.stockingCode},
                    {key: "供应商名称", value: dataInfo.suppliersName},
                    {key: "采退原因", value: dataInfo.reRemark},
                    {key: "发货仓库", value: dataInfo.warehouseName},
                    {key: "审核状态", value: dataInfo.statusStr},
                    {key: "订单状态", value: dataInfo.stepStr},
                    {key: "采退数量", value: dataInfo.totalNum},
                    {key: "采退金额", value: dataInfo.priceTotal},
                    {key: "订单创建人", value: dataInfo.user},
                    {
                        key: "创建时间",
                        value: moment(dataInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
                    },
                    {key: "订单备注", value: dataInfo.remarkes},]
            }/>
        </Card>
        <Card title="采退商品">
            <Qtable columns={GoodsColumns} dataSource={detailList}/>
        </Card>
        <Card title="收货信息">
            <QbaseInfo dataInfo={
                [{key: "收货人", value: dataInfo.consignee},
                    {key: "联系电话", value: dataInfo.phone},
                    {key: "收货地址", value: dataInfo.address},]
            }/>
        </Card>
        <Card title="发货信息">
            <Qtable columns={ShippingInformationColumns} dataSource={outList}/>
        </Card>
        <Card title="订单日志">
            <Qtable columns={OrderLogsColumns} dataSource={orderLogs}/>
        </Card>
    </div>}
                        baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default PurchaseOutDetail
