import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";

const Columns = [
    {
        title: "订单号",
        dataIndex: "stockingCode",
        key: "1",
        render: (text, record) => (
            <Link
                className="link-color"
                to={`/account/purchaseOrderInDetail/${record.stockingCode}`}
            >
                {text}
            </Link>
        )
    },
    {title: "下单门店", dataIndex: "suppliersName", key: "2"},
    {title: "商品数量", dataIndex: "itemCount", key: "3"},
    {title: "订单金额", dataIndex: "priceTotal", key: "4"},
    {title: "订单状态", dataIndex: "receiveCount", key: "5"},
    {title: "订单来源", dataIndex: "receivePrice", key: "6"},
    {title: "订单标签", dataIndex: "statusStr", key: "7"},
    {title: "收货人", dataIndex: "stepStr", key: "8"},
    {
        title: "创建人",
        dataIndex: "createTime",
        key: "9",
        render: (text, record) => (
            <div>
                <span>{record.modifyBy}</span>
                <br/>
                <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
            </div>
        )
    },
    {
        title: "发货时间",
        key: "10",
        dataIndex: "createTime",
        render: text => <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    }
];
export default Columns;
