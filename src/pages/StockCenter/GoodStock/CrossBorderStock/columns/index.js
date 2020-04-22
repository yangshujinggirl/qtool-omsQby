import moment from "moment";

const Columns = [
  {
    title: "SKU编码",
    dataIndex: "skuCode",
    key: "1"
  },
  {
    title: "SPU编码",
    dataIndex: "spuCode",
    key: "2"
  },
  {
    title: "商品名称",
    dataIndex: "productName",
    key: "3"
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName",
    key: "4"
  },
  {
    title: "保税仓",
    dataIndex: "warehouse_name",
    key: "5"
  },
  {
    title: "商品分类",
    dataIndex: "productTypeStr",
    key: "6"
  },
  {
    title: "可用库存",
    dataIndex: "availableStock",
    key: "7"
  },
];

export default Columns;
