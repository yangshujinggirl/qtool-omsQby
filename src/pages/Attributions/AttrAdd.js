import { Form, Input, message, Tag, Tooltip, Icon } from "antd";
import { GetInfoApi, saveAtrApi } from "api/home/Attributions";
import { Qbtn } from "common";
let FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
class AttrAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: ""
    };
  }
  componentDidMount() {
    GetInfoApi({}).then(res => {
      this.setState({
        infos: res.result
      });
    });
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        saveAtrApi({}).then(res => {
          message.error("保存成功");
        });
      }
    });
  };
  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className="handle-operate-save-action">
            <Form>
              <Form.Item label="规格名称">
                {getFieldDecorator("high", {
                  rules: [{ required: true, message: "请输入规格名称" }]
                })(<Input placeholder="请输入规格名称" autoComplete="off" />)}
              </Form.Item>
              <Form.Item label="属性值">
                {getFieldDecorator("high", {
                    rules: [{ required: true, message: "请输入属性值" }]
                  })(
                    tags.map((item,index)=>(
                      <Tag>
                        
                      </Tag>
                    ))
                  )
                }
              </Form.Item>
            </Form>
            <Qbtn>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const AttrAdds = Form.create({})(AttrAdd);
export default AttrAdds;
