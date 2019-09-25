const Columns = [
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
const Columns1 = [
  { title: "sku编码", dataIndex: "skuCode", key: "1" },
  { title: "规格", dataIndex: "imageListB", key: "2" },
  {
    title: "审核状态",
    dataIndex: "status",
    key: "3",
    render: text =>{
      switch(text){
        case 0:return '待提交'
        case 1:return '待审核'
        case 3:return '审核不通过'
        case 4:return '审核通过'
      }
    }
  },
  {
    title: "操作",
    dataIndex: "brandName",
    key: "5",
    render: () => (
      record.status==1&&
      <div>
        <a className="link-color">通过</a>
        <a className="link-color">不通过</a>
      </div>
    )
  }
];

export {Columns,Columns1}
