import moment from 'moment'
const Columns = [
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "门店名称",
    dataIndex: "channelName"
  },
  {
    title: "代发状态",
    dataIndex: "isThinkStr"
  },
  {
    title: "SKU编码",
    dataIndex: "skuCode"
  },
  {
    title: "商品名称",
    dataIndex: "productName"
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName"
  },
  {
    title: "商品数量",
    dataIndex: "num"
  },
  {
    title: "商品实付价格",
    dataIndex: "totalPrice"
  },

  {
    title: "收货人",
    dataIndex: "consignee"
  },
  {
    title: "联系电话",
    dataIndex: "phone"
  },
  {
    title: "收货地址",
    dataIndex: "address"
  },
  {
    title: "生成时间",
    dataIndex: "channelOrderCreateTime",
    render: (text, record, index) => (
      <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
  {
    title: "操作",
    dataIndex: "operate",
    render: (text, record) => {
      return (
        record.purchaseNo && <a onClick={() => record.onOperateClick()}>发货</a>
      );
    }
  }
];

export default Columns;
