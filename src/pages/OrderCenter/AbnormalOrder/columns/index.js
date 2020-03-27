import { Link } from "react-router-dom";
import moment from "moment";
const Columns = [
  {
    title: "订单号",
    dataIndex: "orderNo",
  },
  {
    title: "门店名称",
    dataIndex: "channelName"
  },
  {
    title: "订单类型",
    dataIndex: "sort",
    render:(text,record,index)=>(
      <span>{text==1?'门店采购单':'用户订单'}</span>
    )
  },
  {
    title: "异常原因",
    dataIndex: "abnormalCause"
  },
  {
    title: "商品数量",
    dataIndex: "itemCount"
  },
  {
    title: "实付金额",
    dataIndex: "orderTotal"
  },
  {
    title: "收货人",
    dataIndex: "consignee",
  }, {
    title: "联系电话",
    dataIndex: "phone",
  }, {
    title: "收货地址",
    dataIndex: "address",
  }, {
    title: "生成时间",
    dataIndex: "channelOrderCreateTime",
    render:(text,record,index)=>(
    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    )
  }, 
  {
    title: "操作",
    dataIndex: "operate",
    render: (text, record, index) => (
      <Link to={`/account/abnormalOrder_info/${record.orderNo}`}>处理</Link>
    )
  }
];
const AbnormalGoods = [
  {
    title: "SKU编码",
    dataIndex: "skuCode"
  },
  {
    title: "商品名称",
    dataIndex: "productName"
  },
  {
    title: "商品规格",
    dataIndex: "salesAttributeName"
  },
  {
    title: "订单数量",
    dataIndex: "num"
  },
  {
    title: "应付单价",
    dataIndex: "totalPrice"
  },
  {
    title: "应付总价",
    dataIndex: "reNum"
  },
  {
    title: "实付总价",
    dataIndex: "refundMoney"
  }
];
export { Columns, AbnormalGoods };