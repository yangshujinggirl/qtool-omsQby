import { Modal,Form,Radio, Input } from 'antd';
import { GetSaveApi } from 'api/contentCenter/CtipContent';
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

const AddModal=({...props})=> {
  const [form] = Form.useForm();
  const  handleOk= async()=> {
    try {
      let values = await form.validateFields();
      GetSaveApi(values)
      .then((res)=> {
        props.history.push(`/account/ctipContent/add/${res.homepageId}`);
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const  handleCancel=()=> {
    props.onCancel();
    form.resetFields()
  }
  return (
    <Modal
      title="新增首页版本"
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}>
        <Form form={form} {...formItemLayout} initialValues={{type:1}}>
          <Form.Item label="" name="type">
            <Radio.Group>
              <Radio value={1}>新增空白首页</Radio>
              <Radio value={2}>从现有版本复制</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}>
            {({ getFieldValue }) => {
              return getFieldValue('type') == 2&&
                <Form.Item label="版本编号" name="versionCode" rules={[{required:true,message:'请输入版本编号'}]}>
                  <Input autoComplete="off" placeholder="请输入版本编号"/>
                </Form.Item>
            }}
          </Form.Item>
          <Form.Item label="版本名称" name="versionName" rules={[{required:true,message:'请输入版本名称'}]}>
            <Input autoComplete="off" placeholder="请输入版本名称"/>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default AddModal;
