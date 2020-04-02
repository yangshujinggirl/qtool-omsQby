import { useState, useEffect } from "react";
import { Modal, Input, Select, message, Form } from "antd";
import { AddAtrApi, UpdataAtrApi } from "api/home/Attributions";
const FormItem = Form.Item;
const Option = Select.Option;

const AddAtr = props => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  /**
   * 初始化
   */
  useEffect(() => {
    form.setFieldsValue(props);
  }, []);
  /**
   * 清除表单
   */
  const clearForm = () => {
    form.resetFields();
  };
  /**
   * 确认
   */
  const onOk = async () => {
    const values = await form.validateFields();
    setConfirmLoading(true);
    const { attributeId } = props;
    if (attributeId) {
      //修改
      UpdataAtrApi({ id: attributeId, ...values })
        .then(res => {
          if (res.httpCode == 200) {
            message.success("保存成功", 0.8);
            props.onOk(clearForm);
          }
          setConfirmLoading(false);
        })
        .catch(error => {
          setConfirmLoading(false);
        });
    } else {
      //新增
      AddAtrApi(values)
        .then(res => {
          if (res.httpCode == 200) {
            message.success("保存成功", 0.8);
            props.onOk(clearForm);
          }
          setConfirmLoading(false);
        })
        .catch(error => {
          setConfirmLoading(false);
        });
    }
  };
  /**
   * 取消
   */
  const onCancel = () => {
    props.onCancel(clearForm);
  };
  const { attributeId, visible } = props;
  console.log(attributeId);
  return (
    <div>
      <Modal
        title={attributeId ? "编辑规格" : "新增规格"}
        confirmLoading={confirmLoading}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form}>
          <FormItem
            label="规格名称"
            name="attributeName"
            rules={[{ required: true, message: "请输入规格名称" }]}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            <Input placeholder="请输入规格名称,5字之内" maxLength={5} autoComplete="off" />
          </FormItem>
          <FormItem
            label="状态"
            name="attributeState"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select
              allowClear={true}
              placeholder="请选择状态"
              className="select"
            >
              <Option value={0}>禁用</Option>
              <Option value={1}>启用</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
export default AddAtr;
