import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
const FormItem = Form.Item;
import {GetInfoApi} from 'api/home/GoodsCenter/BaseConfig/CgoodsExplain'
const Option = Select.Option;
const TextArea = Input.TextArea;

const ExplainModal=(props)=> {
  const [form] = Form.useForm()
  const {pdExplainId,onOk,onCancel,visible} = props;
  useEffect(()=>{
    if(pdExplainId){
      GetInfoApi({id:pdExplainId}).then(res=>{
        if(res.httpCode == 200){
          form.setFieldsValue(res.result)
        };
      })
    }
  },[])
  const clearForm = () => {
    form.resetFields();
  };
  const ok = async() => {
    const values = await form.validateFields();
    values.name = values.name.trim();
    if(pdExplainId){
      values.pdExplainId = pdExplainId
    }
    onOk(values, clearForm);
  };
  const cancel = () => {
    onCancel(clearForm);
  };
    return (
      <div>
        <Modal
          title={pdExplainId?'修改商品说明':'新建商品说明'}
          visible={visible}
          onOk={ok}
          onCancel={cancel}
        >
          <Form form={form}>
            <FormItem
              label="简称"
              name="name"
              rules={[
                { required: true, message: "请输入请输入简称，15字以内" }
              ]}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                maxLength="15"
                placeholder="请输入请输入简称，15字以内"
                autoComplete="off"
              />
            </FormItem>
            <FormItem
              label="详细说明"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              name="text"
              rules={[{ required: true, message: "请输入详细说明，100字以内" }]}
            >
              <TextArea
                maxLength="100"
                placeholder="请输入详细说明，100字以内"
                autoComplete="off"
              />
            </FormItem>
            <FormItem
              label="权重"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              name="rank"
              rules={[
                {
                  pattern: /^(?:[0-9]{0,2}|100)$/,
                  message: "请输入0-100整数"
                },
                {
                  required: true,
                  message: "请输入0-100整数，数值越大权重越高"
                }
              ]}
            >
              <Input
                maxLength="15"
                placeholder="请输入0-100整数，数值越大权重越高"
                autoComplete="off"
              />
            </FormItem>
            <FormItem
              label="状态"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              name="status"
              rules={[{ required: true, message: "请选择状态" }]}
            >
              <Select
                allowClear={true}
                placeholder="请选择状态"
                className="select"
              >
                <Option value={1}>启用</Option>
                <Option value={0}>禁用</Option>
              </Select>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
}
export default ExplainModal;
