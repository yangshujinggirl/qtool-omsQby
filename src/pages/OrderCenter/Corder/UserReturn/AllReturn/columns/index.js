import { Link } from "react-router-dom";
import moment from 'moment'
const Columns = [
  {
    title: "退单号",
    dataIndex: "reOrderNo",
    render: (text, record) => {
      return <Link to="">{text}</Link>;
    }
  },
  {
    title: "关联订单号",
    dataIndex: "channelOrderNo",
    render: (text, record) => {
      return <Link to="">{text}</Link>;
    }
  },
  {
    title: "用户手机号",
    dataIndex: "phone"
  },
  {
    title: "退单状态",
    dataIndex: "statusStr"
  },
  {
    title: "收货方",
    dataIndex: "warehouseName"
  },
  {
    title: "退款方式",
    dataIndex: "inventedStr",
  },
  {
    title: "原订单支付金额",
    dataIndex: "totalPrice"
  },
  {
    title: "退款商品数",
    dataIndex: "reNum"
  },
  {
    title: "退款总金额",
    dataIndex: "refundMoney"
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
    title: "退款渠道",
    dataIndex: "payTypeStr"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    render:(text,record,index)=>(
    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    )
  }
];
export default Columns;
