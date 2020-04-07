import moment from "moment";
import { Link } from "react-router-dom";
import { Qbtn } from 'common';

const Columns = [
  {
    title: "销售渠道",
    dataIndex: "sourceCode",
  },
  {
    title: "订单号",
    dataIndex: "orderNo"
  },
  {
    title: "异常类型",
    dataIndex: "isReplied",
    render:(record,index,text)=>{
      return <span>缺货异常</span>
    }
  },
  {
    title: "收货人",
    dataIndex: "consignee",
  },
  {
    title: "联系电话",
    dataIndex: "phone",
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
    render:(text,record,index)=>{
      return <span>{!!record.isRe?"是":"否"}</span>
    }
  },
  {
    title: "操作",
    dataIndex: "action",
    render:(text,record,index)=>{
      return <Qbtn size="fixed" onClick={()=>record.onOperateClick()}>人工审核</Qbtn>
    }
  }
];

export default Columns;
