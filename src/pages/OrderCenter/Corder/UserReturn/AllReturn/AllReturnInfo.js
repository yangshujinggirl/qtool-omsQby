import React, { useEffect,useState } from "react";
import { Card, Form } from "antd";
import { Qtable } from "common";
import { ReturnGoods, ReturnLogs } from "./columns";
import { getInfoApi } from "api/home/OrderCenter/Corder/UserReturn/AllReturn";
import moment from "moment";

const AllReturnInfo = props => {
  
  const {id} = props.match.params;
  const [infos,setInfos] =useState({})
  const [detailList,setDetailList] =useState([])
  useEffect(() => {
    getInfoApi({reOrderNo:id}).then(res => {
      if (res.httpCode == 200) {
        setInfos(res.result);
        setDetailList( res.result.detailList)
      }
    });
  }, []);
  return (
    <div>
      <Card title="退单信息" className='base_info'>
        <Form.Item  label="退单号">{infos.reOrderNo}</Form.Item >
        <Form.Item  label="关联用户订单">{infos.channelOrderNo}</Form.Item >
        <Form.Item  label="订单类型">{infos.deliveryTypeStr}</Form.Item >
        <Form.Item  label="用户手机号">{infos.phone}</Form.Item >
        <Form.Item  label="用户昵称">{infos.subject}</Form.Item >
        <Form.Item  label="退单状态">{infos.statusStr}</Form.Item >
        <Form.Item  label="退款类型">{infos.refundTypeStr}</Form.Item >
        <Form.Item  label="退款方式">{infos.inventedStr}</Form.Item >
        <Form.Item  label="退款运费">{infos.sync}</Form.Item >
        <Form.Item  label="退款商品金额">{infos.price}</Form.Item >
        <Form.Item  label="退款总金额">{infos.refundMoney}</Form.Item >
        <Form.Item  label="原订单实付金额">{infos.totalPrice}</Form.Item >
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
        <Qtable columns={ReturnLogs} dataSource={detailList} />
      </Card>
    </div>
  );
};
export default AllReturnInfo;
