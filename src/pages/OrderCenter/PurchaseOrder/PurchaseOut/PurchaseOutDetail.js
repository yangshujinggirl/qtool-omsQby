import React, {useEffect, useState} from 'react'
import {
    GetPurchaseOutOrderDetailApi,
    GetPurchaseOutOrderOptionsLogsApi
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseOut";
import {Card} from "antd";
import moment from "moment";
import {QdetailBaseInfo, Qtable} from "common/index";
import GoodsColumns from "./column/Goods";
import OrderLogsColumns from "../PurchaseIn/column/OrderLogs";
import ShippingInformationColumns from "./column/ShippingInformation";
import TableDataListUtil from "utils/TableDataListUtil";

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
     * 请求详情数据
     */
    useEffect(() => {
        const {id} = props.match.params;
        showLoading();
        //获取详情数据
        new GetPurchaseOutOrderDetailApi(id).then(res => {
            hideLoading();
            //设置普通数据
            setDataInfo(res.result);
            //设置发货信息
            setOutList(TableDataListUtil.addKeyAndResultList(res.result.outList,null));
            //设置采退商品信息
            setDetailList(TableDataListUtil.addKeyAndResultList(res.result.detailList,null));
        });
        //获取操作日志
        new GetPurchaseOutOrderOptionsLogsApi(id).then(res => {
            hideLoading();
            setOrderLogs(TableDataListUtil.addKeyAndResultList(res.result,null));
        });
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
            <Card title="采退单信息">
                <QdetailBaseInfo showData={
                    ["采退单号", dataInfo.stockingReCode,
                        "关联采购单号", dataInfo.stockingCode,
                        "供应商名称", dataInfo.suppliersName,
                        "采退原因", dataInfo.reRemark,
                        "发货仓库", dataInfo.warehouseName,
                        "审核状态", dataInfo.statusStr,
                        "订单状态", dataInfo.stepStr,
                        "采退数量", dataInfo.totalNum,
                        "采退金额", dataInfo.priceTotal,
                        "订单创建人", dataInfo.user,
                        "创建时间", moment(dataInfo.createTime).format("YYYY-MM-DD HH:mm:ss"),
                        "订单备注", dataInfo.remarkes,]
                }/>
            </Card>
            <Card title="采退商品">
                <Qtable columns={GoodsColumns} dataSource={detailList}/>
            </Card>
            <Card title="收货信息">
                <QdetailBaseInfo showData={
                    ["收货人", dataInfo.consignee,
                        "联系电话", dataInfo.phone,
                        "收货地址", dataInfo.address,]
                }/>
            </Card>>
            <Card title="发货信息">
                <Qtable columns={ShippingInformationColumns} dataSource={outList}/>
            </Card>
            <Card title="订单日志">
                <Qtable columns={OrderLogsColumns} dataSource={orderLogs}/>
            </Card>
        </div>
    )
};
export default PurchaseOutDetail
