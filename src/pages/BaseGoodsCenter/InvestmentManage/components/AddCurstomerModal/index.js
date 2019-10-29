import { Modal,Input,Form,Cascader } from 'antd';
import { GetAddCurstomerApi } from '../../../../../api/home/BaseGoodsCenter/InvestmentManage';
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
      console.log(values)
      if (!err) {
        this.setState({ loading:true })
        let { address ,...params } =values;
        params.province = address[0];
        params.city = address[1];
        params.area = address[2];
        GetAddCurstomerApi(params)
        .then((res)=> {
          Qmessage.success('新建成功');
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
            title="新增客户"
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
            <Form.Item label="客户姓名" {...formItemLayout}>
              {
                getFieldDecorator('name',{
                  rules:[{ required: true, message: '请输入客户姓名'}],
                })(
                  <Input placeholder="请输入客户姓名" autoComplete="off"/>
                )
              }
            </Form.Item>
            <Form.Item label="联系电话" {...formItemLayout}>
              {
                getFieldDecorator('phone',{
                  rules:[{ required: true, message: '请输入联系电话'}],
                })(
                  <Input placeholder="请输入联系电话" autoComplete="off"/>
                )
              }
            </Form.Item>
            <Form.Item label="地区" {...formItemLayout}>
              {
                getFieldDecorator('address',{
                  rules:[{ required: true, message: '请选择地区'}],
                })(
                  <Cascader
                    options={CascaderAddressOptions}
                    placeholder="请选择地区" />
                )
              }
            </Form.Item>
            </div>
          </Modal>
  }
}
const SetModalF = Form.create()(SetModal);

export default SetModalF;
