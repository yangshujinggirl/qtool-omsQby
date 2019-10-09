import { Form } from "antd";
import { GetInfoApi } from "api/home/Brand";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};
class BrandInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: {}
    };
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    GetInfoApi({ brandId:id }).then(res => {
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
          <Form.Item label="品牌中文名称">{infos.brandNameCn}</Form.Item>
          <Form.Item label="品牌英文名称">{infos.brandNameEn}</Form.Item>
          <Form.Item label="品牌状态">{infos.status==1?'启用':'不启用'}</Form.Item>
          <Form.Item label="品牌归属地">{infos.brandCountry}</Form.Item>
          <Form.Item label="品牌logo"><img src={infos.logo} style={{'width':'100px','height':'100px'}}/></Form.Item>
          <Form.Item label="品牌授权">{infos.isSq==1?'有':'无'}</Form.Item>
          <Form.Item label="品牌介绍">{infos.brandIntroduce}</Form.Item>
        </Form>
      </div>
    );
  }
}
export default BrandInfo;
