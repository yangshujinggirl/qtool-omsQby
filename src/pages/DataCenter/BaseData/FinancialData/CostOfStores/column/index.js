import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '门店名称', dataIndex: 'shopName', key: '1'},
    {title: '报表时间', dataIndex: 'time', key: '2',},
    {
        title: '成本报表', dataIndex: 'url', key: '3',
        render: (text) => {
            return <span style={{color: "#35BAB0", cursor: "pointer"}}
                         onClick={() => window.open(text)}>下载</span>
        }
    }];
export default Columns;
