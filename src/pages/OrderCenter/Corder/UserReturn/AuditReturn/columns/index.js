import { Link } from "react-router-dom";
import moment from "moment";
const Columns = [
  {
    title: "退单号",
    dataIndex: "reOrderNo",
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
    title: "创建时间",
    dataIndex: "createTime",
    render: (text, record, index) => (
      <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
  {
    title: "操作",
    dataIndex: "createTime",
    render: (text, record) => {
      return <Link to={`/account/return_audit_infos/${record.reOrderNo}`}>{text}</Link>;
    }
  }
];
export default Columns;
