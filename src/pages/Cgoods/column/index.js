import moment from "moment";
const Columns = [
  { title: "SPU编码", dataIndex: "spuCode", key: "1" },
  {
    title: "商品名称",
    dataIndex: "productName",
    key: "2",
  },
  {
    title: "商品图片",
    dataIndex: "image",
    key: "3",
    render:(text)=>(<img src={text} style={{ width: "90px", height: "90px" }}/>)
  },
  { title: "C端参考价", dataIndex: "cprice", key: "4" },
  { title: "税率", dataIndex: "taxRate", key: "5" },
  { title: "商品性质", dataIndex: "productNature", key: "6",render:(text)=>(text==1?'普通商品':'跨境商品')},
  { title: "上架状态", dataIndex: "upperStatus", key: "7",render:(text)=>(text==1?'上架':'下架')},
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "8",
    render:(text)=>(<span>{moment(text).format('YYYY-MM-DD H:mm:ss')}</span>)
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "9",
    render: (text,record,index) => (
      <div>
        <a
          className="link-color action-left"
          onClick={() => record.onOperateClick("look")}
        >
          查看
        </a>
        <a
          className="link-color"
          onClick={() => record.onOperateClick("edit")}
        >
          编辑
        </a>
      </div>
    )
  }
];

export default Columns
