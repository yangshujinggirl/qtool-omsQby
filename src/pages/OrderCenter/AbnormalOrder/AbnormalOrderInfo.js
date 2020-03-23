import React, { useEffect, useState } from "react";
import { Card, Form, Radio, Input } from "antd";
import { Qtable } from "common";
import { ReturnGoods } from "./columns";
import {
  getInfoApi,
  handelAbnormalApi
} from "api/home/OrderCenter/Corder/UserReturn/AllReturn";
import moment from "moment";
const TextArea = Input.TextArea;

const AuditReturnInfo = props => {
  let [infos, detailList] = [{}, []];
  const [] = useState("");
  const { id } = props.match.params;
  useEffect(({ reOrderNo: id }) => {
    getInfoApi({ reOrderNo: id }).then(res => {
      if (res.httpCode == 200) {
        infos = res.result;
        detailList = res.result.detailList;
      }
    });
  }, []);
  onChange = () => {};
  /**
   * 提交
   */
  handleSubmit = async () => {
    const values = await form.vaildateFields();
    values.operation = 2;
    values.orderNo = id;
    handelAbnormalApi(values).then(res => {
      if (res.httpCode == 200) {
        props.history.push("/account/subscriber_refund_orders");
      }
    });
  };
  return (
    <div>
      <Card title="退单信息" className="base_info">
        <Form.Item label="退单号">{infos.reOrderNo}</Form.Item>
        <Form.Item label="关联用户订单">{infos.channelOrderNo}</Form.Item>
        <Form.Item label="订单类型">{infos.deliveryTypeStr}</Form.Item>
        <Form.Item label="用户手机号">{infos.phone}</Form.Item>
        <Form.Item label="用户昵称">{infos.subject}</Form.Item>
        <Form.Item label="退款类型">{infos.refundTypeStr}</Form.Item>
        <Form.Item label="退款运费">{infos.sync}</Form.Item>
        <Form.Item label="退款商品金额">{infos.price}</Form.Item>
        <Form.Item label="退款总金额">{infos.refundMoney}</Form.Item>
        <Form.Item label="创建时间">
          {moment(infos.createTime).format("YYYY-MM-DD HH:mm:ss")}
        </Form.Item>
      </Card>
      <Card title="订单商品">
        <Qtable columns={ReturnGoods} dataSource={detailList} />
      </Card>
      <Card title="异常审核">
        <Form>
          <Form.Item
            label="取消原因"
          >
            <TextArea placeholder="请输入取消原因" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" onClick={handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AuditReturnInfo;
