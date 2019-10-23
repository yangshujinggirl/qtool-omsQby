import moment from "moment";
import {Link} from 'react-router-dom'
const Columns = [
  { title: "仓库编码", dataIndex: "warehouseCode", key: "1" },
  {
    title: "仓库名",
    dataIndex: "warehouseName",
    key: "2"
  },
  {
    title: "仓库类型",
    dataIndex: "warehouseType",
    key: "3",
    render: (text, record, index) => {
      return (
        <span>
          {text && text == 1 ? "公司仓" : text == 2 ? "门店仓" : "保税仓"}
        </span>
      );
    }
  },
  {
    title: "发货优先级",
    dataIndex: "priority",
    key: "4",
    render:(text,record,index)=>{
      return<span>{text&&text==1?'低':(text==2?'中':'高')}</span>
    }
  },
  {
    title: "仓库创建时间",
    dataIndex: "createTime",
    key: "5",
    render: (text, record, index) => {
      return <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>;
    }
  },
  {
    title: "操作",
    dataIndex: "",
    key: "6",
    render: (text, record, index) => {
      return <Link to={`/account/storeAdd/${record.id}`}>修改</Link>
    }
  }
];

export default Columns;
