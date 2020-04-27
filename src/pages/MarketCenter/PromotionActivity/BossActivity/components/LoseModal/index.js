import {Modal,Form,Input,message} from 'antd';
import moment from 'moment';
import { Qmessage } from 'common';
import { GetLoseApi } from "api/marketCenter/BossActivity";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
  labelCol: {span:7},
  wrapperCol: {span:14},
};

const LoseModal=({...props})=>{
  const [form] = Form.useForm();
  const { visible, record } =props;
  const onCancel =()=> {
    props.onCancel();
    form.resetFields();
  }
  const onOk =async()=> {
    try{
      let  values = await form.validateFields(['reason']);
      GetLoseApi({activityId:record.activityId,...values})
      .then((res)=> {
        Qmessage.success('失效成功')
        props.onOk();
        form.resetFields();
      })
    } catch {

    }

  }
  return(
    <Modal
      width={450}
      destroyOnClose={true}
      title='强制失效'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}>
        <Form form={form} {...formItemLayout} >
          <FormItem label='活动'>
            {record.name}
          </FormItem>
          <FormItem label='生效时间'>
            {moment(record.beginTime).format('YYYY-MM-DD HH:mm')} ~ {moment(record.endTime).format('YYYY-MM-DD HH:mm')}
          </FormItem>
          <FormItem label='强制失效原因' name="reason" rules={[{required:true,message:"请输入强制失效原因"}]}>
            <TextArea
            rows={4}
            placeholder='请输入强制失效原因,30字以内'
            maxLength='30'
            autoComplete="off"/>
          </FormItem>
        </Form>
    </Modal>
  )
}
export default LoseModal
