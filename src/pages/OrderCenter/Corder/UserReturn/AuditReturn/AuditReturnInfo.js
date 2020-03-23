import React, { useEffect, useState } from "react";
import { Card, Form, Radio, Input } from "antd";
import { Qtable } from "common";
import { ReturnGoods } from "./columns";
import {
  getInfoApi,
  operateReturnApi
} from "api/home/OrderCenter/Corder/UserReturn/AllReturn";
const TextArea = Input.TextArea;

const AuditReturnInfo = props => {
  let [infos, detailList] = [{}, []];
  const [status, setStatus] = useState("");
  const { id } = props.match.params;
  useEffect(({ reOrderNo: id }) => {
    getInfoApi({ reOrderNo: id }).then(res => {
      if (res.httpCode == 200) {
        infos = res.result;
        detailList = res.result.detailList;
      }
    });
  }, []);
  onChange = e => {
    setStatus(e.target.value);
  };
  /**
   * 提交
   */
  handleSubmit = async () => {
    const values = await form.vaildateFields();
    values.operation = 1;
    operateReturnApi(values).then(res => {
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
      <Card title="异常处理">
        <Form>
          <Form.Item
            name="status"
            label="审核结果"
            rules={[{ required: true, message: "请选择审核结果" }]}
          >
            <Radio.Group onChange={onChange}>
              <Radio value={20}>同意退款</Radio>
              <Radio value={99}>拒绝退款</Radio>
            </Radio.Group>
          </Form.Item>
          {status == 20 && (
            <React.Fragment>
              <Form.Item
                name="isInvented"
                label="退款类型"
                rules={[{ required: true, message: "请选择退款类型" }]}
              >
                <Radio.Group>
                  <Radio value={false}>退货退款</Radio>
                  <Radio value={true}>仅退款</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="consignee"
                label="收货人"
                rules={[{ required: true, message: "请输入收货人" }]}
              >
                <Input placeholder="请输入收货人" autocomplete="off" />
              </Form.Item>
              <Form.Item
                name="shPhone"
                label="收货电话"
                rules={[{ required: true, message: "请输入收货电话" }]}
              >
                <Input placeholder="请输入收货电话" autocomplete="off" />
              </Form.Item>
              <Form.Item
                name="shAddress"
                label="收货地址"
                rules={[{ required: true, message: "请输入收货地址" }]}
              >
                <Input placeholder="请输入收货地址" autocomplete="off" />
              </Form.Item>
            </React.Fragment>
          )}
          {status == 99 && (
            <Form.Item
              name="refusalReasons"
              label="拒绝原因"
              rules={[{ required: true, message: "请输入拒绝原因" }]}
            >
              <TextArea placeholder="拒绝原因将展示给用户，请谨慎填写" />
            </Form.Item>
          )}
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
