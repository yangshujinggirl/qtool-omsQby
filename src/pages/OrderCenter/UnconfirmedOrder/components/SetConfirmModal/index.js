import { Modal,Input,Form } from 'antd';
import { GetEditAmoutLimitApi } from '../../../../../api/home/OrderCenter/UnconfirmedOrder';
import { Qbtn, Qmessage } from 'common';
import './index.less';

class SetModal extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      loading:false
    }
  }
  handleSubmit =()=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading:true })
        values={...values,id:this.props.content.id}
        GetEditAmoutLimitApi(values)
        .then((res)=> {
          Qmessage.success('修改成功');
          this.props.form.resetFields()
          this.props.onOk();
          this.setState({ loading:false })
        })
      }
    });
  }
  onCancel=()=>{
    this.props.form.resetFields()
    this.props.onCancel();
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { content={} }=this.props;
    return <Modal
            className="setConfirm-modal-wrap"
            title=""
            closable
            width={320}
            visible={this.props.visible}
            onCancel={this.onCancel}
            footer={[
              <Qbtn
                loading={this.state.loading}
                key="pass"
                onClick={this.handleSubmit}>保存</Qbtn>
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
}
const SetModalF = Form.create()(SetModal);

export default SetModalF;
