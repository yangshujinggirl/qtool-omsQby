import { Link } from "react-router-dom";
import moment from "moment";

const Columns = [
  {
    title: "spu编码",
    dataIndex: "spuCode",
    key: "1"
  },
  {
    title: "sku编码",
    dataIndex: "skuCode",
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
    title: "类目",
    dataIndex: "categoryInfo",
    key: "5"
  },
  {
    title: "商品类型",
    dataIndex: "productType",
    key: "6"
  },
  {
    title: "采购价",
    dataIndex: "purchasePrice",
    key: "7",
    render: record => (
      <div>
        {record.exPurchasePrice}
        <span style={{color:'red'}}>{record.purchasePrice}</span>
      </div>
    )
  },
  {
    title: "B端售价",
    dataIndex: "businessPrice",
    key: "8",
    render: record => (
      <div>
        {record.exBusinessPrice}
        <span style={{color:'red'}}>{record.businessPrice}</span>
      </div>
    )
  },
  {
    title: "C端售价",
    dataIndex: "channelStatus",
    key: "9",
    render: record => (
      <div>
        {record.exCustomerPrice}
        <span style={{color:'red'}}>{record.customerPrice}</span>
      </div>
    )
  },
  {
    title: "建议零售价",
    dataIndex: "channelStatus",
    key: "10",
    render: record => (
      <div>
        {record.exProposalPrice}
        <span style={{color:'red'}}>{record.proposalPrice}</span>
      </div>
    )
  },
  {
    title: "服务费",
    dataIndex: "channelStatus",
    key: "11",
    render: record => (
      <div>
        {record.exBonusRate}
        <span style={{color:'red'}}>{record.bonusRate}</span>
      </div>
    )
  },
  {
    title: "税率",
    dataIndex: "channelStatus",
    key: "12",
    render: record => (
      <div>
        {record.exTaxRate}
        <span style={{color:'red'}}>{record.taxRate}</span>
      </div>
    )
  },
  {
    title: "提交人",
    dataIndex: "modifyBy",
    key: "13"
  },
  {
    title: "提交时间",
    dataIndex: "lastUpdateTime",
    key: "14",
    render: (text, record, index) => (
      <span>{text&&moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
];
export default Columns;
