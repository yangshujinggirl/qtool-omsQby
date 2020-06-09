import { Link } from "react-router-dom";
import moment from "moment";
const Columns = [
  {
    title: "订单号",
    dataIndex: "orderNo",
  },
  {
    title: "渠道订单号",
    dataIndex: "channelOrderNo",
  },
  {
    title: "门店名称",
    dataIndex: "channelName",
  },
  {
    title: "订单类型",
    dataIndex: "sortStr",
  },
  {
    title: "SKU编码",
    dataIndex: "skuCode",
  },
  {
    title: "商品名称",
    dataIndex: "productName",
  },
  {
    title: "商品规格",
    dataIndex: "salesAttributeName",
  },
  {
    title: "购买数量",
    dataIndex: "num",
  },
  {
    title: "下单时间",
    dataIndex: "channelOrderCreateTime",
    render: (text, record, index) => (
      <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    ),
  },
];

export default Columns;
