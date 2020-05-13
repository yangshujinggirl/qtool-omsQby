import { Link } from "react-router-dom";
import moment from "moment";
const Columns = [
  {
    title: "退单号",
    dataIndex: "reOrderNo",
    render: (text, record) => {
      return (
        <Link to={`/account/allReturn_infos/${record.reOrderNo}`}>{text}</Link>
      );
    },
  },
  {
    title: "关联订单号",
    dataIndex: "channelOrderNo",
    render: (text, record) =>
      record.deliveryType == 2 ? (
        <Link to={`/account/user_bondedOrder_infos/${record.channelOrderNo}`}>{text}</Link>
      ) : (
        <Link to={`/account/user_order_infos/${record.channelOrderNo}`}>{text}</Link>
      ),
  },
  {
    title: "用户手机号",
    dataIndex: "phone",
  },
  {
    title: "退单状态",
    dataIndex: "statusStr",
  },
  {
    title: "收货方",
    dataIndex: "warehouseName",
  },
  {
    title: "退款方式",
    dataIndex: "typeStr",
  },
  {
    title: "原订单支付金额",
    dataIndex: "orderTotal",
  },
  {
    title: "退款商品数",
    dataIndex: "returnQty",
  },
  {
    title: "退款总金额",
    dataIndex: "totalPrice",
  },
  {
    title: "订单类型",
    dataIndex: "deliveryTypeStr",
  },
  {
    title: "退款类型",
    dataIndex: "refundTypeStr",
  },
  {
    title: "退款渠道",
    dataIndex: "payTypeStr",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    render: (text, record, index) => (
      <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    ),
  },
];
const ReturnGoods = [
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
    title: "退款数量",
    dataIndex: "reNum",
  },
  {
    title: "退款金额",
    dataIndex: "totalPrice",
  },
];
const ReturnLogs = [
  {
    title: "操作",
    dataIndex: "operation",
  },
  {
    title: "操作时间",
    dataIndex: "lastUpdateTime",
    render:(text,record,index)=>(
    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    )
  },
  {
    title: "退单状态",
    dataIndex: "statusVal",
  },
  {
    title: "操作人",
    dataIndex: "modifyBy",
  },
];
export { Columns, ReturnGoods, ReturnLogs };
