import moment from "moment";
const Columns = [
  {
    title: "仓库编码",
    dataIndex: "warehouseCode",
  },
  {
    title: "仓库名称",
    dataIndex: "warehouseName"
  },
  {
    title: "仓库类型",
    dataIndex: "warehouseType"
  },
  {
    title: "仓库状态",
    dataIndex: "pushPlatform",
    render:(text,record,index)=>(
      <span>{text==1?'启用':'禁用'}</span>
    )
  },
  {
    title: "仓库联系人",
    dataIndex: "departureType",
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    
  },{
    title: "仓库地址",
    dataIndex: "address",
  },{
    title: "创建人",
    dataIndex: "createTime",
  }
];

export default Columns
