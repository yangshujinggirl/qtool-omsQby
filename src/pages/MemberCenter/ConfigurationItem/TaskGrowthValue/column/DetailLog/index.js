import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";
import {TableItemShowTime} from "common/QdisabledDateTime";

/**
 * 副标题字段
 */
const SubheadingColumns = [
    {title: "副标题字段1", dataIndex: "subTitleField1", key: "1"},
    {title: "副标题字段2", dataIndex: "subTitleField2", key: "2"},
    {title: "副标题字段3", dataIndex: "subTitleField3", key: "3"}
];
/**
 * 日志字段
 */
const LogColumns = [
    {title: "操作类型", dataIndex: "logType", key: 1},
    {title: "操作描述", dataIndex: "content", key: 2},
    {title: "操作时间", dataIndex: "createTime", key: 3},
    {title: "操作人", dataIndex: "operateUser", key: 4}
];
export {SubheadingColumns,LogColumns};
