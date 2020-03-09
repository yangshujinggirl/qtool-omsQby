import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";
import {AUDIT_STATUS_NO_PASS} from "../../../PurchaseOrder/PurchaseIn/config";
import {Popover} from "antd";

const Columns = [
    {
        title: "退货单号",
        dataIndex: "stockingCode",
        key: "1",
        render: (text, record) => (
            <Link
                className="link-color"
                to={`/account/border/shopOrderDetail/${record.stockingCode}`}
            >{text}</Link>
        )
    },
    {
        title: "关联门店订单号",
        dataIndex: "stockingCode",
        key: "12",
        render: (text, record) => (
            <Link
                className="link-color"
                to={`/account/border/shopOrderDetail/${record.stockingCode}`}
            >{text}</Link>
        )
    },
    {title: "退货门店", dataIndex: "suppliersName", key: "2"},
    {title: "申请数量", dataIndex: "itemCount", key: "3"},
    {
        title: "申请总金额", dataIndex: "priceTotal", key: "4",
        render: ((text, record) => (
            <Popover placement={text} title={text} content={
                <div>
                    测试
                </div>
            } trigger="click">
                <span>{text}</span>
            </Popover>
        ))
    },
    {title: "到货数量", dataIndex: "receiveCount", key: "5"},
    {
        title: "实退金额", dataIndex: "receivePrice", key: "6",
        render: ((text, record) => (
            <Popover placement={text} title={text} content={
                <div>
                    测试
                </div>
            } trigger="click">
                <span>{text}</span>
            </Popover>
        ))
    },
    {title: "退单类型", dataIndex: "statusStr", key: "7"},
    {title: "订单状态", dataIndex: "stepStr", key: "8"},
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
        title: "操作",
        key: "11",
        render: (text, record) => (
            <div>
                {record.status === AUDIT_STATUS_NO_PASS ? (
                    <Link
                        to={`/account/add_purchasein/${record.id}`}
                        className="link-color action-left"
                    >
                        修改
                    </Link>
                ) : null}
            </div>
        )
    }
];
export default Columns;
