import { Modal, Form, Input,  message } from "antd";
import { EditApi } from "api/home/Classify";
import './index.less'
const FormItem = Form.Item;

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onCancel = () => {
    this.props.onCancel();
  };
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        EditApi({ id:this.props.id,...values }).then(res => {
          message.success("修改分类成功");
          this.props.form.resetFields();
          this.props.onOk();
        });
      }
    });
  };
  render() {
    const { visible,categoryName } = this.props;
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Modal
          title='编辑类目'
          onCancel={this.onCancel}
          onOk={this.onOk}
          visible={visible}
          cancelText="取消"
          okText="确定"
        >
          <Form>
          <FormItem
              label="原名称"
              labelCol={{ span: 6 }}
              wrapperCol={{span:12}}
              className='form_situation'
            >
              <span>{categoryName}</span>
            </FormItem>
            <FormItem
              label="一级分类名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入类目名称" }]
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({})(EditModal);
