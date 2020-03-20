import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '费用名称', dataIndex: 'name', key: '1'},
    {title: '门店名称', dataIndex: 'shopName', key: '2'},
    {title: '费用类型', dataIndex: 'typeStr', key: '3'},
    {title: '金额变化', dataIndex: 'amount', key: '4'},
    {
        title: '时间', dataIndex: 'dayTime', key: '5',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }
];
export default Columns;
