import moment from "moment";
import { Link } from "react-router-dom";

const Columns = [
  {
    title: "采购单名称",
    dataIndex: "name",
  },
  {
    title: "采购单号",
    dataIndex: "stockingCode"
  },
  {
    title: "供应商名",
    dataIndex: "suppliersName",
  },
  {
    title: "采购总价",
    dataIndex: "priceTotal",
  },
  {
    title: "总数量",
    dataIndex: "itemCount",
  },
  {
    title: "采购员",
    dataIndex: "user",
  },
  {
    title: "申请时间",
    dataIndex: "createTime",
    render:(record,index,text)=>{
      return <span>{moment(record.createTime).format("YYYY-MM-DD H:ss:mm")}</span>
    }
  }
];

export  { Columns };
