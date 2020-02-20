import { Form, Input, Select, DatePicker, Row, Col } from "antd";
import { Qbtn, Qtable } from "common";
import { ColumnsEdit } from './column';
import AddDescModal from './components/AddDescModal';

const FormItem = Form.Item;


const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 14
  }
};
class DescriptAddF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    }
  }
  handleChange=()=> {
    this.setState({ visible:true })
  }
  handleCancel=()=> {
    this.setState({ visible:false })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Form>
          <FormItem label="属性名称" {...formItemLayout}>
            {getFieldDecorator("attributeName")(
              <Input placeholder="请输入属性名称" autoComplete="off" />
            )}
          </FormItem>
          <FormItem label="关联后台类目" {...formItemLayout}>
            <Qbtn type="primary" size="free" onClick={this.handleChange.bind(this)}>
              选择后台类目
            </Qbtn>
          </FormItem>
        </Form>
        <Qtable
          columns={ColumnsEdit}
          dataSource={[]}/>
        <AddDescModal
        onCancel={this.handleCancel}
        visible={this.state.visible}/>
      </div>
    )
  }
}
const DescriptAdd = Form.create({})(DescriptAddF);
export default DescriptAdd;
