import React, { useState,useEffect } from "react";
import { Card, Form } from "antd";
import { Qtable } from "common";
import Utils from 'utils/CommonUtils'
import {
  GoodColumns,
  SubOrderColumns,
  ExpressColumns,
  OrderLogsColumns,
  HangzhouClearLogsColumns
} from "./columns";
import { getBonedInfoApi } from "api/home/OrderCenter/Corder/UserOrder";

/**
 * 保税订单详情
 * @param {*} props 
 */
console.log(GoodColumns)
const BondedOrderInfo = props => {
  const [orderInfo, setOrderInfo] = useState({});
  const [receiveInfo, setReceiveInfo] = useState({});
  const [skuList, setSkuList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [expressInfo, setExpressInfo] = useState([]);
  const [orderOperateLogList, setOrderOperateLogList] = useState([]);
  const [otherOperateLogList, setOtherOperateLogList] = useState([]);
  const {id} = props.match.params;
  useEffect(() => {
    getBonedInfoApi({ orderNo: id }).then(res => {
      if (res.httpCode == 200) {
        const {
          orderInfo,
          receiveInfo,
          skuList,
          packageList,
          expressInfo,
          orderOperateLogList,
          otherOperateLogList
        } = res.result;
        setOrderInfo(orderInfo);
        setReceiveInfo(receiveInfo);
        setSkuList(Utils.addKey(skuList));
        setPackageList(packageList);
        setExpressInfo(expressInfo);
        setOrderOperateLogList(Utils.addKey(orderOperateLogList));
        setOtherOperateLogList(otherOperateLogList);
      }
    });
  }, []);
  console.log(orderOperateLogList)
  return (
    <div>
      <Card title="订单信息" className="base_info">
        <Form.Item label="订单号">{orderInfo.orderNo}</Form.Item>
        <Form.Item label="下单时间">{orderInfo.createTimeStr}</Form.Item>
        <Form.Item label="订单状态">{orderInfo.orderStatusStr}</Form.Item>
        <Form.Item label="归属门店">{orderInfo.deliveryTypeStr}</Form.Item>
        <Form.Item label="订单金额">{orderInfo.orderAmount}</Form.Item>
        <Form.Item label="优惠金额">{orderInfo.discountAmount}</Form.Item>
        <Form.Item label="优惠券">{orderInfo.couponAmount}</Form.Item>
        <Form.Item label="优惠券批次号">{orderInfo.couponCode}</Form.Item>
        <Form.Item label="来源">{orderInfo.appVersion}</Form.Item>
      </Card>

      <Card title="收货信息" className="base_info">
        <Form.Item label="姓名">{receiveInfo.nickname}</Form.Item>
        <Form.Item label="身份证号">{receiveInfo.idCardFrontPic}</Form.Item>
        <Form.Item label="收货人">{receiveInfo.receiveUserName}</Form.Item>
        <Form.Item label="收货电话">{receiveInfo.receiveUserMobile}</Form.Item>
        <Form.Item label="收货地址">{receiveInfo.receiveUserMobile}</Form.Item>
      </Card>

      <Card title="商品信息">
        <Qtable columns={GoodColumns} dataSource={skuList} />
      </Card>

      {packageList.length>0 &&
        packageList.map((item, index) => (
          <Card title={`子单${index + 1}信息`} className="base_info">
            <div>
              <div>
                <Form.Item label="子单号">{orderInfo.appVersion}</Form.Item>
                <Form.Item label="保税仓">{orderInfo.appVersion}</Form.Item>
                <Form.Item label="子单状态">{orderInfo.appVersion}</Form.Item>
              </div>
              <Qtable columns={SubOrderColumns} dataSource={skuList} />
            </div>
          </Card>
        ))}

      <Card title="物流信息">
        <Qtable columns={ExpressColumns} dataSource={expressInfo} />
      </Card>

      <Card title="订单日志">
        <Qtable columns={OrderLogsColumns} dataSource={orderOperateLogList} />
      </Card>

      <Card title="杭州仓审核日志">
        <Qtable columns={HangzhouClearLogsColumns} dataSource={skuList} />
      </Card>

      {otherOperateLogList.length>0&&
        otherOperateLogList.map((item, index) => (
          <Card title={`${item.titleName}（子单${index + 1}）`}>
            <Qtable columns={HangzhouClearLogsColumns} dataSource={item.operateLogList} />
          </Card>
        ))}
    </div>
  );
};
export default BondedOrderInfo;
