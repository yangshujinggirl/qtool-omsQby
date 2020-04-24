import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";
import {FEEDBACK_STATUS_SHOW_TEXT_MAP, FEEDBACK_TYPE_SHOW_TEXT_MAP} from "../../config";

const Columns = [
    {
        title: '反馈类型', dataIndex: 'type', key: "1",
        render: (text) => (<span>{FEEDBACK_TYPE_SHOW_TEXT_MAP[text]}</span>)
    },
    {
        title: '反馈状态', dataIndex: 'status', key: "2",
        render: (text) => (<span>{FEEDBACK_STATUS_SHOW_TEXT_MAP[text]}</span>)
    },
    {title: '处理备注', dataIndex: 'remark', key: "3"},
    {title: '处理人', dataIndex: 'urUserId', key: "4"},
    {
        title: '处理时间', dataIndex: 'createTime', key: "5",
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
