import React from "react";
import moment from "moment";

const GoodsColumns = [
    {title: "SKU编码", dataIndex: "itemCode", key: "1"},
    {title: "商品名称", dataIndex: "itemName", key: "2"},
    {title: "商品规格", dataIndex: "salesAttributeName", key: "3"},
    {title: "申请数量", dataIndex: "amount", key: "5"},
    {title: "到货数量", dataIndex: "changeNum", key: "6"},
    {title: "退货单价", dataIndex: "price", key: "7"},
    {title: "到货金额", dataIndex: "totalPrice", key: "8"},
];
export default GoodsColumns;
