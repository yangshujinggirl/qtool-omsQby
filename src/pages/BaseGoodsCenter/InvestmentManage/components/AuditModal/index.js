import { Modal,Input,Form,Cascader,DatePicker,Radio } from 'antd';
import moment from 'moment';
import { GetAuditApi } from '../../../../../api/home/BaseGoodsCenter/InvestmentManage';
import { Qbtn, Qmessage } from 'common';
import './index.less';

class AuditModal extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      loading:false
    }
  }
  handleSubmit =()=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading:true });
        let { content }=this.props;
        values={...values,id:content.id};
        GetAuditApi(values)
        .then((res)=> {
          Qmessage.success('审核成功');
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
    const formItemLayout = {
      labelCol: {
        span:6
      },
      wrapperCol: {
        span:16
      },
    };
    return <Modal
            className="addCurstomer-modal-wrap"
            title="审核"
            closable
            width={400}
            visible={this.props.visible}
            onCancel={this.onCancel}
            footer={[
              <Qbtn
                loading={this.state.loading}
                key="pass"
                onClick={this.handleSubmit}>确定</Qbtn>
            ]}>
            <div className="audit-main-content">
              <Form.Item label="审核结果" {...formItemLayout}>
                {
                  getFieldDecorator('status',{
                    rules:[{ required: true, message: '请选择审核结果'}],
                  })(
                    <Radio.Group>
                      <Radio value={0}>审核不通过</Radio>
                      <Radio value={1}>审核通过</Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
            </div>
          </Modal>
  }
}
const AuditModalF = Form.create()(AuditModal);

export default AuditModalF;
