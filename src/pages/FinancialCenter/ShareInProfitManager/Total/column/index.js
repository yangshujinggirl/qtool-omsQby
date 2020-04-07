import React from "react";
import {Link} from "react-router-dom";

const Columns = [
    {title: '门店名称', dataIndex: 'shopName', key: '1'},
    {title: '门店类型', dataIndex: 'shopTypeStr', key: '2'},
    {title: '直邮分润收款', dataIndex: 'directDeliveryOrderAmount', key: '3'},
    {title: '直邮分润扣款', dataIndex: 'directDeliveryReturnAmount', key: '4'},
    {title: '保税分润收款', dataIndex: 'bondedWsOrderAmount', key: '5'},
    {title: '保税分润扣款', dataIndex: 'bondedWsReturnAmount', key: '6'},
    {title: '总分润', dataIndex: 'profitSum', key: '7'}];
export default Columns;
