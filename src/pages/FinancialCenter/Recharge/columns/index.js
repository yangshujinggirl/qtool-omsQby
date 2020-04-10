import { Link } from "react-router-dom";
import moment from "moment";
const Columns = [
  {
    title: "充值号",
    dataIndex: "voucherNo",
    render: (text, record) => {
      return (
        <Link to={`/account/rechargeInfos/${record.spVoucherId}`}>{text}</Link>
      );
    },
  },
  {
    title: "门店名称",
    dataIndex: "shopName",
  },
  {
    title: "充值金额",
    dataIndex: "amount",
  },
  {
    title: "充值时间",
    dataIndex: "createTime",
    render: (text) => (
      <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    ),
  },
  {
    title: "审核状态",
    dataIndex: "status",
    render: (text, record) => {
      return (
        <div>
          {status == 0 && (
            <a
              className="theme-color"
              onClick={() => record.onOperateClick()}
            >
              待审核
            </a>
          )}
          {status == 1 && <a>审核通过</a>}
          {status == 2 && <a>审核不通过</a>}
        </div>
      );
    },
  },
];
export default Columns;
