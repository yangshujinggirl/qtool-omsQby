import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";
import {
    SALE_IN_OUT_DELIVERY_TYPE_EXPRESS_MAIL,
    SALE_IN_OUT_DELIVERY_TYPE_INTRA_CITY_SERVICE,
    SALE_IN_OUT_DELIVERY_TYPE_STORES_TO_THE
} from "../config";

const Columns = [
    {title: '订单号', dataIndex: 'orderNo', key: 'orderNo',},
    {title: '门店名称', dataIndex: 'spShopName', key: 'spShopName',},
    {
        title: '配送方式', dataIndex: 'deliveryType', key: 'deliveryType',
        render: (text, record) => {
            switch (text) {
                case SALE_IN_OUT_DELIVERY_TYPE_STORES_TO_THE:
                    return '门店自提';
                case SALE_IN_OUT_DELIVERY_TYPE_INTRA_CITY_SERVICE:
                    return '同城配送';
                case SALE_IN_OUT_DELIVERY_TYPE_EXPRESS_MAIL:
                    return '快递邮寄';
                default:
                    return '';
            }
        }
    },
    {title: '订单状态', dataIndex: 'incomeStatusStr', key: 'incomeStatusStr',},
    {title: '费用类型', dataIndex: 'costTypeStr', key: 'costTypeStr',},
    {title: '商品金额', dataIndex: 'amountSum', key: 'amountSum',},
    {title: '用户支付配送费', dataIndex: 'standardExpressAmount', key: 'standardExpressAmount',},
    {title: '顺丰收取配送费', dataIndex: 'shunFengExpressAmount', key: 'shunFengExpressAmount',},
    {title: '销售收款', dataIndex: 'salesReceipts', key: 'salesReceipts',},
    {
        title: '收支生成时间', dataIndex: 'createTime', key: 'createTime',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
