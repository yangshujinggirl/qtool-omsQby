import { Modal, Input, Form } from 'antd';


const AddModal=({...props})=> {
  const validator=(rule, value)=> {
    if(value>20000) {
      return Promise.reject('最多填写20000张');
    }
    return Promise.resolve();
  }
  const handleOk = async() => {
    try {
      let values = await props.form.validateFields(['couponCount']);
      props.onOk(values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  return(
    <Modal
      destroyOnClose={true}
      title="追加数量"
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}>
        <Form.Item
          name="couponCount"
          label="追加数量"
          rules={[{ required:true,message:'请输入追加数量'},
          { pattern:/^[1-9]\d*$/,message:'请输入1-20000的正整数'},
          {validator:validator}]}>
            <Input
              placeholder="最多填写20000张"
              autoComplete="off"
              maxLength='15'/>
        </Form.Item>
    </Modal>
  )
}
export default AddModal;
