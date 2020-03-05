import { Link } from "react-router-dom";
const Columns = [
  { title: "SKU", dataIndex: "skuCode", key: "1" },
  {
    title: "供应商名称",
    dataIndex: "supplierName",
    key: "2"
  },
  {
    title: "产品名称",
    dataIndex: "productName",
    key: "3"
  },
  {
    title: "采购价",
    dataIndex: "stockingPrice",
    key: "4",
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    key: "5"
  },
  {
    title: "操作",
    dataIndex: "",
    key: "6",
    render: (text, record, index) => {
      return <Link to={`/account/supplierAdd/${record.id}`}>编辑</Link>;
    }
  }
];

export default Columns;
