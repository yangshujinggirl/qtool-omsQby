
const Columns = [
  {
    title: "渠道",
    dataIndex: "sourceCode",
    key: "2"
  },
  {
    title: "门店",
    dataIndex: "channelName",
    key: "3"
  },
  {
    title: "主订单号",
    dataIndex: "orderNo",
    key: "4"
  },
  {
    title: "详情订单号",
    dataIndex: "orderDetailNo",
    key: "5"
  },
  {
    title: "sku",
    dataIndex: "skuCode",
    key: "6"
  },
  {
    title: "商品名",
    dataIndex: "productName",
    key: "7"
  },
  {
    title: "收货人",
    dataIndex: "consignee",
    key: "8"
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    key: "9"
  },
  {
    title: "收货地址",
    dataIndex: "address",
    key: "10",
  },
  {
    title: "商品单价",
    dataIndex: "price",
    key: "11",
  },
  {
    title: "数量",
    dataIndex: "num",
    key: "12"
  },
  {
    title: "操作",
    dataIndex: "createTime",
    key: "13",
    render: text => {
      return <a className='theme-color' onClick={()=>record.onOperateClick()}>发货</a>;
    }
  }
];

export default Columns;
