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
    title: "商品类型",
    dataIndex: "productTypeStr",
    key: "5"
  },
  {
    title: "商品分类",
    dataIndex: "categoryInfo",
    key: "6"
  },
  {
    title: "ERP库存数",
    dataIndex: "erpStock",
    key: "7"
  },
  {
    title: "蔻兔仓库存",
    dataIndex: "qtoolsActualStock",
    key: "7"
  },
  {
    title: "淮安仓库存",
    dataIndex: "actualStock",
    key: "7"
  },
  {
    title: "蔻兔仓可用库存",
    dataIndex: "qtoolsAvailableStock",
    key: "7"
  },
  {
    title: "淮安仓可用库存",
    dataIndex: "availableStock",
    key: "8"
  }
];

export default Columns;
