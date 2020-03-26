import { Form,Input } from 'antd';
import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";

const Columns = [
    {
        title: "订单号",
        dataIndex: "orderNo",
        key: "1",
        render: (text, record) => (
            <Link to={`/account/channel_orders/detail/${record.orderNo}`}>{text}</Link>
        )
    },
    {title: "下单门店", dataIndex: "shopName", key: "2"},
    {title: "商品数量", dataIndex: "qtySum", key: "3"},
    {title: "订单金额", dataIndex: "amountSum", key: "4"},
    {title: "订单状态", dataIndex: "statusStr", key: "5"},
    {title: "订单来源", dataIndex: "sourceName", key: "6"},
    {title: "订单标签", dataIndex: "sourceName", key: "7"},
    {title: "收货人", dataIndex: "recName", key: "8"},
    {title: "创建人", dataIndex: "userName", key: "9"},
    {
        title: "发货时间",
        key: "10",
        dataIndex: "createTime",
        render: text => <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    }
];
const columnsAdd=(onBlur)=>{
  return [{
            title: "sku编码",
            dataIndex: "code",
            width:140,
            render:(text,record,index)=> {
              return  <Form.Item
                        name={['list',index,'skuCode']}
                        rules={[{ required: true, message: '请输入sku编码'}]}>
                        <Input
                          key={index}
                          onBlur={(e)=>onBlur(e,index,'code')}/>
                      </Form.Item>
            }
          },{
            title: "订购数量",
            dataIndex: "qty",
            width:140,
            render:(text,record,index)=> {
              return  <Form.Item
                          name={['list',index,'qty']}
                          rules={[{ required: true, message: '请输入订购数量'},
                                { pattern:/^[1-9]+$/,message:'请输入正整数' },
                          ]}>
                        <Input
                          onBlur={(e)=>onBlur(e,index,'qty')}
                          key={index}/>
                      </Form.Item>
            }
          },{
            title: "商品名称",
            dataIndex: "productName",
            textWrap: 'word-break',
          },{
            title: "商品规格",
            dataIndex: "salesAttributeName",
            textWrap: 'word-break',
          },{
            title: "B端售价",
            dataIndex: "businessPrice",
            textWrap: 'word-break',
          },{
            title: "金额小计",
            textWrap: 'word-break',
            dataIndex: "amount",
          }]
};
const OrderLogsColumns = [
    {title: "操作", dataIndex: "operateName", key: "1"},
    {
      title: "操作时间",
      dataIndex: "operateTime",
      key: "2",
      render: (text) => (
          <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      )
    },
    {title: "订单状态", dataIndex: "statusVal", key: "3"},
    {title: "操作人", dataIndex: "operateUser", key: "4"},
    {title: "备注", dataIndex: "remark", key: "5"},
];
const GoodsColumns = [
    {title: "SKU编码", dataIndex: "spuCode", key: "1"},
    {title: "商品名称", dataIndex: "spuName", key: "2"},
    {title: "商品规格", dataIndex: "pdSkuType", key: "3"},
    {title: "订购数量", dataIndex: "qty", key: "4"},
    {title: "订购单价", dataIndex: "retailPrice", key: "5"},
    {title: "门店总价", dataIndex: "amount", key: "6"},
];
const ShippingInformationColumns = [

    {title: "物流/快递单号", dataIndex: "expressCode", key: "1"},
    {title: "物流/快递公司", dataIndex: "expressCompany", key: "3"},
    {title: "运费", dataIndex: "expressFee", key: "4"},
    {title: "状态 ", dataIndex: "status", key: "5"},
];
export {
   columnsAdd,Columns,OrderLogsColumns,GoodsColumns,ShippingInformationColumns
}
