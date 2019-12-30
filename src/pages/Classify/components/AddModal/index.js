import { Modal, Form, Input, Select, message } from "antd";
import { GetCategoryApi } from "api/home/BaseGoods";
import { AddApi, EditApi, getClassInfo } from "api/home/Classify";
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
      infos: {}
    };
  }
  componentDidMount = () => {
    const { id } = this.props;
    if (id) {
      getClassInfo({ id }).then(res => {
        if (res.httpCode == 200) {
          this.getCategoryList(res.result);
          this.setState({
            infos: res.result
          });
        }
      });
    } else {
      //请求一级类目列表
      GetCategoryApi({ level: 1, parentId: "" }).then(res => {
        if (res.httpCode == 200) {
          this.setState({
            catagoryList: res.result
          });
        }
      });
    }
  };
  getCategoryList = res => {
    const { level } = this.props;
    if (level != 1) {
      //请求一级类目列表
      GetCategoryApi({ level: 1, parentId: "" }).then(res1 => {
        if (res1.httpCode == 200) {
          this.setState({
            catagoryList: res1.result
          });
          if (level == 3 || level == 4) {
            //请求二级类目列表
            GetCategoryApi({ level: 2, parentId: res.categoryId }).then(
              res2 => {
                if (res2.httpCode == 200) {
                  this.setState({
                    catagoryList2: res2.result
                  });
                  if (level == 4) {
                    //请求三级类目列表
                    GetCategoryApi({
                      level: 3,
                      parentId: res.categoryId2
                    }).then(res3 => {
                      this.setState({
                        catagoryList3: res3.result
                      });
                    });
                  }
                }
              }
            );
          }
        }
      });
    }
  };
  onChange = (value, type) => {
    if (type == 1) {
      this.setState({
        catagoryList2: [],
        catagoryList3: []
      });
    }
    const level = type + 1;
    GetCategoryApi({ parentId: value, level }).then(res => {
      this.setState({ ["catagoryList" + level]: res.result || [] }, () => {
        //三级
        if (this.props.level == 3) {
          this.props.form.setFieldsValue({ parentId2: undefined });
        }
        //四级
        if (this.props.level == 4) {
          if(type == 1){
            this.props.form.setFieldsValue({
              parentId2: undefined,
              parentId3: undefined,
            });
          };
          if(type==2){
            this.props.form.setFieldsValue({
              parentId3: undefined,
            });
          };
        }
      });
    });
  };
  onCancel = () => {
    this.props.onCancel();
  };
  //保存
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { level } = this.props;
        let params = {};
        if (level == 2) {
          params.parentId = values.parentId;
        }
        if (level == 3) {
          params.parentId = values.parentId2;
        }
        if (level == 4) {
          params.parentId = values.parentId3;
        }
        if (this.props.id) {
          EditApi({ id: this.props.id, level, ...params }).then(res => {
            message.success("编辑分类成功");
          });
        } else {
          AddApi({ ...params, level }).then(res => {
            message.success("添加分类成功");
          });
        }
        this.props.form.resetFields();
        this.props.onOk();
      }
    });
  };
  renderForm() {
    const { level, id } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { catagoryList, catagoryList2, catagoryList3, infos } = this.state;
    switch (level) {
      case 1:
        return (
          <div>
            <FormItem
              label={"一级类目名称"}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入一级类目名称" }],
                initialValue: infos.name
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
            <FormItem
              label="状态"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("status", {
                rules: [{ required: true, message: "请选择状态" }],
                initialValue: infos.status
              })(
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value={2}>禁用</Option>
                  <Option value={1}>启用</Option>
                </Select>
              )}
            </FormItem>
          </div>
        );
      case 2:
        return (
          <div>
            <FormItem
              label={"类目名称"}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                initialValue: infos.name
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId", {
                rules: [{ required: true, message: "请输入类目名称" }],
                initialValue: infos.categoryId
              })(
                <Select placeholder="请选择">
                  {catagoryList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="状态"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("status", {
                rules: [{ required: true, message: "请选择状态" }],
                initialValue: infos.status
              })(
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value={2}>禁用</Option>
                  <Option value={1}>启用</Option>
                </Select>
              )}
            </FormItem>
          </div>
        );
      case 3:
        return (
          <div>
            <FormItem
              label={"类目名称"}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入三级类目名称" }],
                initialValue: infos.name
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
            <FormItem
              label="所属一级类目名称"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                initialValue: infos.categoryId,
                onChange: value => this.onChange(value, 1)
              })(
                <Select placeholder="请选择">
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
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId2", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                initialValue: infos.categoryId2
              })(
                <Select
                  disabled={!catagoryList2.length > 0}
                  placeholder="请选择"
                >
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
              label="状态"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("status", {
                rules: [{ required: true, message: "请选择状态" }],
                initialValue: infos.status
              })(
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value={2}>禁用</Option>
                  <Option value={1}>启用</Option>
                </Select>
              )}
            </FormItem>
          </div>
        );
      case 4:
        return (
          <div>
            <FormItem
              label={"类目名称"}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("categoryName", {
                rules: [{ required: true, message: "请输入四级类目名称" }],
                initialValue: infos.name
              })(<Input placeholder="最多20个字符" autoComplete="off" />)}
            </FormItem>
            <FormItem
              label="所属一级类目"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId1", {
                rules: [{ required: true, message: "请输入类目名称" }],
                onChange: value => this.onChange(value, 1),
                initialValue: infos.categoryId
              })(
                <Select placeholder="请选择">
                  {catagoryList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              label="所属二级类目"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId2", {
                rules: [{ required: true, message: "请输入二级类目名称" }],
                onChange: value => this.onChange(value, 2),
                initialValue: infos.categoryId2
              })(
                <Select
                  disabled={!catagoryList2.length > 0}
                  placeholder="请选择"
                >
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
              label="所属三级类目"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("parentId3", {
                rules: [{ required: true, message: "请选择三级类目" }],
                initialValue: infos.categoryId3
              })(
                <Select
                  disabled={!catagoryList3.length > 0}
                  placeholder="请选择三级类目"
                >
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
              label="状态"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("status", {
                rules: [{ required: true, message: "请选择状态" }],
                initialValue: infos.status
              })(
                <Select
                  allowClear={true}
                  placeholder="请选择状态"
                  className="select"
                >
                  <Option value={2}>禁用</Option>
                  <Option value={1}>启用</Option>
                </Select>
              )}
            </FormItem>
          </div>
        );
    }
  }
  render() {
    const { visible, text, id } = this.props;
    console.log(id + text);
    return (
      <div>
        <Modal
          title={id ? `编辑${text}目录` : `新增${text}目录`}
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
