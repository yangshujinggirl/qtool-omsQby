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
      <span>{(text==1||text==null)?'无':(text==2?'管易':(text==3?'丰趣':(text==4&&'芳星')))}</span>
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
    render:(text,record,index)=>{
      return(
        <div>
          <div>{record.createBy}</div>
          <div>{text&&moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
      )
    }
  },{
    title: "最后修改人",
    dataIndex: "lastUpdateTime",
    render:(text,record,index)=>{
      return(
        <div>
          <div>{record.modifyBy}</div>
          <div>{text&&moment(record.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
      )
    }
  },{
    title: "操作",
    render:(text,record,index)=>(
      <a onClick={()=>{record.onOperateClick()}}>修改</a>
    )
  },
];

export default Columns
