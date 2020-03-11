import React from "react";
import { Modal, Input, Select, message, Form, Layout } from "antd";
import { GetCategoryApi } from "api/home/BaseGoods";
import { AddApi, EditApi, getClassInfo } from "api/home/Classify";
const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 }
};
class AddModal extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      catagoryList1: [],
      catagoryList2: [],
      catagoryList3: [],
      catagoryList4: [],
      infos: {}
    };
  }
  /**
   * 初始化
   */
  componentDidMount = () => {
    const { id, level } = this.props;
    if (id) {
      this.getInfo(id, level);
    } else {
      if (level != 1) {
        this.getCategoryList1();
      }
    }
  };
  /**
   * 请求一级类目列表
   */
  getCategoryList1 = () => {
    GetCategoryApi({ level: 1, parentId: "" }).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          catagoryList1: res.result
        });
      }
    });
  };
  /**
   * 编辑页面初始化->请求详情
   */
  getInfo = (id, level) => {
    getClassInfo({ id }).then(res => {
      if (res.httpCode == 200) {
        this.getList(level, res.result); //请求类目列表
        const {
          name,
          categoryId,
          categoryId2,
          categoryId3,
          status
        } = res.result;
        this.formRef.current.setFieldsValue({
          categoryName: name,
          parentId1: categoryId,
          parentId2: categoryId2,
          parentId3: categoryId3,
          status
        });
      }
    });
  };
  /**
   * 请求各级类目列表
   */
  getList = (level, infos) => {
    if (level != 1) {
      this.getCategoryList(1, infos);
    }
    if (level == 3 || level == 4) {
      this.getCategoryList(2, infos);
    }
    if (level == 4) {
      this.getCategoryList(3, infos);
    }
  };
  /**
   * 请求各级类目列表
   *
   */
  getCategoryList = (level, infos) => {
    GetCategoryApi({
      level,
      parentId:
        level == 1
          ? ""
          : infos["categoryId" + (level - 1 == 1 ? "" : level - 1)]
    }).then(res => {
      if (res.httpCode == 200) {
        this.setState({
          ["catagoryList" + level]: res.result || []
        });
      }
    });
  };
  /**
   * 类目选择变化时
   */
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
          this.formRef.current.setFieldsValue({ parentId2: undefined });
        }
        //四级
        if (this.props.level == 4) {
          if (type == 1) {
            this.formRef.current.setFieldsValue({
              parentId2: undefined,
              parentId3: undefined
            });
          }
          if (type == 2) {
            this.formRef.current.setFieldsValue({
              parentId3: undefined
            });
          }
        }
      });
    });
  };
  onCancel = () => {
    this.props.onCancel();
  };
  /**
   * 保存
   */
  onOk = deBounce(async () => {
    const values = await this.formRef.current.validateFields();
    const params = this.formatValue(values);
    this.sendRequest(params);
  }, 500);
  /**
   * 格式化
   */
  formatValue = values => {
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
    params.categoryName = values.categoryName;
    params.status = values.status;
    return params;
  };
  /**
   *请求
   */
  sendRequest = params => {
    const { id, level } = this.props;
    if (id) {
      EditApi({ id, level, ...params }).then(res => {
        if (res.httpCode == 200) {
          message.success("编辑分类成功");
          this.formRef.current.resetFields();
          this.props.onOk();
        }
      });
    } else {
      AddApi({ ...params, level }).then(res => {
        if (res.httpCode == 200) {
          message.success("添加分类成功");
          this.formRef.current.resetFields();
          this.props.onOk();
        }
      });
    }
  };
  renderForm() {
    const { level, id } = this.props;
    const { catagoryList1, catagoryList2, catagoryList3 } = this.state;
    switch (level) {
      case 1:
        return (
          <div>
            <FormItem
              label={"一级类目名称"}
              name="categoryName"
              rules={[{ required: true, message: "请输入一级类目名称" }]}
            >
              <Input placeholder="最多20个字符" autoComplete="off" />
            </FormItem>
            <FormItem
              label="状态"
              name="status"
              rules={[{ required: true, message: "请选择状态" }]}
            >
              <Select
                allowClear={true}
                placeholder="请选择状态"
                className="select"
              >
                <Option value={0}>禁用</Option>
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
              name="categoryName"
              rules={[{ required: true, message: "请输入二级类目名称" }]}
            >
              <Input placeholder="最多20个字符" autoComplete="off" />
            </FormItem>
            <FormItem
              label="所属一级类目名称"
              name="parentId"
              rules={[{ required: true, message: "请输入类目名称" }]}
            >
              <Select placeholder="请选择">
                {catagoryList1.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="状态"
              name="status"
              rules={[{ required: true, message: "请选择状态" }]}
            >
              <Select
                allowClear={true}
                placeholder="请选择状态"
                className="select"
              >
                <Option value={0}>禁用</Option>
                <Option value={1}>启用</Option>
              </Select>
            </FormItem>
          </div>
        );
      case 3:
        return (
          <div>
            <FormItem
              label={"类目名称"}
              name="categoryName"
              rules={[{ required: true, message: "请输入三级类目名称" }]}
            >
              <Input placeholder="最多20个字符" autoComplete="off" />
            </FormItem>
            <FormItem
              label="所属一级类目名称"
              name="parentId1"
              rules={[{ required: true, message: "请输入类目名称" }]}
            >
              <Select
                onChange={value => this.onChange(value, 1)}
                placeholder="请选择"
              >
                {catagoryList1 &&
                  catagoryList1.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
              </Select>
            </FormItem>
            <FormItem
              label="所属二级类目名称"
              name="parentId2"
              rules={[{ required: true, message: "请输入二级类目名称" }]}
            >
              <Select disabled={!catagoryList2.length > 0} placeholder="请选择">
                {catagoryList2 &&
                  catagoryList2.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
              </Select>
            </FormItem>
            <FormItem label="状态" name="status">
              <Select
                allowClear={true}
                placeholder="请选择状态"
                className="select"
              >
                <Option value={0}>禁用</Option>
                <Option value={1}>启用</Option>
              </Select>
            </FormItem>
          </div>
        );
      case 4:
        return (
          <div>
            <FormItem
              label={"类目名称"}
              name="categoryName"
              rules={[{ required: true, message: "请输入四级类目名称" }]}
            >
              <Input placeholder="最多20个字符" autoComplete="off" />
            </FormItem>
            <FormItem
              label="所属一级类目"
              name="parentId1"
              rules={[{ required: true, message: "请输入类目名称" }]}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 12 }}
            >
              <Select
                onChange={value => this.onChange(value, 1)}
                placeholder="请选择"
              >
                {catagoryList1.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="所属二级类目"
              name="parentId2"
              rules={[{ required: true, message: "请输入二级类目名称" }]}
            >
              <Select
                onChange={value => this.onChange(value, 2)}
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
            </FormItem>
            <FormItem
              label="所属三级类目"
              name="parentId3"
              rules={[{ required: true, message: "请选择三级类目" }]}
            >
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
            </FormItem>
            <FormItem
              label="状态"
              name="status"
              rules={[{ required: true, message: "请选择状态" }]}
            >
              <Select
                allowClear={true}
                placeholder="请选择状态"
                className="select"
              >
                <Option value={0}>禁用</Option>
                <Option value={1}>启用</Option>
              </Select>
            </FormItem>
          </div>
        );
    }
  }
  render() {
    const { visible, text, id } = this.props;
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
          <Form ref={this.formRef} {...formLayout}>
            {this.renderForm()}
          </Form>
        </Modal>
      </div>
    );
  }
}

export default AddModal;
