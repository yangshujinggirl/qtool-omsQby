import React, { useEffect, useState } from "react";
import { Card, Form, Radio, Input, Button } from "antd";
import { Qtable } from "common";
import { AbnormalGoods } from "./columns";
import {
  getInfoApi,
  handelAbnormalApi
} from "api/home/OrderCenter/AbnormalOrder";
const TextArea = Input.TextArea;

const AuditReturnInfo = props => {
  const [form] = Form.useForm()
  const [infos,setInfos] = useState({});
  const [detailList,setDetailList] = useState([]);
  const { id } = props.match.params;
  useEffect(() => {
    getInfoApi({ orderNo: id }).then(res => {
      if (res.httpCode == 200) {
        setInfos(res.result)
        setDetailList(res.result.detailList)
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
        props.history.push("/account/subscriber_refund_orders");
      }
    });
  };
  console.log(infos)
  return (
    <div>
      <Card title="订单信息" className="base_info">
        <Form.Item label="订单号">{infos.id}</Form.Item>
        <Form.Item label="关联门店">{infos.channelName}</Form.Item>
        <Form.Item label="下单人">{infos.consignee}</Form.Item>
        <Form.Item label="手机号">{infos.phone}</Form.Item>
        <Form.Item label="商品数量">{infos.itemCount}</Form.Item>
        <Form.Item label="实付金额">{infos.orderTotal}</Form.Item>
        <Form.Item label="订单类型">
          {sortStr}
        </Form.Item>
        <Form.Item label="异常原因">{infos.abnormalCause}</Form.Item>
        <Form.Item label="收货人">{infos.consignee}</Form.Item>
        <Form.Item label="联系电话">{infos.phone}</Form.Item>
        <Form.Item label="收货地址">{infos.address}</Form.Item>
      </Card>
      <Card title="订单商品">
        <Qtable columns={AbnormalGoods} dataSource={detailList} />
      </Card>
      <Card title="异常处理">
        <Form form={form}>
          <Form.Item name='cancelReasons' label="取消原因">
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
