import { Modal, Form, Radio } from 'antd';
import { Qmessage } from 'common';
import { GeAuditApi } from 'api/home/SupplierManage';

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

const AuditModal=({...props})=> {
  const [form] = Form.useForm();
  const { selectedRowKeys } =props;
  const  handleOk= async()=> {
    try {
      let values = await form.validateFields();
      let params ={
        status:values.status,
        supplierList:selectedRowKeys
      }
      GeAuditApi(params)
      .then((res)=> {
        Qmessage.success('审核成功')
        props.onOk();
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const  handleCancel=()=> {
    props.onCancel();
    form.resetFields()
  }
  return <Modal
          title="批量审核"
          getContainer={false}
          visible={props.visible}
          onOk={handleOk}
          onCancel={handleCancel}>
            <Form form={form} {...formItemLayout} initialValues={{status:1}}>
              <Form.Item label="批量审核数">{selectedRowKeys.length}</Form.Item>
              <Form.Item label="审核结果" name="status">
                <Radio.Group>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>不通过</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
}

export default AuditModal;
