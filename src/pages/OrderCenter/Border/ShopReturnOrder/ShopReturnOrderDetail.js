import React, {useEffect, useState} from "react";
import {Card} from "antd";
import {QdetailBaseInfo, Qtable} from "common/index";
import moment from "moment";
import GoodsColumns from "./column/Goods";
import OrderLogsColumns from "./column/OrderLogs";
import {
    GetPurchaseInOrderDetailApi,
    GetPurchaseInOrderOptionsLogsApi
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import {NET_REQUEST_SUCCESS_CODE} from "../../../../api/Req";

const ShopReturnOrderDetail = (props) => {
    const [orderLogs, setOrderLogs] = useState([]);
    const [goodsList, setGoodsList] = useState([]);
    const [dataInfo, setDataInfo] = useState({});
    /**
     * 请求详情数据
     */
    useEffect(() => {
        const {id} = props.match.params;
        showLoading();
        //获取详情数据
        new GetPurchaseInOrderDetailApi(id).then(res => {
            if (res.httpCode === NET_REQUEST_SUCCESS_CODE) {
                hideLoading();
                //设置普通数据
                setDataInfo(res.result);
                //设置商品列表数据
                setGoodsList(res.result.data);
            }
        });
        //获取操作日志
        new GetPurchaseInOrderOptionsLogsApi(id).then(res => {
            hideLoading();
            if (res.httpCode === NET_REQUEST_SUCCESS_CODE) {
                setOrderLogs(res.result);
            }
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
            <Card title="门店退单信息">
                <QdetailBaseInfo showData={
                    ["退货单号", dataInfo.stockingCode,
                        "关联门店订单", dataInfo.procurementTarget,
                        "退货门店", dataInfo.suppliersName,
                        "退货原因", dataInfo.warehouseName,
                        "订单状态", dataInfo.statusStr,
                        "退单类型", dataInfo.stepStr,
                        "收货仓库", dataInfo.itemCount,
                        "发货快递", dataInfo.itemCount,
                        "快递单号", dataInfo.itemCount,
                        "申请数量", dataInfo.itemCount,
                        "到货数量", dataInfo.itemCount,
                        "到货商品金额", dataInfo.itemCount,
                        "快递费用", dataInfo.itemCount,
                        "实退金额", dataInfo.itemCount,
                        "订单创建人", dataInfo.itemCount,
                        "创建时间", moment(dataInfo.predictCtime).format("YYYY-MM-DD HH:mm:ss"),
                        "订单备注", dataInfo.remarkes,
                        "对应配货单", dataInfo.itemCount,]
                }/>
            </Card>
            <Card title="退货商品">
                <Qtable columns={GoodsColumns} dataSource={goodsList}/>
            </Card>
            <Card title="退单日志">
                <Qtable columns={OrderLogsColumns} dataSource={orderLogs}/>
            </Card>
        </div>
    )
};
export default ShopReturnOrderDetail
