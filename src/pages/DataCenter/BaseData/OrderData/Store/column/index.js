import React from "react";

const Columns = [
    {title: '时间', dataIndex: 'rpDate', key: '1'},
    {title: '总订单数', dataIndex: 'qtySum', key: '2'},
    {title: '销售额', dataIndex: 'amountSum', key: '3'},
    {title: '预售订单数', dataIndex: 'preSellQtySum', key: '4'},
    {title: '预售销售额', dataIndex: 'preSellAmountSum', key: '5'},
    {title: '直邮订单数', dataIndex: 'deQtySum', key: '6'},
    {title: '直邮销售额', dataIndex: 'deAmountSum', key: '7'},
    {title: '取消订单数', dataIndex: 'cancelQtySum', key: '8'},
    {title: '取消销售额', dataIndex: 'cancelAmountSum', key: '8'}];
export default Columns;
