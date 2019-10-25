import { Form, Input, Select, message, Cascader, DatePicker } from "antd";
import {
  ShopInfosApi,
  updataRuleApi
} from "api/home/BaseGoodsCenter/ShopManage";

import { Qbtn, CascaderAddressOptions } from "common";
let FormItem = Form.Item;
const { RangePicker } = DatePicker;
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
      infos: {},
      fileList: [],
      shopLists: [],
      checkValue: false
    };
  }
  componentDidMount() {
    ShopListsApi().then(res => {
      this.setState({
        shopLists: res.result
      });
    });
    const { id } = this.props.match.params;
    if (id) {
      ShopInfosApi({ id }).then(res => {
        const { channelPic } = res.result;
        const fileList = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.result.image
          }
        ];
        this.setState({
          infos: res.result,
          fileList
        });
      });
    }
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { id } = this.props.match.params;
        updataRuleApi({ id, ...values }).then(res => {
          message.success("保存成功");
          this.props.history.push("/account/channelManage");
        });
      }
    });
  };
  updateFileList = fileList => {
    this.setState({ fileList });
  };
  goBack = () => {
    this.props.history.push("/account/channelManage");
  };
  onChange = value => {
    this.setState({
      checkValue: value
    });
  };
  render() {
    const { infos, fileList, shopLists, checkValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log(shopLists);
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          <Form.Item label="开户银行">
            {getFieldDecorator("openingBank", {
              initialValue: infos.openingBank,
              rules: [{ required: true, message: "请输入开户银行" }]
            })(<Input placeholder="请输入开户银行" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="银行卡号">
            {getFieldDecorator("bankCardNo", {
              initialValue: infos.bankCardNo,
              rules: [{ required: true, message: "请输入银行卡号" }]
            })(<Input placeholder="请输入银行卡号" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="开户名">
            {getFieldDecorator("openingName", {
              initialValue: infos.openingName,
              rules: [{ required: true, message: "请输入开户名" }]
            })(<Input placeholder="请输入银行卡号" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="门店电话">
            {getFieldDecorator("channelPhone", {
              initialValue: infos.channelPhone,
              rules: [{ required: true, message: "请输入地址" }]
            })(<Input placeholder="请输入地址" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="客服电话">
            {getFieldDecorator("servicePhone", {
              initialValue: infos.servicePhone,
              rules: [{ required: true, message: "请选择" }]
            })(<Input placeholder="请输入地址" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="微信支付扫码">
            {getFieldDecorator("weiPayStatus", {
              initialValue: infos.weiPayStatus,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={1}>开启</Radio>
                <Radio value={0}>关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="支付宝扫码">
            {getFieldDecorator("alipayStatus", {
              initialValue: infos.alipayStatus,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={1}>开启</Radio>
                <Radio value={0}>关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="C端App">
            {getFieldDecorator("cAppStatus", {
              initialValue: infos.cAppStatus,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Radio.Group>
                <Radio value={1}>开启</Radio>
                <Radio value={0}>关闭</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="合作类型">
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

          <Form.Item label="食品尿不湿类">
            {getFieldDecorator("divideIntoA", {
              initialValue: infos.divideIntoA,
              rules: [{ required: true, message: "请输入采购价" }]
            })(
              <Input suffix="%" placeholder="请输入采购价" autoComplete="off" />
            )}
          </Form.Item>
          <Form.Item label="非食品尿不湿类">
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
          <Form.Item label="营业时间">
            {getFieldDecorator("businessHours", {
              initialValue: infos.businessHours,
              rules: [{ required: true, message: "请输入客服电话" }]
            })(<RangePicker />)}
          </Form.Item>
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
