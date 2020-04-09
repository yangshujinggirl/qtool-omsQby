import { useState, useEffect } from "react";
import { Modal, Form, Radio } from "antd";
import { PushPurchaseInOrderBatchReview } from "api/home/OrderCenter/PurchaseOrder/PurchaseIn";
import { deBounce } from "utils/tools";
const FormItem = Form.Item;

const AuditModal = (props) => {
  const [form] = Form.useForm();
  const { stockingCode, visible } = props;
  useEffect(() => {
    form.setFields({status:null});
  },[]);
  //审核通过、不通过
  const onOk = deBounce(async () => {
    const values = await form.validateFields();
    values.stockingCodeList = [stockingCode];
    PushPurchaseInOrderBatchReview(values).then((res) => {
      if (res.httpCode == 200) {
        props.onClear();
      }
    });
  }, 500);
  return (
    <div>
      <Modal
        title="采购单审核"
        visible={visible}
        onOk={onOk}
        onCancel={() => props.onClear()}
      >
        <Form form={form}>
          <FormItem
            label="采购单号"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {stockingCode}
          </FormItem>
          <FormItem
            label="审核结果"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            name="status"
            rules={[{ required: true, message: "请选择审核结果" }]}
          >
            <Radio.Group>
                <Radio value={2}>通过</Radio>
                <Radio value={3}>不通过</Radio>
            </Radio.Group>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
export default AuditModal;
