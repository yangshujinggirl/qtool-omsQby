import { Link } from "react-router-dom";
import moment from "moment";
const Columns = [
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "门店名称",
    dataIndex: "spShopName"
  },
  {
    title: "订单类型",
    dataIndex: "orderTypeStr"
  },
  {
    title: "消费门店类型",
    dataIndex: "isLocalShopStr"
  },
  {
    title: "用户类型",
    dataIndex: "levelStr"
  },
  {
    title: "结算金额",
    dataIndex: "amount"
  },
  {
    title: "订单状态",
    dataIndex: "statusStr"
  },
  {
    title: "订单时间",
    dataIndex: "createTime"
  }
];
const DetailGoods = [
  {
    title: "商品名称",
    dataIndex: "name"
  },
  {
    title: "规格",
    dataIndex: "displayName"
  },
  {
    title: "商品编码",
    dataIndex: "code"
  },
  {
    title: "数量",
    dataIndex: "qty"
  },
  {
    title: "零售价",
    dataIndex: "price"
  },
  {
    title: "折扣",
    dataIndex: "discount"
  },
  {
    title: "折后总价",
    dataIndex: "payPrice"
  },
  {
    title: "实付总价",
    dataIndex: "actualPayAmount"
  }
];
export { Columns, DetailGoods };
