import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '订单号', dataIndex: 'orderNo', key: '1'},
    {title: '门店名称', dataIndex: 'shopName', key: '2'},
    {title: '门店类型', dataIndex: 'shopTypeStr', key: '3'},
    {title: '费用类型', dataIndex: 'shareTypeStr', key: '4'},
    {title: '商品实付金额', dataIndex: 'amountSum', key: '5'},
    {title: '商品成本', dataIndex: 'costAmount', key: '6'},
    {title: '用户支付快递费', dataIndex: 'expressAmount', key: '7'},
    {title: '仓库发货快递费', dataIndex: 'wsExpressAmount', key: '8'},
    {title: '分润金额', dataIndex: 'shareProfitAmount', key: '9'},
    {
        title: '生成时间', dataIndex: 'createTime', key: '10',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
