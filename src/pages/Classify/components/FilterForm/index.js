import { Form, Input, Row, Col, Select } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const { Option } = Select;

class Search extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };
  //一级分类
  Category1 = () => {
    const { level } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem label="一级类目名称" {...this.formItemLayout}>
            {getFieldDecorator("categoryName")(
              <Input placeholder="请输入一级类目名称" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem
            label="状态"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("status")(
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
        </Col>
      </React.Fragment>
    );
  };
  //二级分类
  Category2 = () => {
    const { level } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem label="一级类目" {...this.formItemLayout}>
            {getFieldDecorator("categoryName")(
              <Input placeholder="请输入一级类目名称" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="二级类目" {...this.formItemLayout}>
            {getFieldDecorator("categoryName2")(
              <Input placeholder="请输入二级类目名称" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem
            label="二级类目状态"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("status")(
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
        </Col>
      </React.Fragment>
    );
  };
  //三级分类
  Category3 = () => {
    const { level } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem label="一级类目" {...this.formItemLayout}>
            {getFieldDecorator("categoryName")(
              <Input placeholder="请输入一级类目" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="二级类目" {...this.formItemLayout}>
            {getFieldDecorator("categoryName2")(
              <Input placeholder="请输入二级类目" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="三级类目" {...this.formItemLayout}>
            {getFieldDecorator("categoryName3")(
              <Input placeholder="请输入三级类目" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem
            label="三级类目状态"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("status")(
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
        </Col>
      </React.Fragment>
    );
  };
  //四级分类
  Category4 = () => {
    const { level } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem label="一级类目名称" {...this.formItemLayout}>
            {getFieldDecorator("categoryName")(
              <Input placeholder="请输入一级类目名称" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="二级类目名称" {...this.formItemLayout}>
            {getFieldDecorator("categoryName2")(
              <Input placeholder="请输入二级类目名称" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="三级类目名称" {...this.formItemLayout}>
            {getFieldDecorator("categoryName3")(
              <Input placeholder="请输入三级类目名称" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="四级类目名称" {...this.formItemLayout}>
            {getFieldDecorator("categoryName4")(
              <Input placeholder="请输入四级类目名称" autoComplete="off" />
            )}
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem
            label="状态"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("status")(
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
        </Col>
      </React.Fragment>
    );
  };
  render() {
    const { level } = this.props;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            {level == 1 && this.Category1()}
            {level == 2 && this.Category2()}
            {level == 3 && this.Category3()}
            {level == 4 && this.Category4()}
            <Col span={24}>
              <FormItem className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
                  搜索
                </Qbtn>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
const SearchForm = Form.create({})(Search);
export default SearchForm;
