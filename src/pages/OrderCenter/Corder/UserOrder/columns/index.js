import {Link} from 'react-router-dom'
//列表
const Columns = [
  {
    title: "订单号",
    dataIndex: "orderNo",
    key: "1",
    render:()=>(
    <Link to={`/account/user_order_infos/${record.orderId}`}>{text}</Link>
    )
  },
  {
    title: "门店名称",
    dataIndex: "spShopName",
    key: "2"
  },
  {
    title: "下单平台",
    dataIndex: "platformStr",
    key: "3"
  },
  {
    title: "订单类型",
    dataIndex: "orderStatusStr",
    key: "4"
  },
  {
    title: "配送方式",
    dataIndex: "deliveryTypeStr",
    key: "5"
  },
  {
    title: "出货仓",
    dataIndex: "shipmentStr",
    key: "6"
  },
  {
    title: "用户昵称",
    dataIndex: "nickname",
    key: "7"
  },
  {
    title: "用户电话",
    dataIndex: "mobilePhone",
    key: "8"
  },
  {
    title: "商品数量",
    dataIndex: "qtySum",
    key: "9"
  },
  {
    title: "订单金额",
    dataIndex: "orderAmount",
    key: "10"
  },
  {
    title: "订单状态",
    dataIndex: "orderStatusStr",
    key: "10"
  },
  {
    title: "优惠金额",
    dataIndex: "discountAmount",
    key: "10"
  },
  {
    title: "流程状态",
    dataIndex: "flowStatusStr",
    key: "10"
  },
  {
    title: "支付方式",
    dataIndex: "paymentTypeStr",
    key: "10"
  },
  {
    title: "下单时间",
    dataIndex: "createTimeStr",
    key: "10"
  }
];
//详情--商品信息
const GoodColumns = [
  {
    title: "商品名称",
    dataIndex: "spuName"
  },
  {
    title: "规格",
    dataIndex: "displayName"
  },
  {
    title: "商品编码",
    dataIndex: "code"
  },
  {
    title: "商品数量",
    dataIndex: "qty"
  },
  {
    title: "零售价",
    dataIndex: "price"
  },
  {
    title: "应付单价",
    dataIndex: "payPrice",
    render: (text, record, index) => (
      <span>
        {text}
        {record.isDirect == 0 ? "限时直降" : ""}
      </span>
    )
  },
  {
    title: "应付金额",
    dataIndex: "amount"
  },
  {
    title: "商品实付金额",
    dataIndex: "actualAmount"
  }
];
//详情--处理日志
const handleLogColumns = [
  {
    title: "操作",
    dataIndex: "qerpAction"
  },
  {
    title: "操作时间",
    dataIndex: "createTime"
  },
  {
    title: "操作人",
    dataIndex: "user"
  },
  {
    title: "备注",
    dataIndex: "remark"
  }
];
//详情--赠品信息
const giftSkuColumns=[
  {
    title: "操作",
    dataIndex: "qerpAction"
  },
  {
    title: "操作时间",
    dataIndex: "createTime"
  },
  {
    title: "操作人",
    dataIndex: "user"
  },
  {
    title: "备注",
    dataIndex: "remark"
  }
]
export { Columns, GoodColumns,handleLogColumns,giftSkuColumns };
