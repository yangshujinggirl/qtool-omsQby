import React from "react";
import moment from "moment";

const OrderLogsColumns = [
    {title: "操作", dataIndex: "operation", key: "1"},
    {title: "操作时间", dataIndex: "createTime", key: "2",
        render: (text) => (
            <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
        )
    },
    {title: "审核状态", dataIndex: "statusVal", key: "3"},
    {title: "订单状态", dataIndex: "stepVal", key: "4"},
    {title: "操作人", dataIndex: "modifyBy", key: "5"},
];
export default OrderLogsColumns;
