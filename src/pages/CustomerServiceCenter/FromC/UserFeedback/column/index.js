import moment from "moment";
import {Link} from "react-router-dom";
import {AUDIT_STATUS_NO_PASS} from "../config";
import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '反馈编号', dataIndex: 'feedbackNo',},
    {title: '反馈问题', dataIndex: 'remark', ellipsis: true},
    {title: '用户手机号', dataIndex: 'userTel'},
    {title: '反馈状态', dataIndex: 'statusStr'},
    {
        title: '反馈时间', dataIndex: 'createTime',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    },
    {
        title: '处理时长', dataIndex: 'handleTime',
        render: (text, record) => {
            return (
                <span>{text}h</span>
            )
        }
    },
    {
        title: '操作', dataIndex: '',
        render: (text, record) => {
            return (
                <Link className="link-color"
                      to={`/account/user_feedback/detail/${record.feedbackId}`}>
                    处理
                </Link>
            )
        }
    }];
export default Columns;
