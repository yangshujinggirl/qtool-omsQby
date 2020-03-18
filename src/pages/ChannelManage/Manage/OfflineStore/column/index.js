import React from "react";
import {Link} from "react-router-dom";

const Columns = [
        {title: "一级渠道ID", dataIndex: "channelPopularizeCoding", key: '1'},
        {title: "一级渠道名称", dataIndex: "name", key: '2'},
        {title: "省份", dataIndex: "province", key: '3'},
        {title: "二级渠道数量", dataIndex: "secondChannelNum", key: '4'},
        {
            title: "操作", dataIndex: "operate", key: '5',
            render: (text, record) => {
                return <Link className="link-color"
                             to={`/account/bridge_manager_control/offline_store/level_2/${record.channelPopularizeId}`}>二级渠道管理</Link>
            }
        }
    ]
;
export default Columns;
