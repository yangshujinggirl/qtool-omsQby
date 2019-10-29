import { Modal,Input,Form,Cascader,DatePicker,Radio } from 'antd';
import moment from 'moment';
import { GetAddRecordApi } from '../../../../../api/home/BaseGoodsCenter/InvestmentManage';
import { Qbtn, Qmessage, CascaderAddressOptions } from 'common';
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
        this.setState({ loading:true });
        let { content }=this.props;
        let { approachDate } =values;
        values.approachDate=moment(values.approachDate).format('YYYY-MM-DD');
        values={...values,customerId:content.id};
        GetAddRecordApi(values)
        .then((res)=> {
          Qmessage.success('添加成功');
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
            title="添加记录"
            closable
            width={400}
            visible={this.props.visible}
            onCancel={this.onCancel}
            footer={[
              <Qbtn
                loading={this.state.loading}
                key="pass"
                onClick={this.handleSubmit}>保存</Qbtn>
            ]}>
            <div className="audit-main-content">
            <Form.Item label="接洽日期" {...formItemLayout}>
              {
                getFieldDecorator('approachDate',{
                  rules:[{ required: true, message: '请选择接洽日期'}],
                })(
                  <DatePicker placeholder="请选择接洽日期" autoComplete="off"/>
                )
              }
            </Form.Item>
            <Form.Item label="参与人员" {...formItemLayout}>
              {
                getFieldDecorator('approachPeople',{
                  rules:[{ required: true, message: '请输入参与人员'}],
                })(
                  <Input placeholder="请输入参与人员" autoComplete="off"/>
                )
              }
            </Form.Item>
            <Form.Item label="地点" {...formItemLayout}>
              {
                getFieldDecorator('approachAddress',{
                  rules:[{ required: true, message: '请输入地点'}],
                })(
                  <Input placeholder="请输入地点" autoComplete="off"/>
                )
              }
            </Form.Item>
            <Form.Item label="合同意向" {...formItemLayout}>
              {
                getFieldDecorator('updateStatus',{
                  rules:[{ required: true, message: '请输入地点'}],
                })(
                  <Radio.Group>
                    <Radio value={2}>想签意向合同</Radio>
                    <Radio value={5}>想签正式合同</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label="备注" {...formItemLayout}>
              {
                getFieldDecorator('approachMemo',{
                  rules:[{ required: true, message: '请输入备注'}],
                })(
                  <Input.TextArea placeholder="请输入备注" autoComplete="off"/>
                )
              }
            </Form.Item>
            </div>
          </Modal>
  }
}
const SetModalF = Form.create()(SetModal);

export default SetModalF;
