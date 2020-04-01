import { Link } from "react-router-dom";
const Columns = [
  {
    title: "商品ID",
    key: "pdSpuActiveId",
    dataIndex: "pdSpuActiveId"
  },
  {
    title: "商品名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "商品零售价",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "兑换所需金币数",
    dataIndex: "valueQty",
    key: "valueQty"
  },
  {
    title: "可兑换数量",
    dataIndex: "convertibleQty",
    key: "convertibleQty"
  },
  {
    title: "剩余数量",
    dataIndex: "leftQty",
    key: "leftQty"
  },
  {
    title: "操作",
    render: (text, record, index) => (
      <Link to={`/account/add_act_exchange_goods/${record.pdSpuActiveId}`}>修改</Link>
    )
  }
];

export default Columns;
