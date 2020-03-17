import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";
import moment from "moment";

const Columns = [
    {title: '回复内容', dataIndex: 'replyContent', key: 'replyContent'},
    {title: '处理人', dataIndex: 'replyNickName'},
    {
        title: '创建时间', dataIndex: 'createrTime', key: 'createrTime',
        render: (text, record, index) => {
            return <span>{record.createrTime ? moment(record.createrTime).format('YYYY-MM-DD') : ''}</span>
        }
    }];
export default Columns;
