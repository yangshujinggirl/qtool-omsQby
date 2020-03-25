import { useEffect } from "react";
import { Modal, Form, Input, Select,Radio } from "antd";
const FormItem = Form.Item;
import { getInfoApi } from "api/home/StockCenter/StoreManage";
const Option = Select.Option;
const TextArea = Input.TextArea;

const AddStoreModal=(props)=> {
  const [form] = Form.useForm()
  const {id,onOk,onCancel,visible} = props;
  useEffect(()=>{
    if(id){
        getInfoApi({id}).then(res=>{
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
    if(id){
      values.id = id
    };
    onOk(values, clearForm);
  };
  const cancel = () => {
    onCancel(clearForm);
  };
    return (
      <div>
        <Modal
          title={id?'修改仓库':'新建仓库'}
          visible={visible}
          onOk={ok}
          onCancel={cancel}
        >
          <Form form={form}>
            <FormItem
              label="仓库名称"
              name="warehouseName"
              rules={[
                { required: true, message: "请输入仓库名称，15字以内" }
              ]}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                maxLength="15"
                placeholder="请输入仓库名称，15字以内"
                autoComplete="off"
              />
            </FormItem>
            <FormItem
              label="C端显示名称"
              name="displayNameC"
              rules={[
                { required: true, message: "请输入C端显示名称，15字以内" }
              ]}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                maxLength="15"
                placeholder="请输入C端显示名称，15字以内"
                autoComplete="off"
              />
            </FormItem>
            <FormItem
              label="C端配送说明"
              name="distributionDescribeC"
              rules={[
                { required: true, message: "请输入C端配送说明，20字以内" }
              ]}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                maxLength="15"
                placeholder="请输入C端配送说明，20字以内"
                autoComplete="off"
              />
            </FormItem>
            <FormItem
              label="推送平台"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              name="pushPlatform"
              rules={[{ required: true, message: "请选择推送平台" }]}
            >
              <Radio.Group
                allowClear={true}
                placeholder="请选择推送平台"
              >
                <Radio value={2}>管易</Radio>
                <Radio value={3}>丰趣</Radio>
                <Radio value={1}>无</Radio>
                <Radio value={4}>芳星</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem
              label="出货方式"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              name="departureType"
              rules={[{ required: true, message: "请选择出货方式" }]}
            >
              <Select
                allowClear={true}
                placeholder="请选择出货方式"
              >
                <Option value={1}>保税仓发货</Option>
                <Option value={2}>海外直邮</Option>
                <Option value={3}>虚拟发货</Option>
              </Select>
            </FormItem>
            <FormItem
              label="状态"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
              name="warehouseStatus"
              rules={[{ required: true, message: "请选择状态" }]}
            >
              <Select
                allowClear={true}
                placeholder="请选择状态"
              >
                <Option value={1}>启用</Option>
                <Option value={2}>禁用</Option>
              </Select>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
}
export default AddStoreModal;
