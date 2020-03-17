import { Link } from "react-router-dom";
const Columns = [
  {
    title: "推送标题",
    dataIndex: "title",
    render: (text, record) => {
      return (
        <div>
          <Link
            to={`/account/bpush_infos/${record.bsPushId}`}
            className="theme-color"
          >
            <a>{text}</a>
          </Link>
        </div>
      );
    }
  },
  {
    title: "推送类型",
    dataIndex: "alertTypeStr"
  },
  {
    title: "推送人群",
    dataIndex: "pushMan"
  },
  {
    title: "创建人",
    dataIndex: "creater"
  },
  {
    title: "推送状态",
    dataIndex: "statusStr"
  },
  {
    title: "推送时间",
    dataIndex: "pushTime"
  },
  {
    title: "操作",
    dataIndex: "cancelReason",
    render: (text, record) => {
      return (
        <div>
          {record.status == 10 ? (
            <Link
              to={`/account/add_bpush/${record.bsPushId}`}
              className="theme-color"
            >
              <span>修改</span>
            </Link>
          ) : null}
        </div>
      );
    }
  }
];

export default Columns;
