import React from "react";
import { Form, Modal, Radio, message } from "antd";
import {
  goAuditApi
} from "api/home/GoodsCenter/BaseConfig/GoodsAudit";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const Audit = (props) => {
  const [form] = Form.useForm();
  const { visible, selectedRowKeys } = props;
  const onOk = async () => {
    const values = await form.validateFields();
    values.examineIds = selectedRowKeys;
    goAuditApi(values).then(res => {
      if (res.httpCode == 200) {
        message.success("审核通过");
        props.onOk();
      }
    });
  };
  const onCancel = () => {
    props.onCancel();
  };

  return (
    <Modal
      title="批量审核"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="提交"
    >
      <Form form={form} {...formItemLayout}>
        <FormItem label="批量审核数" {...formItemLayout}>
          {selectedRowKeys.length}
        </FormItem>
        <FormItem label="审核结果" name="status" rules={[{required:true,message:'请选择'}]}>
          <Radio.Group>
            <Radio value={2}>通过</Radio>
            <Radio value={3}>不通过</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  );
};
export default Audit;
