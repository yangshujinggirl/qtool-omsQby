import { Link } from "react-router-dom";
import moment from "moment";
const Columns = [
  {
    title: "退单号",
    dataIndex: "reOrderNo",
    render: (text, record) => {
      return (
        <Link to={`/account/auditReturn_info/${record.reOrderNo}`}>{text}</Link>
      );
    }
  },
  {
    title: "用户手机号",
    dataIndex: "phone"
  },
  {
    title: "订单类型",
    dataIndex: "deliveryTypeStr"
  },
  {
    title: "退款类型",
    dataIndex: "refundTypeStr"
  },
  {
    title: "退款金额",
    dataIndex: "refundMoney"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    render: (text, record, index) => (
      <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
  {
    title: "操作",
    dataIndex: "operate",
    render: (text, record, index) => (
      <Link to={`/account/auditReturn_info/${record.reOrderNo}`}>{text}</Link>
    )
  }
];
const AbnormalGoods = [
  {
    title: "SKU编码",
    dataIndex: "skuCode"
  },
  {
    title: "商品名称",
    dataIndex: "productName"
  },
  {
    title: "商品规格",
    dataIndex: "salesAttributeName"
  },
  {
    title: "购买数量",
    dataIndex: "num"
  },
  {
    title: "实付金额",
    dataIndex: "totalPrice"
  },
  {
    title: "退款数量",
    dataIndex: "reNum"
  },
  {
    title: "退款金额",
    dataIndex: "refundMoney"
  }
];
export { Columns, AbnormalGoods };
