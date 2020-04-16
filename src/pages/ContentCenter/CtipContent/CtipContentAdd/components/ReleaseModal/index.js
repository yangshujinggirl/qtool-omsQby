import { Modal, DatePicker, Form } from 'antd';
import moment from 'moment';
import { DisabledDateUtils } from 'utils';
import { GetPushApi } from 'api/contentCenter/CtipContentAdd';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const ReleaseModalF=({...props})=> {
  const [form] = Form.useForm();
  const { visible, confirmLoading, content } =props;
  const onOk =async()=> {
    try {
      let params={ type:content.type,homepageId:content.homepageId };
      if(content.type == 2) {
        let  values = await form.validateFields(['timingReleaseTime']);
        params.timingReleaseTime = moment(values.timingReleaseTime).format('YYYY-MM-DD HH:mm:ss');
      }
      GetPushApi(params)
      .then((res)=> {
        onCancel();
        props.onOk(res);
      })

    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const onCancel=()=> {
    form.resetFields(['timingReleaseTime']);
    props.onCancel();
  }
  return(
    <Modal
      getContainer={false}
      title={content.type==2?'定时发布':'立即发布'}
      confirmLoading={confirmLoading}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}>
      <Form form={form}>
        {
          content.type == '2'?
          <div>
            <Form.Item
              label="定时发布时间"
              name="timingReleaseTime"
              rules={[{required:true,message:'请设定发布时间'}]}>
              <DatePicker
                format="YYYY-MM-DD HH:mm"
                disabledDate={DisabledDateUtils.disabledDate}
                disabledTime={DisabledDateUtils.disabledDateTime}
                allowClear={false}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: moment('00:00', 'HH:mm'),
                }}/>
            </Form.Item>
            <p>亲，建议定时发布时间避开流量高峰哦</p>
          </div>
          :
          <p>
            您确定立即发布吗？发布成功后此次设置将同步到C端首页，不可撤销
          </p>
        }
      </Form>
    </Modal>
  )
}
export default ReleaseModalF;
