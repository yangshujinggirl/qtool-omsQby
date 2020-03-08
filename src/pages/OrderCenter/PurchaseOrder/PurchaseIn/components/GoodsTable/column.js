import moment from  'moment'
const Columns = [
  {
    title: "SKU编码",
    dataIndex: "itemCode",
    editable: true,
    canSearch: true,
    placeholder: "请输入SKU编码",
    rules:[{required:true,message:'请输入SKU编码'}],
    key:0
  },
  {
    title: "采购数量",
    dataIndex: "amount",
    editable: true,
    placeholder: "采购数量",
    rules: [{required:true,message:'请输入采购数量'},{ pattern: /^([1-9][0-9]*){1,3}$/, message: "请输入＞0的整数" }],
    key:1
  },
  {
    title: "采购单价",
    dataIndex: "price",
    editable: true,
    placeholder: "采购单价",
    rules: [{required:true,message:'请输入采购单价'},{ pattern: /^\d+(\.\d{0,4})?$/, message: "请输入≥0的数字" }],
    key:2
  },
  {
    title: "采购主体",
    dataIndex: "procurementTarget",
    render: (text, record) => (
      <span>{text == 1 ? "淮安" : text == 2 ? "qtools" : ""}</span>
    ),
    key:3
  },
  {
    title: "商品名称",
    dataIndex: "productName",
    key:4
  },
  {
    title: "商品规格",
    dataIndex: "salesAttributeName",
    key:5
  },
  {
    title: "SKU创建时间",
    dataIndex: "createTime",
    render: (text, record) => (
      <span>{text&&moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    ),
    key:6
  },
  {
    title: "操作",
    dataIndex: "operate",
    isDel: true,
    key:7
  }
];
export default Columns;
