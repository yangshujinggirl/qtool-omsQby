import React, { useEffect, useState } from "react";
import { Card, Form, Radio, Input } from "antd";
import { Qtable } from "common";
import { AbnormalGoods } from "./columns";
import {
  getInfoApi,
  operateReturnApi
} from "api/home/OrderCenter/AbnormalOrder";
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
    operateReturnApi().then(res => {
      if (res.httpCode == 200) {
        props.history.push("/account/subscriber_refund_orders");
      }
    });
  };
  return (
    <div>
      <Card title="退单信息" className="base_info">
        <Form.Item  label="订单号">{infos.id}</Form.Item >
        <Form.Item  label="关联门店">{infos.channelName}</Form.Item >
        <Form.Item  label="下单人">{infos.g}</Form.Item >
        <Form.Item  label="手机号">{infos.phone}</Form.Item >
        <Form.Item  label="商品数量">{infos.itemCount}</Form.Item >
        <Form.Item  label="实付金额">{infos.orderTotal}</Form.Item >
        <Form.Item  label="订单类型">{infos.sort==1?'门店采购单':(infos.sort==2?'用户订单':'')}</Form.Item >
        <Form.Item  label="异常原因">{infos.abnormalCause}</Form.Item >
        <Form.Item  label="收货人">{infos.consignee}</Form.Item >
      <Form.Item  label="联系电话">{infos.phone}</Form.Item >
      <Form.Item  label="收货地址">{infos.address}</Form.Item >
      </Card>
      <Card title="订单商品">
        <Qtable columns={AbnormalGoods} dataSource={detailList} />
      </Card>
      <Card title="异常处理">
        <Form>
          <Form.Item
            name=""
            label="审核结果"
            rules={[{ required: true, message: "请选择审核结果" }]}
          >
            <Radio.Group onChange={onChange}>
              <Radio value={20}>同意退款</Radio>
              <Radio value={99}>拒绝退款</Radio>
            </Radio.Group>
          </Form.Item>
          {type == 1 ? (
            <React.Fragment>
              <Form.Item
                name=""
                label="退款类型"
                rules={[{ required: true, message: "请选择退款类型" }]}
              >
                <Radio.Group>
                  <Radio value={20}>退货退款</Radio>
                  <Radio value={99}>仅退款</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name=""
                label="收货人"
                rules={[{ required: true, message: "请输入收货人" }]}
              >
                <Input placeholder="请输入收货人" autocomplete="off" />
              </Form.Item>
              <Form.Item
                name=""
                label="收货电话"
                rules={[{ required: true, message: "请输入收货电话" }]}
              >
                <Input placeholder="请输入收货电话" autocomplete="off" />
              </Form.Item>
              <Form.Item
                name=""
                label="收货地址"
                rules={[{ required: true, message: "请输入收货地址" }]}
              >
                <Input placeholder="请输入收货地址" autocomplete="off" />
              </Form.Item>
            </React.Fragment>
          ) : (
            <Form.Item
              label="拒绝原因"
              rules={[{ required: true, message: "请输入拒绝原因" }]}
            >
              <TextArea placeholder="拒绝原因将展示给用户，请谨慎填写" />
            </Form.Item>
          )}
          <Form.Item >
            <Button type="primary" size="large" onClick={handleSubmit}>
              提交
            </Button>
          </Form.Item >
        </Form>
      </Card>
    </div>
  );
};
export default AuditReturnInfo;
