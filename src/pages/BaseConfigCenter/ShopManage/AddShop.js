import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, message, Cascader, Checkbox } from "antd";
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
        const { channelPic } = res.result;
        const imgBox = channelPic && channelPic.split(",");
        const fileList = [];
        imgBox &&
          imgBox.map(item => {
            const obj = {
              uid: item,
              name: "image.png",
              status: "done",
              url: item
            };
            fileList.push(obj);
          });
        this.setState({
          infos: res.result,
          fileList,
          checkValue: res.result.isSynchro
        });
      });
    }
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.formatValue(values);
        this.sendRequest(values);
      }
    });
  };

  formatValue = values => {
    const imgsBox = [];
    this.state.fileList.map(item => {
      if (item.response) {
        if (item.response.httpCode == "200") {
          imgsBox.push(item.response.result);
        }
      } else {
        imgsBox.push(item.url);
      }
    });
    values.channelPic = imgsBox.join(",");
    values.province = values.shopAddress[0];
    values.city = values.shopAddress[1];
    values.area = values.shopAddress[2];
    if (this.state.checkValue) {
      values.shProvince = values.shopAddress[0];
      values.shCity = values.shopAddress[1];
      values.shArea = values.shopAddress[2];
      values.shAddress = values.address;
    } else {
      values.shProvince = values.getGoodsAddress[0];
      values.shCity = values.getGoodsAddress[1];
      values.shAddress = values.getGoodsAddress[2];
      delete values.getGoodsAddress;
    }
    delete values.shopAddress;
  };
  sendRequest = values => {
    const { id } = this.props.match.params;
    if (!id) {
      AddShopApi({ ...values }).then(res => {
        message.success("保存成功");
        this.props.history.push("/account/channel");
      });
    } else {
      UpdateShopApi({ id, ...values }).then(res => {
        message.success("保存成功");
        this.props.history.push("/account/channel");
      });
    }
  };
  updateFileList = fileList => {
    this.setState({ fileList });
  };
  // goBack = () => {
  //   this.props.history.push("/account/channelManage");
  // };
  onChange = e => {
    this.setState({
      checkValue: e.target.checked
    });
  };
  //纬度校验
  validatorLng(rule, value, callback) {
    if (value > 180 || value < -180) {
      callback("请输入正确的纬度");
    } else {
      callback();
    }
  }
  //经度校验
  validatorLat(rule, value, callback) {
    if (value > 90 || value < -90) {
      callback("请输入正确的经度");
    } else {
      callback();
    }
  }
  render() {
    const { infos, fileList, shopLists, checkValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log(shopLists);
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          {!this.props.match.params.id ? (
            <Form.Item label="选择店主">
              {getFieldDecorator("person", {
                initialValue: infos.person,
                rules: [{ required: true, message: "请选择" }]
              })(
                <Select
                  disabled={Boolean(this.props.match.params.id)}
                  placeholder="请选择"
                  allowClear={true}
                >
                  {shopLists &&
                    shopLists.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          ) : (
            <Form.Item label="选择店主">
              <Input value={infos.personName} disabled />
            </Form.Item>
          )}

          <Form.Item label="门店编码">
            {getFieldDecorator("channelCode", {
              initialValue: infos.channelCode,
              rules: [
                { required: true, message: "请输入门店编码" },
                {
                  pattern: /^(?![^a-zA-Z]+$)(?!\D+$).{0,10}$/,
                  message: "10以内数字加字母"
                }
              ]
            })(
              <Input
                disabled={Boolean(this.props.match.params.id)}
                maxLength={10}
                placeholder="请输入门店编码(10以内数字加字母)"
                autoComplete="off"
              />
            )}
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
              valuePropName: "checked",
              initialValue: this.state.checkValue,
              rules: [{ required: true, message: "请选择" }]
            })(<Checkbox onChange={this.onChange} />)}
          </Form.Item>
          {!checkValue && (
            <div>
              <Form.Item label="收货地址">
                {getFieldDecorator("getGoodsAddress", {
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
                  rules: [{ required: true, message: "请输入详细地址" }]
                })(<Input placeholder="请输入详细地址" autoComplete="off" />)}
              </Form.Item>
            </div>
          )}
          <Form.Item label="门店照片">
            <QupLoadImgLimt
              limit={3}
              upDateList={this.updateFileList}
              fileList={fileList}
            />
          </Form.Item>
          <Form.Item label="门店名称">
            {getFieldDecorator("channelName", {
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
              initialValue: infos.servicePhone
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
              rules: [{ validator: this.validatorLat }]
            })(<Input placeholder="请输入经度" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="纬度">
            {getFieldDecorator("weft", {
              initialValue: infos.weft,
              rules: [{ validator: this.validatorLng }]
            })(<Input placeholder="请输入纬度" autoComplete="off" />)}
          </Form.Item>

          <div className="handle-operate-save-action">
            {/* <Qbtn onClick={this.goBack}>返回</Qbtn> */}
            <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const AddShops = Form.create({})(AddShop);
export default AddShops;
