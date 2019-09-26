
const Columns = [
  { title: "SPU编码", dataIndex: "spuCode", key: "1" },
  {
    title: "商品名称",
    dataIndex: "productName",
    key: "2",
    render: text => <img src={text} style={{ width: "90px", height: "90px" }} />
  },
  {
    title: "商品图片",
    dataIndex: "image",
    key: "3",
    render: text => (text == 1 ? "普通类型" : "跨境商品")
  },
  { title: "B端参考价", dataIndex: "bprice", key: "4" },
  { title: "税率", dataIndex: "taxRate", key: "5" },
  { title: "上架状态", dataIndex: "saleRange", key: "6" },
  {
    title: "同步时间",
    dataIndex: "sendType",
    key: "7",
    render: text => (text == 1 ? "系统发货" : "供应商发货")
  },
 
  {
    title: "操作",
    key: "action",
    dataIndex: "",
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
