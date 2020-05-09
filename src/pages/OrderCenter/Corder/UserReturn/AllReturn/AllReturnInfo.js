import React, { useEffect,useState } from "react";
import { Card, Form } from "antd";
import { Qtable } from "common";
import { ReturnGoods, ReturnLogs } from "./columns";
import { getInfoApi,getLogApi } from "api/home/OrderCenter/Corder/UserReturn/AllReturn";
import moment from "moment";

const AllReturnInfo = props => {
  
  const {id} = props.match.params;
  const [infos,setInfos] =useState({})
  const [detailList,setDetailList] =useState([])
  const [logosList,setLogos] =useState([])
  useEffect(() => {
    getInfoApi({reOrderNo:id}).then(res => {
      if (res.httpCode == 200) {
        setInfos(res.result);
        setDetailList( res.result.detailList)
      }
    });
    getLogo()
  }, []);
  //获取日志
  const getLogo=()=>{
    getLogApi({no:id}).then(res=>{
      if(res.httpCode == 200){
        setLogos(res.result)
      }
    })
  }
  return (
    <div>
      <Card title="退单信息" className='base_info'>
        <Form.Item  label="退单号">{infos.reOrderNo}</Form.Item >
        <Form.Item  label="关联用户订单">{infos.channelOrderNo}</Form.Item >
        <Form.Item  label="订单类型">{infos.deliveryTypeStr}</Form.Item >
        <Form.Item  label="用户手机号">{infos.phone}</Form.Item >
        <Form.Item  label="退单状态">{infos.statusStr}</Form.Item >
        <Form.Item  label="退款类型">{infos.refundTypeStr}</Form.Item >
        <Form.Item  label="退款方式">{infos.typeStr}</Form.Item >
        <Form.Item  label="退款运费">{infos.rePostage}</Form.Item >
        <Form.Item  label="退款商品金额">{infos.totalPrice}</Form.Item >
        <Form.Item  label="退款总金额">{infos.totalPrice}</Form.Item >
        <Form.Item  label="原订单实付金额">{infos.orderTotal}</Form.Item >
        <Form.Item  label="创建时间">
          {infos.createTime&&moment(infos.createTime).format("YYYY-MM-DD HH:mm:ss")}
        </Form.Item >
      </Card>
      <Card title="退货商品">
        <Qtable columns={ReturnGoods} dataSource={detailList} />
      </Card>
      <Card title="退款描述">
        <Form.Item label="退款原因">{infos.reason}</Form.Item>
        <Form.Item label="详细描述">{infos.remarkes}</Form.Item>
        <Form.Item label="图片">
          {infos.imgList &&
            infos.imgList.map(img => (
              <img src={localStorage.getInfoApi("oms_fileDomain") + img} />
            ))}
        </Form.Item>
      </Card>
      <Card title="退单日志">
        <Qtable columns={ReturnLogs} dataSource={logosList} />
      </Card>
    </div>
  );
};
export default AllReturnInfo;
