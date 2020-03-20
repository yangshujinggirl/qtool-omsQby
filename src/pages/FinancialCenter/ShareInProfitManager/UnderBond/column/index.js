import React from "react";
import {Link} from "react-router-dom";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '订单号', dataIndex: 'orderNo', key: '1'},
    {title: '门店名称', dataIndex: 'shopName', key: '2'},
    {title: '门店类型', dataIndex: 'shopTypeStr', key: '3'},
    {title: '费用类型', dataIndex: 'shareTypeStr', key: '4'},
    {title: '商品名称', dataIndex: 'spuName', key: '5'},
    {title: '商品编码', dataIndex: 'code', key: '6'},
    {title: '商品实付金额', dataIndex: 'salePrice', key: '7'},
    {title: '商品数量', dataIndex: 'qty', key: '8'},
    {title: '分润比例', dataIndex: 'shareRatio', key: '9'},
    {title: '分润金额', dataIndex: 'shareProfitAmount', key: '10'},
    {
        title: '收支生成时间', dataIndex: 'createTime', key: '11',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
