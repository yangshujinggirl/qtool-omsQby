import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '月份', dataIndex: 'name', key: '1'},
    {
        title: '成本核算表', dataIndex: 'warn', key: '2',
        render: (text, record) => {
            return (
                (record.url) ?
                    <div onClick={() => window.open(record.url)}
                         style={{color: '#35bab0', cursor: 'pointer'}}>下载</div>
                    : <div>{text}</div>
            );
        }
    },
    {
        title: '预售订单信息', dataIndex: 'preSellwarn', key: '3',
        render: (text, record) => {
            return (
                (record.preSellUrl) ?
                    <div onClick={() => window.open(record.preSellUrl)}
                         style={{color: '#35bab0', cursor: 'pointer'}}>下载</div>
                    : <div>{text}</div>
            );
        }
    },
    {
        title: '下单未发货数据', dataIndex: 'preSellwarn1', key: '4',
        render: (text, record) => {
            return (
                record.url ?
                    <div style={{color: '#35bab0', cursor: 'pointer'}}>导出</div>
                    : <div>{record.warn}</div>
            );
        }
    }];
export default Columns;
