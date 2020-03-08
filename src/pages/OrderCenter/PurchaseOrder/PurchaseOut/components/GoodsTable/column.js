import moment from  'moment'
const Columns = [
  {
    title: "SKU编码",
    dataIndex: "itemCode",
    key:0
  },
  {
    title: "商品名称",
    dataIndex: "itemName",
    key:1
  },
  {
    title: "商品规格",
    dataIndex: "salesAttributeName",
    key:2
  },
  {
    title: "可退数量",
    dataIndex: "allowedReturnQuantity",
    render: (text, record) => (
      <span>{text == 1 ? "淮安" : text == 2 ? "qtools" : ""}</span>
    ),
    key:3
  },
  {
    title: "采退数量",
    dataIndex: "amount",
    key:4,
    editable: true,
    placeholder: "采退数量",
    rules: [{required:true,message:'请输入采退数量'},{ pattern:/^([1-9][0-9]*){1,3}$/, message: "请输入≥0的数字" }],
  },
  {
    title: "采退单价",
    dataIndex: "price",
    key:5,
    editable: true,
    placeholder: "采购单价",
    rules: [{required:true,message:'请输入采购单价'},{ pattern: /^\d+(\.\d{0,4})?$/, message: "请输入≥0的数字" }],
    
  },
  {
    title: "金额小计",
    dataIndex: "createTime",
    key:5,
  },
];
export default Columns;
