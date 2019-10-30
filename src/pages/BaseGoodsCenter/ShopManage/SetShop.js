import {
  Form,
  Input,
  Row,
  Col,
  Select,
  message,
  Radio,
  TimePicker
} from "antd";
import {
  ShopInfosApi,
  updataRuleApi
} from "api/home/BaseGoodsCenter/ShopManage";
import moment from "moment";
import { Qbtn } from "common";
let FormItem = Form.Item;
const { Option } = Select;
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

class AddShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: {}
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      ShopInfosApi({ id }).then(res => {
        this.setState({
          infos: res.result
        });
      });
    }
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { id } = this.props.match.params;
        values.businessHoursS = moment(values.businessHoursS).format("HH:mm");
        values.businessHoursE = moment(values.businessHoursE).format("HH:mm");
        delete values.businessHours;
        updataRuleApi({ id, ...values }).then(res => {
          message.success("保存成功");
          this.props.history.push("/account/channelManage");
        });
      }
    });
  };
  goBack = () => {
    this.props.history.push("/account/channelManage");
  };
  render() {
    const { infos } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form>
          <Form.Item label="开户银行" {...formItemLayout}>
            {getFieldDecorator("openingBank", {
              initialValue: infos.openingBank,
              rules: [{ required: true, message: "请输入开户银行" }]
            })(<Input placeholder="请输入开户银行" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="银行卡号" {...formItemLayout}>
            {getFieldDecorator("bankCardNo", {
              initialValue: infos.bankCardNo,
              rules: [{ required: true, message: "请输入银行卡号" }]
            })(<Input placeholder="请输入银行卡号" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="开户名" {...formItemLayout}>
            {getFieldDecorator("openingName", {
              initialValue: infos.openingName,
              rules: [{ required: true, message: "请输入开户名" }]
            })(<Input placeholder="请输入银行卡号" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="门店电话" {...formItemLayout}>
            {getFieldDecorator("channelPhone", {
              initialValue: infos.channelPhone
            })(<Input placeholder="请输入地址" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="客服电话" {...formItemLayout}>
            {getFieldDecorator("servicePhone", {
              initialValue: infos.servicePhone
            })(<Input placeholder="请输入地址" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="微信支付扫码" {...formItemLayout}>
            {getFieldDecorator("weiPayStatus", {
              initialValue: infos.weiPayStatus,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={true}>开启</Radio>
                <Radio value={false}>关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="支付宝扫码" {...formItemLayout}>
            {getFieldDecorator("alipayStatus", {
              initialValue: infos.alipayStatus,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={true}>开启</Radio>
                <Radio value={false}>关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="C端App" {...formItemLayout}>
            {getFieldDecorator("cappStatus", {
              initialValue: infos.cappStatus,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={true}>开启</Radio>
                <Radio value={false}>关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="合作类型" {...formItemLayout}>
            {getFieldDecorator("channelType", {
              initialValue: infos.channelType,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择合作类型" allowClear={true}>
                <Option value={1}>直营</Option>
                <Option value={2}>联营</Option>
                <Option value={3}>加盟</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="食品尿不湿类" {...formItemLayout}>
            {getFieldDecorator("divideIntoA", {
              initialValue: infos.divideIntoA,
              rules: [{ required: true, message: "请输入采购价" }]
            })(
              <Input suffix="%" placeholder="请输入采购价" autoComplete="off" />
            )}
          </Form.Item>
          <Form.Item label="非食品尿不湿类" {...formItemLayout}>
            {getFieldDecorator("divideIntoB", {
              initialValue: infos.divideIntoB,
              rules: [{ required: true, message: "请输入门店名称" }]
            })(
              <Input
                suffix="%"
                placeholder="请输入门店名称"
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Row gutter={4}>
            <Col span={2} offset={2}>
              <Form.Item className='q-required' label="营业时间"></Form.Item>
            </Col>
            <Col  style={{width:'130px','display':'inline-block'}}>
              <Form.Item>
                {getFieldDecorator("businessHours", {
                  initialValue: infos.businessHoursS
                    ? moment(infos.businessHoursS, "HH:mm")
                    : null,
                  rules: [{ required: true, message: "请输入客服电话" }]
                })(<TimePicker format="HH:mm" />)}
              </Form.Item>
            </Col>
            <Col style={{width:'50px',display:'inline-block',textAlign:'center'}}>——</Col>
            <Col style={{width:'130px','display':'inline-block'}}>
              <Form.Item>
                {getFieldDecorator("businessHoursE", {
                  initialValue: infos.businessHoursE
                    ? moment(infos.businessHoursE, "HH:mm")
                    : null,
                  rules: [{ required: true, message: "请输入客服电话" }]
                })(<TimePicker format="HH:mm" />)}
              </Form.Item>
            </Col>
          </Row>
          <div className="handle-operate-save-action">
            <Qbtn onClick={this.goBack}>返回</Qbtn>
            <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const AddShops = Form.create({})(AddShop);
export default AddShops;
