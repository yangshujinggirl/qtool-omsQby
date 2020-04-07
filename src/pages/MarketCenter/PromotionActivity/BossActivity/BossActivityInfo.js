import React, {useEffect, useState} from 'react'
import {Card, Form, Col} from "antd";
import {Qbtn, QbaseInfo, Qtable} from "common";
import moment from "moment";
import { GetInfoApi } from "api/marketCenter/BossActivity";
import { ColumnsLog, ColumnsGoodsInfo } from "./columns";

const Info = (props) => {
  const [totalData, setDataInfo] = useState({});
  const [orderLogs, setOrderLogs] = useState([]);
  const [goodsList, setGoodsList] = useState([]);
  const activityId = props.match.params.id;

  const getInfo=()=> {
    GetInfoApi(activityId)
    .then((res)=> {
      let { activityInfo, goodsInfos } =res.result;
      goodsInfos = goodsInfos?goodsInfos:[];
      goodsInfos.map((el,index)=>el.key=index);
      setDataInfo(activityInfo)
      setGoodsList(goodsInfos)
    })
  }
  useEffect(() => { getInfo() }, []);
  return (
      <div className="oms-common-addEdit-pages bgood_add">
          <Card title="促销信息">
            <QbaseInfo
              dataInfo={[
                {key:'活动编码',value:totalData.no},
                {key:'活动名称',value:totalData.name},
                {key:'活动状态',value:totalData.statusStr},
                {key:'活动时间',value:`${moment(totalData.beginTime).format('YYYY-MM-DD hh:mm')}至${moment(totalData.endTime).format('YYYY-MM-DD hh:mm')}`},
                {key:'创建人',value:totalData.createUser},
                {key:'创建时间',value:`${moment(totalData.createTime).format('YYYY-MM-DD hh:mm')}`},
                {key:'活动备注',value:totalData.remark},
              ]}/>
          </Card>
          <Card title="促销商品">
              <Qtable columns={ColumnsGoodsInfo} dataSource={goodsList}/>
          </Card>
          <Card title="订单日志">
              <Qtable columns={ColumnsLog} dataSource={orderLogs}/>
          </Card>
      </div>
  )
};
export default Info
