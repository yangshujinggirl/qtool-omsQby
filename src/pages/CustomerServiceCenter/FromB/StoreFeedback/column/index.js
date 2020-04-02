import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: '反馈编号', dataIndex: 'feedbackNo'},
    {title: '反馈问题', dataIndex: 'remark', ellipsis: true},
    {title: '反馈类型', dataIndex: 'typeStr'},
    {title: '反馈状态', dataIndex: 'statusStr'},
    {title: '反馈门店', dataIndex: 'spShopName'},
    {
        title: '反馈时间', dataIndex: 'createTime',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    },
    {title: '处理时长', dataIndex: 'handleTime'},
    {
        title: '操作', width: '10%', dataIndex: 'opation',
        render: (text, record) => {
            return (
                <Link className="link-color"
                      to={`/account/channel_feedback/detail/${record.spFeedbackId}`}>
                    处理
                </Link>
            );
        }
    }];
export default Columns;
