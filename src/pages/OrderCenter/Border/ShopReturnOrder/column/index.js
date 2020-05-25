import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";
import {Popover} from "antd";


const GoodsColumns = [
    {title: "SKU编码", dataIndex: "skuCode", key: "1"},
    {title: "商品名称", dataIndex: "productName", key: "2"},
    {title: "商品规格", dataIndex: "salesAttributeName", key: "3"},
    {title: "申请数量", dataIndex: "reNum", key: "5"},
    {title: "到货数量", dataIndex: "reArriveNum", key: "6"},
    {title: "退货单价", dataIndex: "price", key: "7"},
    {title: "到货金额", dataIndex: "reArriveAmount", key: "8"},
];
const OrderLogsColumns = [
    {title: "操作", dataIndex: "operation", key: "1"},
    {
        title: "操作时间", dataIndex: "createTime", key: "2",
        render: (text) => (
            <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
        )
    },
    {title: "订单状态", dataIndex: "statusVal", key: "4"},
    {title: "操作人", dataIndex: "modifyBy", key: "5"},
];
const Columns = [
    {
      title: "退货单号",
      dataIndex: "reOrderNo",
      key: "1",
      render: (text, record) => (
          <Link to={`/account/channel_refund_orders/detail/${record.reOrderNo}`}>{text}</Link>
      )
    },
    {
      title: "关联门店订单号",
      dataIndex: "channelOrderNo",
      key: "12",
      render: (text, record) => (
          <Link to={`/account/channel_orders/detail/${record.channelOrderNo}`}>{text}</Link>
      )
    },
    {title: "退货门店", dataIndex: "channelName", key: "2"},
    {title: "申请数量", dataIndex: "returnQty", key: "3"},
    {title: "申请总金额", dataIndex: "totalPrice", key: "4"},
    {title: "到货数量", dataIndex: "itemCount", key: "5"},
    {title: "实退金额", dataIndex: "reArriveAmount", key: "6"},
    {title: "退单类型", dataIndex: "typeStr", key: "7"},
    {title: "订单状态", dataIndex: "statusStr", key: "8"},
    {
      title: "创建人",
      dataIndex: "createTime",
      key: "9",
      render: (text, record) => (
          <div>
              <span>{record.createBy}</span>
              <br/>
              <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
          </div>
      )
    },{
      title: "操作",
      dataIndex: "action",
      render: (text, record) =>{
        return <>
                {
                  record.status <40 &&
                  <span className="pointerSty" onClick={() => record.onOperateClick('cancel')}>
                      取消退单
                  </span>
                }

              </>
      }
    }];
export  {
  Columns,OrderLogsColumns,GoodsColumns
};
