import React from "react";
import moment from "moment";

/**
 * 功能作用：发货信息标题列表说明
 * 初始注释时间： 2020/3/7 17:00
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const ShippingInformationColumns = [
    {title: "物流/快递单号", dataIndex: "trackingNumber", key: "1"},
    {title: "物流/快递公司", dataIndex: "carrier", key: "2"},
    {title: "运费", dataIndex: "freightPrice", key: "3"},
    {title: "状态 ", dataIndex: "status", key: "4"},
];
export default ShippingInformationColumns;
