import { Form, Input, message, Checkbox, Select } from "antd";
import { connect } from "react-redux";
import { GetInfoApi, AtrBindApi } from "api/home/Attributions";
import { GetCategoryApi } from "api/home/BaseGoods";
import { Qbtn } from "common";
import "./index.less";
const CheckboxGroup = Checkbox.Group;
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
class AttrAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plainOptions: [],
      checkedList: [],
      categoryLists: [],
      attributeName: "",
      categoryLists: [],
      categoryLists1: [],
      categoryLists2: [],
      categoryLists3: []
    };
  }
  componentDidMount() {
    this.initPage();
  }
  //初始化数据
  initPage = () => {
    const { id } = this.props.match.params;
    this.setState({ id });
    GetInfoApi({ attributeId: id }).then(res => {
      const { attributeValue, attributeName } = res.result;
      this.setState({
        plainOptions: attributeValue.split("|"),
        attributeName
      });
    });
    GetCategoryApi({ level: 1 }).then(res => {
      this.setState({
        categoryLists: res.result
      });
    });
  };
  //提交
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { categoryId, attributeValue } = values;
        const { id } = this.state;
        attributeValue = attributeValue.join("|");
        AtrBindApi({ attributeId:id, attributeValue, categoryId }).then(res => {
          message.success("保存成功");
          this.props.history.push("/account/attributeManage");
        });
      }
    });
  };
  handleChange = (value, type) => {
    GetCategoryApi({ level: type + 1, parentId: value }).then(res => {
      this.setState({
        ["categoryLists" + type]: res.result||[]
      });
    });
  };
  render() {
    const {
      checkedList,
      plainOptions,
      attributeName,
      categoryLists,
      categoryLists1,
      categoryLists2,
      categoryLists3
    } = this.state;
    console.log(this.state);
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <div className="handle-operate-save-action">
          <Form {...formItemLayout}>
            <Form.Item label="属性名称">
              {getFieldDecorator("attributeName", {
                rules: [{ required: true, message: "请填写属性名称" }],
                initialValue: attributeName
              })(<Input placeholder="请填写属性名称" autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="一级分类">
              {getFieldDecorator("categoryId1", {
                rules: [{ required: true, message: "请选择一级分类" }],
                onChange: value => this.handleChange(value, 1)
              })(
                <Select placeholder="请选择一级分类">
                  {categoryLists.map(item => (
                    <Option key={item.id} values={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="二级分类">
              {getFieldDecorator("categoryId2", {
                rules: [{ required: true, message: "请选择二级分类" }],
                onChange: value => this.handleChange(value, 2)
              })(
                <Select
                  placeholder="请选择二级分类"
                  disabled={!categoryLists1.length > 0}
                >
                  {categoryLists1.map(item => (
                    <Option key={item.id} values={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="三级分类">
              {getFieldDecorator("categoryId3", {
                rules: [{ required: true, message: "请选择三级分类" }],
                onChange: value => this.handleChange(value, 3)
              })(
                <Select
                  placeholder="请选择三级分类"
                  disabled={!categoryLists2.length > 0}
                >
                  {categoryLists2.map(item => (
                    <Option key={item.id} values={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="四级分类">
              {getFieldDecorator("categoryId", {
                rules: [{ required: true, message: "请选择四级分类" }]
              })(
                <Select
                  placeholder="请选择四级分类"
                  disabled={!categoryLists3.length > 0}
                >
                  {categoryLists3.map(item => (
                    <Option key={item.id} values={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="属性值" className="differ_situation">
              {getFieldDecorator("attributeValue", {
                initialValue: checkedList
              })(<CheckboxGroup options={plainOptions} />)}
            </Form.Item>
          </Form>
          <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
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
