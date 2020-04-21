import React from "react";

const Columns = [
    {title: '时间', dataIndex: 'rpDateStr', key: '1'},
    {title: '总订单数', dataIndex: 'orderQtySum', key: '2'},
    {title: '销售额', dataIndex: 'amount', key: '3'},
    {title: '会员订单数', dataIndex: 'mbCardQtySum', key: '4'},
    {title: '会员销售额', dataIndex: 'mbCardAmount', key: '5'},
    {title: '充值订单数', dataIndex: 'chargeQtySum', key: '6'},
    {title: '充值销售额', dataIndex: 'chargeAmount', key: '7'},
    {title: '退款订单数', dataIndex: 'returnQtySum', key: '8'},
    {title: '退款销售额', dataIndex: 'returnAmount', key: '8'}
];
export default Columns;
