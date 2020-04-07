import moment from "moment";
import { Link } from "react-router-dom";
import { isRepliedOption } from '../optionMap';

const Columns = [
  {
    title: "订单号",
    dataIndex: "orderNo",
  },
  {
    title: "sku",
    dataIndex: "skuCode"
  },
  {
    title: "商品名",
    dataIndex: "productName",
  },
  {
    title: "异常类型",
    dataIndex: "isReplied",
    render:(record,index,text)=>{
      return <span>缺货异常</span>
    }
  },
  {
    title: "订单状态",
    render:(record,index,text)=> {
      return<span>{
        isRepliedOption.map((el)=>(
          <span key={el.key}>{el.key==record.isReplied&&el.value}</span>
        ))
      }</span>
    }
  },
  {
    title: "收货人",
    dataIndex: "consignee",
  },
  {
    title: "收货地址",
    dataIndex: "address",
  },
  {
    title: "订单价格",
    dataIndex: "orderTotal",
  },
  {
    title: "下单时间",
    dataIndex: "channelOrderCreateTime",
    render:(record,index,text)=>{
      return <span>{moment(record.channelOrderCreateTime).format("YYYY-MM-DD H:ss:mm")}</span>
    }
  },
  {
    title: "是否退换货",
    dataIndex: "isRe",
    render:(record,index,text)=>{
      return <span>{!!record.isRe?"是":"否"}</span>
    }
  }
];

export default Columns;
