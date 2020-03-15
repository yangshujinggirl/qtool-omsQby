import React, { Component } from "react";
import { connect } from "dva";
import {
  Form,
  Select,
  Input,
  Button,
  message,
  Row,
  Col,
  DatePicker,
  Radio
} from "antd";
import {
  createcPushApi,
  cpushInfoApi,
  cpushCateGoryApi
} from "../../../services/activity/cPush";
import "./index";
import linkOption from "./data.js";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

class Cpush extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componkey: this.props.componkey,
      info: {
        linkInfoType: undefined,
        title: null,
        pushNow: null,
        pushTime: null,
        msgContent: null,
        alertType: null,
        linkInfo: undefined,
        code: null,
        H5UrlL: null,
        textInfo: null,
        pushPerson: null,
        pushPersonType: null
      },
      categoryLists: []
    };
  }
  //修改时初始化数据
  componentDidMount() {
    if (this.props.data) {
      const id = this.props.data.bsPushId;
      cpushInfoApi({ bsPushId: id }).then(res => {
        if (res.code == "0") {
          const info = res.bsPush;
          switch (info.alertType) {
            case 20:
              info.code = info.alertTypeContent;
              break;
            case 30:
              info.H5Url = info.alertTypeContent;
              break;
            case 40:
              info.textInfo = info.alertTypeContent;
              break;
          };
          if (info.pushPerson == 0) {
            info.pushPerson = null;
            info.pushPersonType = 0;
          }else {
            info.pushPersonType = 1;
            info.pushPerson = info.pushPerson.replace(/-/g, "\n");
          }
          this.setState({ info });
        }
      });
    }
    cpushCateGoryApi().then(res => {
      const categoryLists = res.pdCategory.filter(item=>item.status == 1)
      this.setState({
        categoryLists
      });
    });
  }
  //推送人群更改
  pushPersonChange = e => {
    this.props.form.setFields({
      pushPerson: { value: null }
    });
    this.setState({
      info: { ...this.state.info, pushPersonType: e.target.value }
    });
  };
  initDeletestate = () => {
    const { data, componkey } = this.props;
    const propsComponkey = data ? componkey + data.bsPushId : componkey;
    this.props.dispatch({
      type: "tab/initDeletestate",
      payload: propsComponkey
    });
  };
  //保存
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.formatValue(values)){
          this.sendRequest(values)
        };
      }
    });
  };
  //请求数据格式化
  formatValue(values) {
    if (values.pushNow == 0) {//推送时间定时推送
      const time = new Date(values.pushTime).getTime();
      const currentTime = new Date().getTime();
      if (time < currentTime) {
        message.warning("请选择当前时间之后的时间");
        return false
      }
    }
    if (values.pushPersonType == 1) {//选择人群为特定用户
      if (this.formatMobiles(values.pushPerson)) {//电话号码格式输入错误大于11位
        message.error("一行只能输入一个手机号码", 0.8);
        return false
      }
    }
    const { linkInfoType, code, H5Url, textInfo } = values;
    let obj = Object.assign({}, { linkInfoType, code, H5Url, textInfo });
    for (var key in obj) {
      if (obj[key]) {//推送内容格式化
        values.alertTypeContent = obj[key];
      };
    };
    if (linkInfoType == 1 || linkInfoType == 10) {//去商品列表或者去活动ID去重
      values.linkInfo = values.linkInfo.replace(/\s+/g, "");
    };
    if (values.pushPersonType == 0) {
      values.pushPerson = 0;
    }
    if (this.props.data) {//带入不同的推送状态
      values.status = this.props.data.status;
      values.bsPushId = this.props.data.bsPushId;
    } else {
      values.status = 10;
    };
    if (values.pushTime) {
      values.pushTime = moment(values.pushTime).format("YYYY-MM-DD HH:mm:ss");
    };
    return values

  }
  formatMobiles = userMobiles => {
    let isTrue = false;
    if (userMobiles.indexOf("\n") != -1) {//多组值
      isTrue = userMobiles.split("\n").some(item => item.length > 11);
    } else {//一个值
      if (userMobiles.length > 11) {
        isTrue = true;
      };
    };
    return isTrue;
  };
  sendRequest(values) {
    createcPushApi(values).then(res => {
      if (res.code == "0") {
        message.success(res.message);
        this.initDeletestate();
        this.props.dispatch({
          type: "cPush/fetchList",
          payload: {}
        });
      }
    });
  }
  //取消
  cancel = () => {
    this.initDeletestate();
  };
  //推送类型变化的时候
  typeChange = e => {
    const value = e.target.value;
    this.props.form.setFields({
      //全部置为null
      linkInfoType: { value: undefined },
      code: { value: null },
      H5Url: { value: null },
      textInfo: { value: null }
    });
    this.setState({
      info: { ...this.state.info, linkInfoType: undefined, alertType: value }
    });
  };
  //推送时间变化的时候
  pushTimeChange = e => {
    if (this.props.data) {
      this.props.form.setFields({ pushTime: { value: null } });
    } else {
      this.props.form.resetFields(["createTime", "pushTime"]);
    }
    this.setState({ info: { ...this.state.info, pushNow: e.target.value } });
  };
  //推送类型更改
  linkTypeChange = value => {
    if (value == 1 || value == 8 || value == 10) {
      this.props.form.setFields({
        linkInfo: { value: undefined },
      });
    }
    this.setState({
      info: { ...this.state.info, linkInfoType: value,linkInfo:undefined }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const {
      title,
      pushNow,
      pushTime,
      msgContent,
      alertType,
      linkInfo,
      linkInfoType,
      code,
      H5Url,
      textInfo,
      pushPerson,
      pushPersonType
    } = this.state.info;
    const { categoryLists } = this.state;
    console.log(this.state)
    return (
      <div className="addpush">
        <Form className="addUser-form operatebanner-form">
          <FormItem
            label="推送主题"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 9 }}
          >
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入推送主题" }],
              initialValue: title
            })(
              <Input
                placeholder="请输入10字以内推送主题"
                maxLength="10"
                autoComplete="off"
              />
            )}
          </FormItem>
          <Row>
            <Col span={6}>
              <FormItem
                label="推送时间"
                labelCol={{ span: 3, offset: 1 }}
                wrapperCol={{ span: 6 }}
              >
                {getFieldDecorator("pushNow", {
                  rules: [{ required: true, message: "请选择推送时间" }],
                  initialValue: pushNow
                })(
                  <RadioGroup onChange={this.pushTimeChange}>
                    <Radio value={1}>立即推送</Radio>
                    <Radio value={0}>定时推送</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <div style={{ height: "32px" }}></div>
              </FormItem>
              <FormItem>
                {getFieldDecorator("pushTime", {
                  rules: [
                    { required: pushNow == 0, message: "请输入定时推送时间" }
                  ],
                  initialValue: pushTime
                    ? moment(pushTime, "YYYY-MM-DD HH:mm:ss")
                    : null
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    disabled={pushNow !== 0}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem
            label="推送内容"
            labelCol={{ span: 3, offset: 1 }}
            wrapperCol={{ span: 9 }}
          >
            {getFieldDecorator("msgContent", {
              rules: [{ required: true, message: "请选择推送内容" }],
              initialValue: msgContent
            })(
              <TextArea
                className="ant-textarea"
                placeholder="请输入30字以下推送内容"
                maxLength="30"
                rows={6}
              />
            )}
          </FormItem>
          <Row>
            <Col span={6}>
              <FormItem label="推送类型" labelCol={{ span: 3, offset: 1 }}>
                {getFieldDecorator("alertType", {
                  rules: [{ required: true, message: "请选择推送类型" }],
                  initialValue: alertType
                })(
                  <RadioGroup onChange={this.typeChange}>
                    <Radio style={radioStyle} value={10}>
                      二级页面
                    </Radio>
                    <Radio style={radioStyle} value={20}>
                      商品编码
                    </Radio>
                    <Radio style={radioStyle} value={30}>
                      H5连接URL
                    </Radio>
                    <Radio style={radioStyle} value={40}>
                      文本信息
                    </Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator("linkInfoType", {
                  rules: [
                    {
                      required: alertType == 10,
                      message: "请选择二级页面"
                    }
                  ],
                  initialValue: alertType==10?linkInfoType:undefined,
                  onChange: this.linkTypeChange
                })(
                  <Select
                    placeholder="请选择二级页面"
                    disabled={alertType !== 10}
                  >
                    {linkOption.map(item => (
                      <Option value={item.key} key={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("code", {
                  rules: [
                    { required: alertType == 20, message: "请输入商品编码" }
                  ],
                  initialValue: code
                })(<Input disabled={alertType !== 20} autoComplete="off" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("H5Url", {
                  rules: [
                    { required: alertType == 30, message: "请输入H5连接URL" }
                  ],
                  initialValue: H5Url
                })(<Input disabled={alertType !== 30} autoComplete="off" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("textInfo", {
                  rules: [
                    { required: alertType == 40, message: "请输入文本信息" }
                  ],
                  initialValue: textInfo
                })(
                  <TextArea
                    disabled={alertType !== 40}
                    placeholder="请输入300字以下推送内容"
                    maxLength="300"
                    rows={6}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={6} offset={1}>
              {alertType==10 && linkInfoType == 1 && (
                <FormItem>
                  {getFieldDecorator("linkInfo", {
                    rules: [
                      {
                        required: true,
                        message: "请输入页面编码"
                      }
                    ],
                    initialValue: linkInfo
                  })(<Input placeholder="请输入页面编码" autoComplete="off" />)}
                </FormItem>
              )}
              {alertType==10 && linkInfoType == 10 && (
                <FormItem>
                  {getFieldDecorator("linkInfo", {
                    rules: [
                      {
                        required: true,
                        message: "请输入促销活动ID"
                      }
                    ],
                    initialValue: linkInfo
                  })(
                    <Input placeholder="请输入促销活动ID" autoComplete="off" />
                  )}
                </FormItem>
              )}
              {alertType==10 && linkInfoType == 8 && (
                <FormItem>
                  {getFieldDecorator("linkInfo", {
                    rules: [{ required: true, message: "请选择分类" }],
                    initialValue: linkInfo?Number(linkInfo):undefined
                  })(
                    <Select placeholder="请选择分类">
                      {categoryLists.map(el => (
                        <Select.Option
                          key={el.pdCategoryId}
                          value={el.pdCategoryId}
                        >
                          {el.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem
                label="推送人群"
                labelCol={{ span: 3, offset: 1 }}
                wrapperCol={{ span: 6 }}
              >
                {getFieldDecorator("pushPersonType", {
                  rules: [{ required: true, message: "请选择推送人群" }],
                  initialValue: pushPersonType
                })(
                  <RadioGroup onChange={this.pushPersonChange}>
                    <Radio value={0}>全部用户</Radio>
                    <Radio value={1}>特定用户</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                {getFieldDecorator("allUser", {})(
                  <div style={{ height: "32px" }}></div>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("pushPerson", {
                  rules: [
                    { required: pushPersonType == 1, message: "请输入特定用户" }
                  ],
                  initialValue: pushPerson,
                  onChange: this.userMobileChange
                })(
                  <TextArea
                    className="ant-textarea"
                    placeholder="最多支持10000条用户数据，多个用户请换行"
                    disabled={!pushPersonType == 1}
                    rows={6}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem wrapperCol={{ offset: 3 }}>
            <Button style={{ marginRight: "100px" }} onClick={this.cancel}>
              取消
            </Button>
            <Button type="primary" onClick={this.handleSubmit}>
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const Cpushs = Form.create()(Cpush);
function mapStateToProps(state) {
  const { cPush } = state;
  return cPush;
}

export default connect(mapStateToProps)(Cpushs);
