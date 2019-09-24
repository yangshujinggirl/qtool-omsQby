const columns = [
  { title: "商品名称", dataIndex: "productName", key: "1" },
  { title: "商品图片", dataIndex: "imageListB", key: "2" },
  {
    title: "商品种类",
    dataIndex: "productType",
    key: "3",
    render: text => (text == 1 ? "普通类型" : "跨境商品")
  },
  { title: "货主", dataIndex: "supplierName", key: "4" },
  { title: "品牌名", dataIndex: "brandName", key: "5" },
  { title: "销售端", dataIndex: "saleRange", key: "6" },
  {
    title: "发货类型",
    dataIndex: "sendType",
    key: "7",
    render: text => (text == 1 ? "系统发货" : "供应商发货")
  },
  { title: "创建时间/最近更新时间", dataIndex: "createTime", key: "8" },
  {
    title: "操作",
    key: "action",
    dataIndex: "",
    render: () => (
      <div>
        <a className="link-color">查看</a>
        <a className="link-color">编辑</a>
      </div>
    )
  }
];
export default columns
