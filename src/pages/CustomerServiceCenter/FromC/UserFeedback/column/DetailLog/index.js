import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {
        title: '反馈状态', dataIndex: 'toStatusStr', key: '1',
        render: (text, record) => <a
            href="javascript:">{record.fromStatusStr}-{record.toStatusStr}</a>
    },
    {title: '处理备注', dataIndex: 'remark', key: '2'},
    {title: '处理人', dataIndex: 'operator', key: '3'},
    {
        title: '处理时间', dataIndex: 'createTime', key: '4',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
