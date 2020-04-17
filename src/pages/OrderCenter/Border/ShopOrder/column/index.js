import { Form,Input } from 'antd';
import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";

const Columns = [
    {
        title: "订单号",
        dataIndex: "orderNo",
        render: (text, record) => (
            <Link to={`/account/channel_orders/detail/${record.orderNo}`}>{text}</Link>
        )
    },
    {title: "下单门店", dataIndex: "shopName"},
    {title: "商品数量", dataIndex: "qtySum"},
    {title: "订单金额", dataIndex: "amountSum"},
    {title: "订单状态", dataIndex: "statusStr"},
    {title: "订单来源", dataIndex: "sourceName"},
    {
      title: "订单标签",
      render:(text,record,index)=> {
        return<span>
          {record.preSellStatus==1&&"预售"}&nbsp;
          {record.sendType==2&&"代发"}
        </span>
      }
    },
    {title: "收货人", dataIndex: "recName"},
    {title: "创建人", dataIndex: "userName"},
    {
      title: "发货时间",
      dataIndex: "createTime",
      render: text => <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "操作",
      dataIndex: "action",
      render:(text,record,index)=> {
        return (
          <span>
            {
              record.status==10&&
              <span className="pointerSty" onClick={() => record.onOperateClick('cancel')}>
                取消订单
              </span>
            }
        </span>
        )
      }
    }
];
const ColumnsAdd=(onBlur)=>{
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
                                { pattern:/^[1-9]+(\d*)$/,message:'请输入正整数' },
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
    {title: "操作", dataIndex: "operateName"},
    {
      title: "操作时间",
      dataIndex: "operateTime",
      render: (text) => (
          <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      )
    },
    {title: "订单状态", dataIndex: "statusStr"},
    {title: "操作人", dataIndex: "operateUser"},
    {title: "备注", dataIndex: "remark"},
];
const GoodsColumns = [
    {title: "SKU编码", dataIndex: "skuCode", key: "1"},
    {title: "商品名称", dataIndex: "productName", key: "2"},
    {title: "商品规格", dataIndex: "salesAttributeName", key: "3"},
    {title: "订购数量", dataIndex: "qty", key: "4"},
    {title: "订购单价", dataIndex: "price", key: "5"},
    {title: "门店总价", dataIndex: "allAmount", key: "6"},
];
const ShippingInformationColumns = [

    {title: "物流/快递单号", dataIndex: "trackingNumber"},
    {title: "物流/快递公司", dataIndex: "carrier"},
    {title: "运费", dataIndex: "freightPrice"},
    {title: "状态 ", dataIndex: "status"},
];
const ColumnsReturnAdd=(handleBlur)=> {
  return [{
            title: 'SKU编码',
            dataIndex: 'skuCode',
          },{
            title: '商品名称',
            dataIndex: 'name',
          },{
            title: '商品规格',
            dataIndex: 'salesAttributeName',
          },{
            title: '可退数量',
            dataIndex: 'qty',
          },{
            title: '退货数量',
            dataIndex: 'returnQty',
            width:"150px",
            render: (text, record, index) => {
              const validateQty=(rule,value)=> {
                if(value){
                  if(Number(value) > Number( record.qty )){
                      return Promise.reject('退货数量不可大于可退数量');
                  };
                };
                return Promise.resolve();
              };
              return (
                  <Form.Item
                    name={['list',index,'returnQty']}
                    rules={[{ required: true, message: '请输入订购数量'},
                        { pattern:/^[1-9]+(\d*)$/,message:'请输入正整数' },
                        {validator:validateQty}
                    ]}>
                    <Input placeholder="退货数量" onBlur={(e)=>handleBlur(e, index)}/>
                  </Form.Item>
              );
            }
          },{
              title: '商品单价',
              dataIndex: 'price',
              width:"150px"
          },{
              title: '金额小计',
              dataIndex: 'amount',
              width:"150px"
          }];
}
export {
   ColumnsAdd,Columns,
   OrderLogsColumns,GoodsColumns,ShippingInformationColumns,
   ColumnsReturnAdd
}
