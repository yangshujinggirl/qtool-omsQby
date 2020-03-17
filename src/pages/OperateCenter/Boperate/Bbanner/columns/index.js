import { Link } from "react-router-dom";
const Columns = [
  {
    title: "banner名称",
    dataIndex: "name"
  },
  {
    title: "banner id",
    dataIndex: "pdBannerId"
  },
  {
    title: "状态",
    dataIndex: "statusStr"
  },
  {
    title: "创建人",
    dataIndex: "urUserName"
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  },
  {
    title: "修改人",
    dataIndex: "updateUrUserName"
  },
  {
    title: "操作",
    dataIndex: "cancelReason",
    render: (text, record) => {
      return (
        <div>
          {/* {record.status == 10 ? ( */}
            <Link to={`/account/add_banner/${record.pdBannerId}`} className="theme-color">
              <span>修改</span>
            </Link>
          {/* ) : null} */}
        </div>
      );
    }
  }
];

export default Columns;
