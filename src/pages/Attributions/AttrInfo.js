import { Form } from "antd";
import { GetInfoApi } from "api/home/Attributions";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};
class AttrInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: {}
    };
  }
  componentDidMount() {
    GetInfoApi().then(res => {
      this.setState({
        infos: res.result
      });
    });
  }
  render() {
    const {infos} = this.state
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          <Form.Item label="规格名称"></Form.Item>
        </Form>
      </div>
    );
  }
}
export default AttrInfo;
