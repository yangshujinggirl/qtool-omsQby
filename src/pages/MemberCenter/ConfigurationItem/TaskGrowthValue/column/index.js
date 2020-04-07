import React from "react";
import {Link} from "react-router-dom";
import {TableItemShowTime} from "common/QdisabledDateTime";

const Columns = [
    {title: "成长值类型", dataIndex: "growthType", key: "1"},
    {title: "任务项", dataIndex: "name", key: "2"},
    {title: "成长值任务标题", dataIndex: "title", key: "3"},
    {
        title: "最后修改时间", dataIndex: "updateTime", key: "4",
        render: (text) => (<TableItemShowTime showTime={text}/>)
    },
    {title: "最后修改人", dataIndex: "updateUser", key: "5"},
    {
        title: "操作", key: "6",
        render: (text, record) => (
            <div>
                <Link className="link-color" style={{marginRight: '10px'}}
                      to={`/account/growth_task_configuration/detail/${record.growthTaskId}`}>
                    查看
                </Link>
                <Link className="link-color" to={`/account/brandInfo/${record.id}`}>
                    编辑
                </Link>
            </div>
        )
    }
];
export default Columns;
