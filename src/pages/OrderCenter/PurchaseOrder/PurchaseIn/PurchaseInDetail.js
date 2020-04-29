import React, {useEffect, useState} from 'react'
import {
    GetPurchaseInOrderDetailApi,
    GetPurchaseInOrderOptionsLogsApi
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import {Card, Col, Form, Row} from "antd";
import {Qtable, QbaseInfo, QbaseDetail} from "common/index";
import GoodsColumns from "./column/Goods";
import OrderLogsColumns from "./column/OrderLogs";
import {
    AUDIT_STATUS_PASS,
    AUDIT_STATUS_WAIT,
    DOCUMENT_TYPE_GOODS_OUT_OF_STOCK_PRESSURE,
    DOCUMENT_TYPE_NEW,
    DOCUMENT_TYPE_NORMAL,
    DOCUMENT_TYPE_SPECIMEN,
    LOGISTICS_EXPENSE_MODE_RECIPIENT_PAY,
    LOGISTICS_EXPENSE_MODE_ZERO, PROCUREMENT_TARGET_HUAIAN, PROCUREMENT_TARGET_QTOOLS
} from "./config";
import moment from "moment";
import TableDataListUtil from "utils/TableDataListUtil";
import ShippingInformationColumns from "../PurchaseOut/column/ShippingInformation";
import {
    GetPurchaseOutOrderDetailApi,
    GetPurchaseOutOrderOptionsLogsApi
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseOut";

/**
 * 功能作用：采购订单详情页面
 * 初始注释时间： 2020/3/7 13:53
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const PurchaseInDetail = (props) => {
    const [orderLogs, setOrderLogs] = useState([]);
    const [goodsList, setGoodsList] = useState([]);
    const [dataInfo, setDataInfo] = useState({});

    /**
     * 页面渲染完成
     */
    const baseDetailComponentCallback = (_this) => {
        const {id} = props.match.params;
        //获取详情数据
        new GetPurchaseInOrderDetailApi({stockingCode: id}).then(res => {
            _this.hideLoading();
            //设置普通数据
            setDataInfo(res.result);
            //设置商品列表数据
            setGoodsList(TableDataListUtil.addKeyAndResultList(res.result.data));
        }).catch(e => {
            _this.hideLoading()
        });
        //获取操作日志
        new GetPurchaseInOrderOptionsLogsApi(id).then(res => {
            _this.hideLoading();
            setOrderLogs(TableDataListUtil.addKeyAndResultList(res.result));
        }).catch(e => {
            _this.hideLoading()
        });
    };

    return <QbaseDetail childComponent={<div className="oms-common-addEdit-pages bgood_add">
        <Card title="采购单信息">
            <QbaseInfo dataInfo={
                [{key: "采购单号", value: dataInfo.stockingCode},
                    {
                        key: "采购主体",
                        value: dataInfo.procurementTarget === PROCUREMENT_TARGET_HUAIAN ? "淮安" :
                            (dataInfo.procurementTarget === PROCUREMENT_TARGET_QTOOLS ? "Qtools" : "")
                    },
                    {key: "供应商名称", value: dataInfo.suppliersName},
                    {
                        key: "单据类型",
                        value: dataInfo.documentType === DOCUMENT_TYPE_NEW ? "新品首单" :
                            (dataInfo.documentType === DOCUMENT_TYPE_NORMAL ? "正常品单" :
                                (dataInfo.documentType === DOCUMENT_TYPE_GOODS_OUT_OF_STOCK_PRESSURE ? "缺货压货单" :
                                    (dataInfo.documentType === DOCUMENT_TYPE_SPECIMEN ? "样品订单" : "")))
                    },
                    {key: "收货仓库", value: dataInfo.warehouseName},
                    {key: "审核状态", value: dataInfo.statusStr},
                    {key: "订单状态", value: dataInfo.stepStr},
                    {key: "商品总数", value: dataInfo.itemCount},
                    {
                        key: "预计送达时间",
                        value: moment(dataInfo.predictCtime).format("YYYY-MM-DD")
                    },
                    {
                        key: "物流费用",
                        value: dataInfo.logisticsType === LOGISTICS_EXPENSE_MODE_ZERO ? "包邮" :
                            (dataInfo.logisticsType === LOGISTICS_EXPENSE_MODE_RECIPIENT_PAY ? "到付" + dataInfo.postage
                                + "元" : "")
                    },
                    {key: "订单创建人", value: dataInfo.user},
                    {
                        key: "创建时间",
                        value: moment(dataInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
                    },
                    {key: "订单备注", value: dataInfo.remarkes},]
            }/>
        </Card>
        <Card title="采购商品">
            <Qtable columns={GoodsColumns} dataSource={goodsList}/>
        </Card>
        <Card title="订单日志">
            <Qtable columns={OrderLogsColumns} dataSource={orderLogs}/>
        </Card>
    </div>}
                        baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default PurchaseInDetail
