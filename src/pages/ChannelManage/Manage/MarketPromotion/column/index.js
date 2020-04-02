import React from "react";
import {Link} from "react-router-dom";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: "一级渠道ID", dataIndex: "channelPopularizeCoding", key: '1'},
    {title: "一级渠道名称", dataIndex: "name", key: '2'},
    {title: "负责人", dataIndex: "principal", key: '3'},
    {title: "二级渠道数量", dataIndex: "secondChannelNum", key: '4'},
    {
        title: "最后修改时间", dataIndex: "updateTime", key: '5',
        render: (text) => (<TableItemShowTime showTime={text}/>)
    },
    {title: "最后修改人", dataIndex: "updateUser", key: '6'},
    {
        title: "操作", dataIndex: "operate", key: '7',
        render: (text, record) => {
            return (
                <div>
                    <Link className="link-color" style={{marginRight: '10px'}}
                          to={`/account/bridge_manager_control/market_promotion/level_2/${record.channelPopularizeId}`}>二级渠道管理</Link>
                    <a className="link-color" style={{marginRight: '10px'}}
                       onClick={() => record.onOperateClick('edit',)}>编辑</a>
                    <a className="link-color"
                       onClick={() => record.onOperateClick('log',)}>日志</a>
                </div>
            );
        }
    }
];
export default Columns;
