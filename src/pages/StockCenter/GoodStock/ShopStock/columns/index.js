import moment from "moment";

const Columns = [
  {
    title: "门店名称",
    dataIndex: "channelName",
    key: "1"
  },
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
    title: "商品分类",
    dataIndex: "categoryInfo",
    key: "6"
  },
  {
    title: "门店库存数",
    dataIndex: "actualStock",
    key: "7"
  },
  {
    title: "门店可用库存数",
    dataIndex: "availableStock",
    key: "8"
  }
];

export default Columns;
