import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
const FormItem = Form.Item;
import { auditWithdraw } from "api/home/FinancialCenter/Withdraw";
import {deBounce} from 'utils/tools'

const AuditModal = (props) => {
  const [form] = Form.useForm();
  const { spCarryCashId, shopName, amount, visible } = props;
  const [checkStatus, setCheckStatus] = useState(false);
  const clearForm = () => {
    form.resetFields();
  };
  //审核通过、不通过
  const handlePass = deBounce(async (status) => {
    if (status == 2) {
      setCheckStatus(true);
    }
    const values = await form.validateFields();
    values.spCarryCashId = spCarryCashId;
    values.status = status;
    values.status = 1;
    values.shopName=shopName;
    auditWithdraw(values)
      .then((res) => {
        if (res.httpCode == 200) {
          props.onClear(clearForm);
        }
      })
  },500);
  return (
    <div>
      <Modal
        title="提现审核"
        visible={visible}
        footer={[
          <Button key="back" onClick={() => handlePass(2)}>
            审核不通过
          </Button>,
          <Button key="submit" type="primary" onClick={() => handlePass(1)}>
            审核通过
          </Button>,
        ]}
        onCancel={() => props.onClear(clearForm)}
      >
        <Form form={form}>
          <FormItem
            label="提现门店"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {shopName}
          </FormItem>
          <FormItem
            label="提现金额"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {amount}
          </FormItem>
          <FormItem
            label="不通过理由"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            name="remark"
            rules={[{ required: checkStatus, message: "请输入不通过理由" }]}
          >
            <Input placeholder="请输入不通过理由" autoComplete='off'/>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
export default AuditModal;
