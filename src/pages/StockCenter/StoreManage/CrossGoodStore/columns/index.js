import moment from "moment";
const Columns = [
  {
    title: "仓库名称",
    dataIndex: "warehouseName",
  },
  {
    title: "C端展示名称",
    dataIndex: "displayNameC"
  },
  {
    title: "C端配送说明",
    dataIndex: "distributionDescribeC"
  },
  {
    title: "推送平台",
    dataIndex: "pushPlatform",
    render:(text,record,index)=>(
      <span>{text==1?'无':(text==2?'管易':(text==3?'丰趣':'芳星'))}</span>
    )
  },
  {
    title: "出货方式",
    dataIndex: "departureType",
    render:(text,record,index)=>(
      <span>{text==1?'保税仓发货':(text==2?'海外直邮':'虚拟发货')}</span>
    )
  },
  {
    title: "仓库状态",
    dataIndex: "warehouseStatus",
    render:(text,record,index)=>(
      <span>{text==1?'启用':'禁用'}</span>
    )
  },{
    title: "创建人",
    dataIndex: "createTime",
  },{
    title: "最后修改人",
    dataIndex: "createTime",
  },{
    title: "操作",
    dataIndex: "createTime",
    render:(text,record,index)=>(
      <a>修改</a>
    )
  },
];

export default Columns
