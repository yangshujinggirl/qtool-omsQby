import { Link } from "react-router-dom";
const Columns = [
  {
    title: "供应商名称",
    dataIndex: "name",
    key: "2"
  },
  {
    title: "简称",
    dataIndex: "shortName",
    key: "3"
  },
  {
    title: "账期类型",
    dataIndex: "accountsType",
    key: "4",
    render:(text,record,index)=>(
      text==1?'现结':(text==2?'票到付款':'货到付款')
    )
  },
  {
    title: "状态",
    dataIndex: "cooperationStatus",
    key: "5",
    render:(text,record,index)=>(
      text==1?'合作中':(text==2?'待合作':'停止合作')
    )
  },
  {
    title: "操作",
    dataIndex: "",
    key: "6",
    render: (text, record, index) => {
      return record.cooperationStatus == 2 ? (
        <a onClick={()=>record.onOperateClick(1)}>审核</a>
      ) : record.cooperationStatus == 1 ? (
        <div>
          {/* <Link to={`/account/addSupplier/${record.id}`}>修改</Link>　 */}
          <Link to={`/account/addSupplier/search?id=${record.id}`}>修改</Link>　
          <a onClick={()=>record.onOperateClick(3)}>停止合作</a>
        </div>
      ) : (
        ""
      );
    }
  }
];

export default Columns;
