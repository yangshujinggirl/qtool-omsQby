import React, {useEffect, useState} from 'react'
import {Card, Col} from "antd";
import {Qbtn, QdetailBaseInfo, Qtable} from "common/index";
import moment from "moment";
import {
    GetPurchaseOutOrderDetailApi,
    GetPurchaseOutOrderOptionsLogsApi
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseOut";
import { OrderLogsColumns, GoodsColumns, ShippingInformationColumns } from "./column/";

/**
 * 功能作用：门店订单详情
 * 初始注释时间： 2020/3/9 18:08
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const ShopOrderDetail = (props) => {
    const [orderLogs, setOrderLogs] = useState([]);
    const [outList, setOutList] = useState([]);
    const [detailList, setDetailList] = useState([]);
    const [dataInfo, setDataInfo] = useState({});
    /**
     * 请求详情数据
     */
    useEffect(() => {
        const {id} = props.match.params;
        // showLoading();
        // //获取详情数据
        // new GetPurchaseOutOrderDetailApi(id).then(res => {
        //     if (res.httpCode === NET_REQUEST_SUCCESS_CODE) {
        //         hideLoading();
        //         //设置普通数据
        //         setDataInfo(res.result);
        //         //设置发货信息
        //         setOutList(res.result.outList);
        //         //设置采退商品信息
        //         setDetailList(res.result.detailList);
        //     }
        // });
        // //获取操作日志
        // new GetPurchaseOutOrderOptionsLogsApi(id).then(res => {
        //     hideLoading();
        //     if (res.httpCode === NET_REQUEST_SUCCESS_CODE) {
        //         setOrderLogs(res.result);
        //     }
        // });
    }, []);
    /**
     * 显示加载中
     */
    const showLoading = () => {

    };
    /**
     * 隐藏加载中
     */
    const hideLoading = () => {

    };
    return (
        <div className="oms-common-addEdit-pages bgood_add">
            <Card title="门店订单信息">
                <QdetailBaseInfo showData={
                    ["订单号", dataInfo.stockingCode,
                        "下单门店", dataInfo.procurementTarget,
                        "订单状态", dataInfo.suppliersName,
                        "商品数量", dataInfo.warehouseName,
                        "订单金额", dataInfo.statusStr,
                        "订单标签", dataInfo.stepStr,
                        "下单原因", dataInfo.itemCount,
                        "订单创建人", dataInfo.itemCount,
                        "创建时间", moment(dataInfo.predictCtime).format("YYYY-MM-DD HH:mm:ss"),
                        "订单备注", dataInfo.remarkes,
                        "对应配货单", dataInfo.itemCount,]
                }/>
            </Card>
            <Card title="订购商品">
                <Qtable columns={GoodsColumns} dataSource={detailList}/>
            </Card>
            <Card title="收货信息">
                <QdetailBaseInfo showData={
                    ["收货人", dataInfo.consignee,
                        "联系电话", dataInfo.phone,
                        "收货地址", dataInfo.address,]
                }/>
            </Card>
            <Card title="发货信息">
                <Qtable columns={ShippingInformationColumns} dataSource={outList}/>
            </Card>
            <Card title="订单日志">
                <Qtable columns={OrderLogsColumns} dataSource={orderLogs}/>
            </Card>
            <Col offset={12}>
                <Qbtn>取消订单</Qbtn>
                <br/>
            </Col>
        </div>
    )
};
export default ShopOrderDetail
