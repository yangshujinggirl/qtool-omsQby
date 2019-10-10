import { Form, Input, Radio, message } from "antd";
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
      infos: {}
    };
  }
  componentDidMount() {
    GetInfoApi({ }).then(res => {
      this.setState({
        infos: res.result
      });
    });
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        saveAtrApi({
          
        }).then(res => {
          message.error("保存成功");
        });
      }
    });
  };
  render() {
    const { infos } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className="handle-operate-save-action">
            <Qbtn>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const AttrAdds = Form.create({})(AttrAdd);
export default AttrAdds;
