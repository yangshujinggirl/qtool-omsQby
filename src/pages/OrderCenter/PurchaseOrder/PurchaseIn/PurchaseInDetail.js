import React, {useEffect, useState} from 'react'
import {NET_REQUEST_SUCCESS_CODE} from "../../../../api/Req";
import {
    GetPurchaseInOrderDetailApi,
    GetPurchaseInOrderOptionsLogsApi
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import {Card, Col, Form, Row} from "antd";
import {Qtable} from "common/index";
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
    LOGISTICS_EXPENSE_MODE_ZERO
} from "./config";
import moment from "moment";

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
            <Card title="采购单信息">
                <Row gutter={50}>
                    <Col>
                        <Form.Item label="采购单号">{dataInfo.stockingCode}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="采购主体">{dataInfo.procurementTarget}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="供应商名称">{dataInfo.suppliersName}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="单据类型">{
                            dataInfo.documentType === DOCUMENT_TYPE_NEW ? "新品首单" :
                                (dataInfo.documentType === DOCUMENT_TYPE_NORMAL ? "正常品单" :
                                    (dataInfo.documentType === DOCUMENT_TYPE_GOODS_OUT_OF_STOCK_PRESSURE ? "缺货压货单" :
                                        (dataInfo.documentType === DOCUMENT_TYPE_SPECIMEN ? "样品订单" : "")))
                        }</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="收货仓库">{dataInfo.warehouseName}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="审核状态">{dataInfo.statusStr}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="订单状态">{dataInfo.stepStr}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="商品总数">{dataInfo.itemCount}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="订单金额">{dataInfo.priceTotal}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="预计送达时间">{moment(dataInfo.predictCtime).format("YYYY-MM-DD")}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="物流费用">{
                            dataInfo.logisticsType === LOGISTICS_EXPENSE_MODE_ZERO ? "包邮" :
                                (dataInfo.logisticsType === LOGISTICS_EXPENSE_MODE_RECIPIENT_PAY ? "到付" + dataInfo.postage + "元" : "")
                        }</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="订单创建人">{dataInfo.user}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            label="创建时间">{moment(dataInfo.createTime).format("YYYY-MM-DD H:mm:ss")}</Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="订单备注">{dataInfo.remarkes}</Form.Item>
                    </Col>
                </Row>
            </Card>
            <Card title="采购商品">
                <Qtable columns={GoodsColumns} dataSource={goodsList}/>
            </Card>
            <Card title="订单日志">
                <Qtable columns={OrderLogsColumns} dataSource={orderLogs}/>
            </Card>
        </div>
    )
};
export default PurchaseInDetail
