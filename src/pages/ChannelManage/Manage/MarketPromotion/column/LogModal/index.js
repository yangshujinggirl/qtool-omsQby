import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const LogColumns = [
    {title: "操作", dataIndex: "content", key: '1'},
    {
        title: "操作时间", dataIndex: "createTime", key: '2',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    },
    {title: "操作人", dataIndex: "operateUser", key: '3'}];
export default LogColumns;
