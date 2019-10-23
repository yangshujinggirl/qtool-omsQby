import moment from "moment";

const Columns = [
  { title: "销售渠道", dataIndex: "sourceName", key: "1" },
  {
    title: "订单号",
    dataIndex: "orderNo",
    key: "2"
  },
  {
    title: "归属门店",
    dataIndex: "channelName",
    key: "3"
  },
  {
    title: "订单状态",
    dataIndex: "orderStatusStr",
    key: "4"
  },
  {
    title: "收货人",
    dataIndex: "consignee",
    key: "5"
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    key: "6"
  },
  {
    title: "收货地址",
    dataIndex: "address",
    key: "7"
  },
  {
    title: "商品总价",
    dataIndex: "productTotal",
    key: "8"
  },
  {
    title: "优惠金额",
    dataIndex: "discountTotal",
    key: "9"
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
    key: "10",
    render: text => {
      switch (text) {
        case 1:
          return "仓库直邮";
        case 2:
          return "保税订单";
        case 3:
          return "pos订单";
        case 4:
          return "门店采购";
        case 5:
          return "门店自提";
        case 6:
            return "混合发货";
        default:
          "";
      }
    }
  },
  {
    title: "支付方式",
    dataIndex: "payType",
    key: "11",
    render: (text, record) => {
      switch (text) {
        case 1:
          return "支付宝";
        case 2:
          return "微信";
        case 3:
          return "现金";
        case 4:
          return "会员卡";
        case 5:
          return "混合支付";
        default:
          "";
      }
    }
  },
  {
    title: "支付金额",
    dataIndex: "orderTotal",
    key: "12"
  },
  {
    title: "下单时间",
    dataIndex: "createTime",
    key: "13",
    render: text => {
      return <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>;
    }
  }
];

export default Columns;
