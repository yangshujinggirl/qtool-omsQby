import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '反馈类型', dataIndex: 'feedbackTypeStr', key: "1"},
    {title: '反馈状态', dataIndex: 'feedbackStatusStr', key: "2"},
    {title: '处理备注', dataIndex: 'remark', key: "3"},
    {title: '处理人', dataIndex: 'operator', key: "4"},
    {
        title: '处理时间', dataIndex: 'createTime', key: "5",
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
