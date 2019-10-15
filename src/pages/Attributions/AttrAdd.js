import { Form, Input, message, Tag, Tooltip, Icon } from "antd";
import { connect } from "react-redux";
import { GetInfoApi, AddAtrApi, UpdataAtrApi } from "api/home/Attributions";
import { Qbtn } from "common";
import "./index.less";
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
      attributeId: "",
      tags: [],
      inputVisible: false,
      inputValue: ""
    };
  }
  componentDidMount() {
    this.initPage();
  }
  //初始化数据
  initPage = () => {
    const { id } = this.props.match.params;
    this.setState({ id });
    if (id) {
      GetInfoApi({ attributeId: id }).then(res => {
        const { attributeValue, attributeName } = res.result;
        this.setState({
          tags: attributeValue.split("|"),
          attributeName
        });
      });
    }
  };
  saveInputRef = input => {
    this.input = input;
  };
  //点击添加属性
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  //提交
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { id, tags } = this.state;
        if (!tags.length > 0) {
          message.error("请先添加属性", 0.8);
          return;
        }
        const attributeValue = tags.join("|");
        if (id) {
          //修改
          UpdataAtrApi({ id, attributeValue, ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/attributeManage");
          });
        } else {
          //新增
          AddAtrApi({ attributeValue, ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/attributeManage");
          });
        }
      }
    });
  };
  //input变化
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ""
    });
  };
  //点击 X 时
  handleClose = removeTag => {
    const tags = this.state.tags.filter(tag => tag != removeTag);
    this.setState({ tags });
  };
  goBack = () => {
    this.props.history.push("/account/attributeManage");
  };
  render() {
    const { tags, inputVisible, inputValue, attributeName } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <div className="handle-operate-save-action">
          <Form {...formItemLayout}>
            <Form.Item label="规格名称">
              {getFieldDecorator("attributeName", {
                rules: [{ required: true, message: "请输入规格名称" }],
                initialValue: attributeName
              })(<Input placeholder="请输入规格名称" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="属性值" className="q-required">
              <div className="add_atr">
                {tags.map((tag, index) => (
                  <Tag
                    key={tag}
                    closable={true}
                    onClose={() => this.handleClose(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
                {inputVisible && (
                  <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Tag
                    onClick={this.showInput}
                    style={{ background: "#fff", borderStyle: "dashed" }}
                  >
                    <Icon type="plus" />
                    添加属性
                  </Tag>
                )}
              </div>
            </Form.Item>
          </Form>
          <div className="handle-operate-save-action">
            <Qbtn onClick={this.goBack}>返回</Qbtn>
            <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
          </div>
        </div>
      </div>
    );
  }
}
const AttrAdds = Form.create({})(AttrAdd);
function mapStateToProps(state) {
  const { AttributionsReducers } = state;
  return AttributionsReducers;
}

export default connect(mapStateToProps)(AttrAdds);
