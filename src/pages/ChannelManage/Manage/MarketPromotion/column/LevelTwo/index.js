import React from "react";

const Columns = [
    {title: "二级渠道ID", dataIndex: "channelPopularizeCoding", key: "1"},
    {title: "二级渠道名称", dataIndex: "name", key: "2"},
    {
        title: "操作", dataIndex: "activityPrice", key: "4",
        render: (text, record) => {
            return (
                <div>
                    <a className="link-color" style={{marginRight: '10px'}}
                       onClick={() => record.onOperateClick('down')}>下载渠道码</a>
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
