import React from "react";
import {Link} from "react-router-dom";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '客服单号', dataIndex: 'customServiceNo', key: '1'},
    {title: '客服主题', dataIndex: 'customServiceTheme', key: '2'},
    {title: '客服人员', dataIndex: 'waiter', key: '3'},
    {title: '客服状态', dataIndex: 'statusStr', key: '4'},
    {
        title: '处理时长', dataIndex: 'handleTime', key: '5',
        render: (text) => {
            return (
                <span>{text}h</span>
            )
        }
    },
    {
        title: '开始时间', dataIndex: 'createTime', key: '6',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    },
    {
        title: '操作', dataIndex: 'customServiceId', key: '7',
        render: (text, record) => {
            return <Link className="link-color"
                         to={`/account/work_order/detail/${record.customServiceId}`}>
                处理
            </Link>
        }
    }];
export default Columns;
