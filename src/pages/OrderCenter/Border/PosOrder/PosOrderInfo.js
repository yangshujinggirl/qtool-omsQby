import React, { useEffect, useState } from "react";
import { Card, Form, Radio, Input, Button } from "antd";
import { Qtable } from "common";
import { DetailGoods } from "./columns";
import {
  getInfoApi,
  handelAbnormalApi
} from "api/home/OrderCenter/AbnormalOrder";

const AuditReturnInfo = props => {
  const [form] = Form.useForm();
  const [spOrder, setInfos] = useState({});
  const [detailList, setDetailList] = useState([]);
  const { id } = props.match.params;
  useEffect(() => {
    getInfoApi({ orderNo: id }).then(res => {
      if (res.httpCode == 200) {
        setInfos(res.result);
        setDetailList(res.result.detailList);
      }
    });
  }, []);
  /**
   * 提交
   */
  const handleSubmit = async () => {
    const values = await form.vaildateFields();
    values.operation = 2;
    values.orderNo = id;
    handelAbnormalApi(values).then(res => {
      if (res.httpCode == 200) {
        props.history.push("/account/orderPos");
      }
    });
  };
  return (
    <div>
      <Card title="订单信息" className="base_info">
        <Form.Item label="门店名称">{spOrder.spShopName}</Form.Item>
        <Form.Item label="销售订单">{spOrder.orderNo}</Form.Item>
        <Form.Item label="销售时间">{spOrder.createTime}</Form.Item>
        <Form.Item label="销售员">{spOrder.operator}</Form.Item>
        <Form.Item label="抹零优惠">{spOrder.cutAmount}</Form.Item>
        <Form.Item label="优惠券抵扣">{spOrder.couponMoney}</Form.Item>
        <Form.Item label="优惠券批次号">{spOrder.couponCode}</Form.Item>
        <Form.Item label="结算收银">
          {spOrder.pays.length < 2 ? (
            <span>
              {spOrder.payAmount +
                "（" +
                spOrder.pays[0].typeStr +
                ":" +
                spOrder.pays[0].amount +
                "）"}
            </span>
          ) : (
            <span>
              {spOrder.payAmount +
                "（" +
                spOrder.pays[0].typeStr +
                "" +
                spOrder.pays[0].amount +
                "  " +
                spOrder.pays[1].typeStr +
                ":" +
                spOrder.pays[1].amount +
                "）"}
            </span>
          )}
        </Form.Item>
        <Form.Item label="银联MIS">{spOrder.mispayAmount}</Form.Item>
        <Form.Item label="扫码支付">{spOrder.scanQr}</Form.Item>
        {spOrder.mbCardMobile && spOrder.mbCardName && (
          <React.Fragment>
            <Form.Item label="会员姓名">{spOrder.mbCardName}</Form.Item>
            <Form.Item label="会员电话">{spOrder.mbCardMobile}</Form.Item>
            <Form.Item label="本次积分">{spOrder.orderPoint}</Form.Item>
          </React.Fragment>
        )}
      </Card>
      <Card title="订单商品">
        <Qtable columns={DetailGoods} dataSource={detailList} />
      </Card>
    </div>
  );
};
export default AuditReturnInfo;
