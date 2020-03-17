import React from "react";
import {Link} from "react-router-dom";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {
        title: '工单id', key: '1', dataIndex: 'udeskTicketId',
        render: (text, record, index) => {
            return <Link className="link-color"
                         to={`/account/c_work_order/detail/${record.udeskTicketId}`}>
                {text}
            </Link>
        }
    },
    {title: '主题', dataIndex: 'subject', key: '2'},
    {title: '状态', dataIndex: 'status', key: '3'},
    {title: '优先级', dataIndex: 'priority', key: '4',},
    {title: '受理客服', dataIndex: 'agentGroupName', key: '5',},
    {
        title: '创建时间', dataIndex: 'createrTime', key: '6',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    }];
export default Columns;
