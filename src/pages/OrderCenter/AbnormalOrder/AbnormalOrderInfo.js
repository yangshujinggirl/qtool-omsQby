import React, { useEffect, useState } from "react";
import { Card, Form, Radio, Input } from "antd";
import { Qtable } from "common";
import { AbnormalGoods } from "./columns";
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
        <Form.Item label="订单号">{infos.id}</Form.Item>
        <Form.Item label="关联门店">{infos.channelName}</Form.Item>
        <Form.Item label="下单人">{infos.g}</Form.Item>
        <Form.Item label="手机号">{infos.phone}</Form.Item>
        <Form.Item label="商品数量">{infos.itemCount}</Form.Item>
        <Form.Item label="实付金额">{infos.orderTotal}</Form.Item>
        <Form.Item label="订单类型">
          {infos.sort == 1 ? "门店采购单" : infos.sort == 2 ? "用户订单" : ""}
        </Form.Item>
        <Form.Item label="异常原因">{infos.abnormalCause}</Form.Item>
        <Form.Item label="收货人">{infos.consignee}</Form.Item>
        <Form.Item label="联系电话">{infos.phone}</Form.Item>
        <Form.Item label="收货地址">{infos.address}</Form.Item>
      </Card>
      <Card title="订单商品">
        <Qtable columns={AbnormalGoods} dataSource={detailList} />
      </Card>
      <Card title="异常审核">
        <Form>
          <Form.Item label="取消原因">
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
