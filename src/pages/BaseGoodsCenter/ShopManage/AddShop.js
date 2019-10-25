import { Form, Input, Select, message, Cascader, Checkbox } from "antd";
import {
  AddShopApi,
  ShopInfosApi,
  UpdateShopApi,
  ShopListsApi
} from "api/home/BaseGoodsCenter/ShopManage";
import QupLoadImgLimt from "common/QupLoadImgLimt";
import { Qbtn, CascaderAddressOptions } from "common";
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
      infos: {},
      fileList: [],
      shopLists: [],
      checkValue: true
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
        const {channelPic} = res.result;
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
        debugger
        values.image = this.state.fileList[0].response.result;
        if (!id) {
          AddShopApi({ ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/channelManage");
          });
        } else
          UpdateShopApi({ id, ...values }).then(res => {
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
          <Form.Item label="选择店主">
            {getFieldDecorator("person", {
              initialValue: infos.person,
              rules: [{ required: true, message: "请选择" }]
            })(
              <Select placeholder="请选择" allowClear={true}>
                {shopLists &&
                  shopLists.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="门店编码">
            {getFieldDecorator("channelCode", {
              initialValue: infos.channelCode,
              rules: [
                  { required: true, message: "请输入门店编码" },
                  { pattern: /^[a-zA-Z0-9]{1,10}$/,message:'10以内数字加字母'}
                ]
            })(<Input maxLength={10} placeholder="请输入门店编码(10以内数字加字母)" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="联系方式">
            {getFieldDecorator("channelPhone", {
              initialValue: infos.channelPhone,
              rules: [{ required: true, message: "请输入联系方式" }]
            })(<Input placeholder="请输入联系方式" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="门店地址">
            {getFieldDecorator("shopAddress", {
              initialValue: infos.province
                ? [infos.province, infos.city, infos.area]
                : undefined,
              rules: [{ required: true, message: "请输入门店地址" }]
            })(
              <Cascader
                options={CascaderAddressOptions}
                placeholder="请选择地区"
              />
            )}
          </Form.Item>
          <Form.Item label="详细地址">
            {getFieldDecorator("address", {
              initialValue: infos.address,
              rules: [{ required: true, message: "请输入地址" }]
            })(<Input placeholder="请输入地址" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="收货地址同门店地址">
            {getFieldDecorator("checkValue", {
              initialValue: this.state.checkValue,
              rules: [{ required: true, message: "请选择" }]
            })(<Checkbox onChange={this.onChange} />)}
          </Form.Item>
          {!checkValue && (
            <div>
              <Form.Item label="收货地址">
                {getFieldDecorator("shAddress", {
                  initialValue: infos.shProvince
                    ? [infos.shProvince, infos.shCity, infos.shArea]
                    : undefined,
                  rules: [{ required: true, message: "请输入收货地址" }]
                })(
                  <Cascader
                    options={CascaderAddressOptions}
                    placeholder="请选择地区"
                  />
                )}
              </Form.Item>
              <Form.Item label="详细地址">
                {getFieldDecorator("shAddress", {
                  initialValue: infos.shAddress,
                  rules: [{ required: true, message: "请输入采购价" }]
                })(<Input placeholder="请输入采购价" autoComplete="off" />)}
              </Form.Item>
            </div>
          )}
          <Form.Item label="门店照片">
            <QupLoadImgLimt
              limit={5}
              upDateList={this.updateFileList}
              fileList={fileList}
            />
          </Form.Item>
          <Form.Item label="门店名称">
            {getFieldDecorator("channelName",{
              initialValue: infos.channelName,
              rules: [{ required: true, message: "请输入门店名称" }]
            })(<Input placeholder="请输入门店名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="门店简称">
            {getFieldDecorator("channelJName", {
              initialValue: infos.channelJName,
              rules: [{ required: true, message: "请输入门店简称" }]
            })(<Input placeholder="请输入门店简称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="客服电话">
            {getFieldDecorator("servicePhone", {
              initialValue: infos.servicePhone,
              rules: [{ required: true, message: "请输入客服电话" }]
            })(<Input placeholder="请输入客服电话" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="门店备注">
            {getFieldDecorator("personRemark", {
              initialValue: infos.personRemark,
              rules: [{ required: true, message: "请输入门店备注" }]
            })(<Input placeholder="请输入门店备注" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="经度">
            {getFieldDecorator("warp", {
              initialValue: infos.warp,
              rules: [{ required: true, message: "请输入经度" }]
            })(<Input placeholder="请输入经度" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="纬度">
            {getFieldDecorator("weft", {
              initialValue: infos.weft,
              rules: [{ required: true, message: "请输入纬度" }]
            })(<Input placeholder="请输入纬度" autoComplete="off" />)}
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
