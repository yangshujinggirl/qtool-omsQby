import moment from "moment";
import { Link } from "react-router-dom";
import { AUDIT_STATUS_NO_PASS,AUDIT_STATUS_WAIT } from "../config";
import React from "react";

const Columns = [
  {
    title: "采退单号",
    dataIndex: "stockingReCode",
    key: "1",
    render: (text, record) => (
      <Link
        className="link-color"
        to={`/account/purchaseRefundOrderOutDetail/${record.stockingReCode}`}
      >
        {text}
      </Link>
    )
  },
  {
    title: "关联采购单号",
    dataIndex: "stockingCode",
    key: "2",
    render: (text, record) => (
      <Link
        className="link-color"
        to={`/account/purchaseOrderInDetail/${record.stockingCode}`}
      >
        {text}
      </Link>
    )
  },
  { title: "供应商名称", dataIndex: "suppliersName", key: "3" },
  { title: "采退原因", dataIndex: "reRemark", key: "4" },
  { title: "采退数量", dataIndex: "totalNum", key: "5" },
  { title: "采退金额", dataIndex: "priceTotal", key: "6" },
  { title: "审核状态", dataIndex: "statusStr", key: "7" },
  { title: "订单状态", dataIndex: "stepStr", key: "8" },
  {
    title: "创建人",
    dataIndex: "createTime",
    key: "9",
    render: (text, record) => (
      <div>
        <span>{record.user}</span>
        <br />
        <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
      </div>
    )
  },
  {
    title: "操作",
    key: "10",
    render: (text, record) => (
      <div>
        {record.status === AUDIT_STATUS_NO_PASS ? (
          <Link
            to={`/account/add_purchaseOut/${record.stockingReCode}`}
            className="link-color"
          >修改</Link>
        ) : null}
         {record.status === AUDIT_STATUS_WAIT ? <a className='theme-color' onClick={()=>record.onOperateClick()}>审核</a> : null}
      </div>
    )
  }
];
export default Columns;
