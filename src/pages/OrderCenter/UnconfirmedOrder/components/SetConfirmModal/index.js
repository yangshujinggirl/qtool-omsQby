import { Modal,Input,Form } from 'antd';
import { GetEditAmoutLimitApi } from '../../../../../api/home/OrderCenter/UnconfirmedOrder';
import { Qbtn, Qmessage } from 'common';
import './index.less';

const SetModal=({...props})=>{
  const { getFieldDecorator } = props.form;
  const { content={} }=props;
  const handleSubmit =()=> {
    props.form.validateFields((err, values) => {
      if (!err) {
        GetEditAmoutLimitApi(values)
        .then((res)=> {
          Qmessage.success('修改成功');
          props.form.resetFields()
          props.onOk();
        })
      }
    });
  }
  const onCancel=()=>{
    props.form.resetFields()
    props.onCancel();
  }
  return <Modal
          className="setConfirm-modal-wrap"
          title=""
          closable
          width={320}
          visible={props.visible}
          onCancel={onCancel}
          footer={[
            <Qbtn key="pass" onClick={handleSubmit}>审核通过</Qbtn>
          ]}>
          <div className="audit-main-content">
          <Form.Item>
            <span className="ant-form-text"> 小于</span>
            {
              getFieldDecorator('minAmount',{
                initialValue:content.minAmount,
                rules:[{ required: true, message: '请输入数字'},{
                  pattern:/^\d+$/,message:'请输入正整数'
                }],
              })(
                <Input placeholder="请输入数字" autoComplete="off"/>
              )
            }
            <span className="ant-form-text"> 金额时拦截订单</span>
          </Form.Item>
          <Form.Item>
            <span className="ant-form-text"> 大于</span>
            {
              getFieldDecorator('maxAmout',{
                initialValue:content.maxAmout,
                rules:[{ required: true, message: '请输入数字'},{
                  pattern:/^\d+$/,message:'请输入正整数'
                }],
              })(
                <Input placeholder="请输入数字" autoComplete="off"/>
              )
            }
            <span className="ant-form-text"> 金额时拦截订单</span>
          </Form.Item>
          </div>
        </Modal>
}
const SetModalF = Form.create()(SetModal);

export default SetModalF;
