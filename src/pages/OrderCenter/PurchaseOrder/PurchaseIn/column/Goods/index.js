import React from "react";
import moment from "moment";

const GoodsColumns = [
    {title: "SKU编码", dataIndex: "itemCode", key: "1"},
    {title: "商品名称", dataIndex: "itemName", key: "2"},
    {title: "商品规格", dataIndex: "salesAttributeName", key: "3"},
    {title: "SKU创建时间", dataIndex: "skuCreateTime", key: "4",
        render: (text) => (
            <span>{text && moment(text).format("YYYY-MM-DD")}</span>
        )},
    {title: "采购数量", dataIndex: "amount", key: "5"},
    {title: "到货数量", dataIndex: "changeNum", key: "6"},
    {title: "采购单价", dataIndex: "price", key: "7"},
    {title: "采购总价", dataIndex: "totalPrice", key: "8"},
];
export default GoodsColumns;
