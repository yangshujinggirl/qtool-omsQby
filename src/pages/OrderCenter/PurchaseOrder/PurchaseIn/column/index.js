import moment from "moment";
import { Link } from "react-router-dom";
import { AUDIT_STATUS_NO_PASS,AUDIT_STATUS_WAIT  } from "../config";
import React from "react";

const Columns = [
  {
    title: "采购单号",
    dataIndex: "stockingCode",
    key: "1",
    render: (text, record) => (
      <Link
        className="link-color"
        to={`/account/purchaseOrderInDetail/${record.stockingCode}`}
      >
        {text}
      </Link>
    ),
  },
  { title: "供应商名称", dataIndex: "suppliersName", key: "2" },
  { title: "商品数量", dataIndex: "itemCount", key: "3" },
  { title: "订单金额", dataIndex: "priceTotal", key: "4" },
  {
    title: "预计送达时间",
    dataIndex: "predictCtime",
    key: "5",
    render: (text) => <span>{text && moment(text).format("YYYY-MM-DD")}</span>,
  },
  { title: "到货数量", dataIndex: "receiveCount", key: "6" },
  { title: "到货金额", dataIndex: "receivePrice", key: "7" },
  { title: "审核状态", dataIndex: "statusStr", key: "8" },
  { title: "订单状态", dataIndex: "stepStr", key: "9" },
  {
    title: "创建人",
    dataIndex: "createTime",
    key: "10",
    render: (text, record) => (
      <div>
        <span>{record.modifyBy}</span>
        <br />
        <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
      </div>
    ),
  },
  {
    title: "操作",
    key: "11",
    render: (text, record) => (
      <div>
        {record.status === AUDIT_STATUS_NO_PASS ? (
          <Link
            to={`/account/add_purchasein/${record.stockingCode}`}
            className="link-color action-left"
          >
            修改
          </Link>
        ) : null}
        {record.status === AUDIT_STATUS_WAIT ? <a className='theme-color' onClick={()=>record.onOperateClick()}>审核</a> : null}
      </div>
    ),
  },
];
export default Columns;
