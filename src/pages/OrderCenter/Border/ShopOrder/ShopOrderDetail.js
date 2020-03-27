import React, {useEffect, useState} from 'react'
import {Card, Modal, Form, Col} from "antd";
import {Qbtn, QbaseInfo, Qtable} from "common";
import moment from "moment";
import { GetOrderInfoApi } from "api/home/OrderCenter/Border/ShopOrder";
import { OrderLogsColumns, GoodsColumns, ShippingInformationColumns } from "./column/";

const ShopOrderDetail = (props) => {
  const [totalData, setDataInfo] = useState({});
  const [orderLogs, setOrderLogs] = useState([]);
  const [outList, setOutList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const orderNo = props.match.params.id;

  const getInfo=()=> {
    GetOrderInfoApi(orderNo)
    .then((res)=> {
      console.log(res);
    })
  }
  //返回
  const goReturn=()=> {
    props.history.push('/account/channel_orders')
  }

  useEffect(() => { getInfo() }, []);
  return (
      <div className="oms-common-addEdit-pages bgood_add">
          <Card title="门店订单信息">
            <QbaseInfo
              dataInfo={[
                {key:'订单号',value:totalData.orderNo},
                {key:'下单门店',value:totalData.procurementTarget},
                {key:'订单状态',value:totalData.statusStr},
                {key:'商品数量',value:totalData.warehouseName},
                {key:'订单金额',value:totalData.statusStr},
                {key:'订单标签',value:totalData.stepStr},
                {key:'下单原因',value:totalData.createTypeStr},
                {key:'订单创建人',value:totalData.itemCount},
                {key:'创建时间',value:totalData.createTime},
                {key:'订单备注',value:totalData.remark},
                {key:'对应配货单',value:totalData.dataInfowsOrderNos},
              ]}/>
          </Card>
          <Card title="订购商品">
              <Qtable columns={GoodsColumns} dataSource={goodsList}/>
          </Card>
          <Card title="收货信息">
            <QbaseInfo
              dataInfo={[
                {key:'收货人',value:totalData.dataInfowsOrderNos},
                {key:'联系电话',value:totalData.recTel},
                {key:'收货地址',value:totalData.recAddress},
              ]}/>
          </Card>
          <Card title="发货信息">
              <Qtable columns={ShippingInformationColumns} dataSource={outList}/>
          </Card>
          <Card title="订单日志">
              <Qtable columns={OrderLogsColumns} dataSource={orderLogs}/>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}>
              返回
            </Qbtn>
          </div>

      </div>
  )
};
export default ShopOrderDetail