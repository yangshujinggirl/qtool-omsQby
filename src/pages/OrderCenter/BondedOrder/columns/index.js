import moment from 'moment'
const Columns = [
  {
    title: "订单号",
    dataIndex: "orderDetailNo"
  },
  {
    title: "渠道订单号",
    dataIndex: "channelOrderNo"
  },
  {
    title: "商品数量",
    dataIndex: "num"
  },
  {
    title: "订单金额",
    dataIndex: "normalPrice"
  },
  {
    title: "实付金额",
    dataIndex: "totalPrice"
  },
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    render:(text)=>(
    <span>{text==210?'待发货':(text==230?'已发货':'已取消')}</span>
    )
  },
  {
    title: "推送仓库",
    dataIndex: "warehouseName"
  },
 
  {
    title: "生成时间",
    dataIndex: "createTime",
    render: (text, record, index) => (
      <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
  {
    title: "操作",
    dataIndex: "operate",
    render: (text, record) => {
      return (
        record.orderStatus==210 && <a onClick={() => record.onOperateClick()}>发货</a>
      );
    }
  }
];

export default Columns;
