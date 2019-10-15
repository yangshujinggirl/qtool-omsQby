import { Modal, Form, Input, Select, message } from "antd";
import { GetCategoryApi } from "api/home/BaseGoods";
import { AddApi } from "api/home/Classify";
const FormItem = Form.Item;
const Option = Select.Option;

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catagoryList: [],
      catagoryList2: [],
      catagoryList3: [],
      catagoryList4: [],
    };
  }
  componentDidMount = () => {
    if (this.props.level != 1) {
      GetCategoryApi({ level: 1, parentId: "" }).then(res => {
        this.setState({
          catagoryList: res.result
        });
      });
    }
  };
  onChange = (value, type) => {
    if(type==1){
      this.setState({
        catagoryList2:[],
        catagoryList3:[],
      });
    };
    const level = type+1;
    GetCategoryApi({ parentId: value, level }).then(res => {
      this.setState({
        ["catagoryList" + level]: res.result||[],
      });
    });
  };
  renderForm() {
    const { level } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { catagoryList, catagoryList2,catagoryList3} = this.state;
    switch (level) {
      case 1:
        return (
          <div>
            <FormItem
              label="一级分类名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入类目名称" }]
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
      case 2:
        return (
          <div>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId", {
                rules: [{ required: true, message: "请输入类目名称" }]
              })(
                <Select placeholder='请选择'>
                  {catagoryList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="二级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入类目名称" }]
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
      case 3:
        return (
          <div>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                onChange: (value) => this.onChange(value, 1)
              })(
                <Select placeholder='请选择'>
                  {catagoryList &&
                    catagoryList.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="所属二级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                onChange: (value) => this.onChange(value, 2)
              })(
                <Select disabled={!catagoryList2.length>0} placeholder='请选择'>
                  {catagoryList2 &&
                    catagoryList2.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="三级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入三级类目名称" }]
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
      case 4:
        return (
          <div>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                onChange: (value) => this.onChange(value, 1)
              })(
                <Select placeholder='请选择'>
                  {catagoryList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="所属二级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId2", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                onChange: (value) => this.onChange(value, 2)
              })(
                <Select disabled={!catagoryList2.length>0} placeholder='请选择'>
                  {catagoryList2 &&
                    catagoryList2.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="所属三级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
              })(
                <Select disabled={!catagoryList3.length>0} placeholder='请选择'>
                  {catagoryList3 &&
                    catagoryList3.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="四级类目名称"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入四级类目名称" }],
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
          </div>
        );
    }
  }
  onCancel = () => {
    this.props.onCancel();
  };
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        AddApi({ ...values, level: this.props.level }).then(res => {
          message.success('添加分类成功');
          this.props.form.resetFields();
          this.props.onOk()
        });
      }
    });
  };
  render() {
    const { visible, text } = this.props;
    console.log(text);
    return (
      <div>
        <Modal
          title={"新增" + text + "目录"}
          onCancel={this.onCancel}
          onOk={this.onOk}
          visible={visible}
          cancelText="取消"
          okText="确定"
        >
          <Form>{this.renderForm()}</Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({})(AddModal);
