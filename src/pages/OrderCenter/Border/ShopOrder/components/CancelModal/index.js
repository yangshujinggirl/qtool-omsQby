import { Modal, Input, Form } from 'antd';
import { Qmessage } from 'common'
import { GetCancelApi } from "api/home/OrderCenter/Border/ShopOrder";

const CancelModal = ({...props})=> {
  const [form] = Form.useForm();
  const  handleOk= async()=> {
    try {
      let values = await form.validateFields();
      GetCancelApi({ spOrderId: props.currentItem.spOrderId, ...values })
      .then((res)=> {
        Qmessage.success('取消成功');
        props.onOk();
        form.resetFields();
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const handleCancel=()=> {
    form.resetFields();
    props.onCancel()
  }
  return(
    <Modal
      forceRender={true}
       getContainer={false}
       title="取消订单"
       visible={props.visible}
       onOk={handleOk}
       onCancel={handleCancel}>
       <Form form={form}>
         <Form.Item
           name="reason"
           label="取消原因"
           rules={[{required: true,message:'请输入取消原因'}]}>
              <Input placeholder="请输入取消原因" autoComplete="off"/>
         </Form.Item>
       </Form>
    </Modal>
  )
}

export default CancelModal;
