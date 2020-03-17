import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Input, Row, Col, message, Select, Modal } from "antd";
import UploadHomeImg from "./components/UploadImg";
import UploadListImg from "./components/UploadImg";
import {
  addThemeApi,
  updataThemeApi
} from "../../../services/operate/themeAct/index";
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
import "./index.less";

class AddTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visible: false,
      infos: {
        themeName: "",
        subtitle: "",
        description: "",
        themeStatus: 5,
        pageCode:''
      },
      indexPicUrl: "",
      listPagePicUrl: ""
    };
  }
  componentDidMount() {
    if (this.props.data.infos) {
      const { infos } = this.props.data;
      const { indexPicUrl, listPagePicUrl } = infos;
      this.setState({
        infos,
        indexPicUrl,
        listPagePicUrl
      });
    }
  }
  //修改首页图片
  changeImg = indexPicUrl => {
    this.setState({
      indexPicUrl
    });
  };
  //修改列表页图片
  changeListImg = listPagePicUrl => {
    this.setState({
      listPagePicUrl
    });
  };
  cancel = () => {
    if (this.props.data.infos) {
      let { themeActivityId } = this.props.data.infos;
      this.props.dispatch({
        type: "tab/initDeletestate",
        payload: this.props.componkey + themeActivityId
      });
    } else {
      this.props.dispatch({
        type: "tab/initDeletestate",
        payload: this.props.componkey
      });
    };
  };
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const _values = this.formatValue(values);
        if (!_values) {
          return;
        };
        this.setState({ isLoading: true });
        if (this.props.data.infos) {//修改
          values.themeActivityId = this.props.data.infos.themeActivityId;
          this.sendRequest('edit',values)
        } else { //新增
          this.sendRequest('new',values)
        };
      };
    });
  };
  formatValue = values => {
    const { indexPicUrl, listPagePicUrl } = this.state;
    if (!indexPicUrl) {
      message.error("请先上传首页展示图片");
      return null;
    };
    if (!listPagePicUrl) {
      message.error("请先上传列表页展示图片");
      return null;
    };
    values.indexPicUrl = indexPicUrl;
    values.listPagePicUrl = listPagePicUrl;
    return values;
  };
  sendRequest = (type,values) => {
    if (type == "edit") {
      updataThemeApi(values).then(res => {
        if (res.code == "0") {
          message.success("修改成功");
          this.initTab();
          this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: false });
        }
      });
    };
    if (type == "new") {
      addThemeApi(values).then(res => {
        if (res.code == "0") {
          message.success("新增成功");
          this.initTab();
          this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: false });
        }
      });
    }
  };
  initTab = () => {
    this.cancel();
    this.props.dispatch({
      type: "themeAct/fetchList",
      payload: { ...this.props.data.inputValues }
    });
  };
  onlookEx = () => {
    this.setState({
      visible: true
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { indexPicUrl, listPagePicUrl, isLoading, visible } = this.state;
    console.log(indexPicUrl)
    const {
      themeName,
      pageCode,
      subtitle,
      description,
      themeStatus
    } = this.state.infos;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 }
    };
    return (
      <div>
        <Form className="add_theme">
          <div className="head_title">基础信息</div>
          <FormItem {...formItemLayout} label="主题活动名称">
            {getFieldDecorator("themeName", {
              rules: [
                { required: true, message: "请输入主题活动名称，15字符以内" }
              ],
              initialValue: themeName
            })(
              <Input
                placeholder="请输入主题活动名称，15字符以内"
                maxLength="15"
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="主题活动副标题">
            {getFieldDecorator("subtitle", {
              rules: [
                { required: true, message: "请输入主题活动副标题，15字符以内" }
              ],
              initialValue: subtitle
            })(
              <Input
                placeholder="请输入主题活动副标题，15字符以内"
                maxLength="15"
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="主题活动描述">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "请输入主题活动描述" }],
              initialValue: description
            })(
              <TextArea
                rows="3"
                maxLength="50"
                placeholder="请输入主题活动名称，50字符以内"
              />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 9 }}
            label="活动图片"
            className="must-pic"
          >
            <div className="home_pic">
              <UploadHomeImg
                imageUrl={indexPicUrl}
                changeImg={this.changeImg}
                width={366}
                height={339}
              />
              <span className="pic_tips">
                首页展示图片，图片尺寸为366*339，格式为jpg
              </span>
            </div>
            <a className="theme-color look-exp" onClick={this.onlookEx}>
              查看示例
            </a>
            <div className="list_pic">
              <UploadListImg
                imageUrl={listPagePicUrl}
                changeImg={this.changeListImg}
                width={686}
                height={365}
              />
              <span className="pic_tips">
                列表页展示图片，图片尺寸为686*365，格式为jpg
              </span>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="跳转页面编码">
            {getFieldDecorator("pageCode", {
              rules: [{ required: true, message: "请输入跳转页面编码" }],
              initialValue: pageCode
            })(<Input placeholder="请输入跳转页面编码" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} className="btn_cancel_save">
            <Row type="flex" justify="space-around">
              <Col offset={4}>
                <Button onClick={this.cancel}>取消</Button>
              </Col>
              <Col>
                <Button
                  loading={isLoading}
                  onClick={this.handleSubmit}
                  type="primary"
                >
                  保存
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <Modal visible={visible} onCancel={this.onCancel} footer={null}>
          <img
            style={{ width: "470px" }}
            src={require("../../../assets/ex6.png")}
          />
        </Modal>
      </div>
    );
  }
}
const AddThemes = Form.create({})(AddTheme);
const mapStateToProps = state => {
  const { themeAct } = state;
  return { themeAct };
};
export default connect(mapStateToProps)(AddThemes);
