import {Link} from 'react-router-dom'
const Columns = [
  {
    title: "定时名称",
    dataIndex: "taskName"
  },
  {
    title: "定时操作",
    dataIndex: "opstatusStr"
  },
  {
    title: "定时状态",
    dataIndex: "statusStr"
  },
  {
    title: "最后修改人",
    dataIndex: "updateUserName"
  },
  {
    title: "定时时间",
    dataIndex: "taskTime"
  },
  {
    title: "操作",
    dataIndex: "",
    render: (text, record) => {
      return (
        <div>
          <Link className="theme-color" to={`/account/taskInfo/${record.pdTaskTimeId}`}>
            查看
          </Link>　
          <Link className="theme-color" to={`/account/addTimer/${record.pdTaskTimeId}`}>
            编辑
          </Link>　
          <a className="theme-color" onClick={()=>record.onOperateClick()}>
            强制无效
          </a>
        </div>
      );
    }
  }
];
export default Columns;
