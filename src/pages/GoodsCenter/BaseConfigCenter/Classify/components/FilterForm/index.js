import { Input, Row, Col, Select, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const { Option } = Select;

class Search extends BaseFilter {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = async () => {
    const values = await this.formRef.current.validateFields();
    this.props.onSubmit(values);
  };
  //一级分类
  Category1 = () => {
    const { level } = this.props;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem name="categoryName" label="一级类目">
            <Input placeholder="请输入一级类目名称" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="一级类目状态" name="status">
            <Select
              allowClear={true}
              placeholder="请选择状态"
              className="select"
            >
              <Option value={0}>禁用</Option>
              <Option value={1}>启用</Option>
            </Select>
          </FormItem>
        </Col>
      </React.Fragment>
    );
  };
  //二级分类
  Category2 = () => {
    const { level } = this.props;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem label="一级类目" name="categoryName">
            <Input placeholder="请输入一级类目名称" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="二级类目" name="categoryName2">
            <Input placeholder="请输入二级类目名称" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem label="二级类目状态" name="status">
            <Select
              allowClear={true}
              placeholder="请选择状态"
              className="select"
            >
              <Option value={0}>禁用</Option>
              <Option value={1}>启用</Option>
            </Select>
          </FormItem>
        </Col>
      </React.Fragment>
    );
  };
  //三级分类
  Category3 = () => {
    const { level } = this.props;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem name="categoryName" label="一级类目">
            <Input placeholder="请输入一级类目" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem name="categoryName2" label="二级类目">
            <Input placeholder="请输入二级类目" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem name="categoryName3" label="三级类目">
            <Input placeholder="请输入三级类目" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem name="status" label="三级类目状态">
            <Select
              allowClear={true}
              placeholder="请选择状态"
              className="select"
            >
              <Option value={0}>禁用</Option>
              <Option value={1}>启用</Option>
            </Select>
          </FormItem>
        </Col>
      </React.Fragment>
    );
  };
  //四级分类
  Category4 = () => {
    const { level } = this.props;
    return (
      <React.Fragment>
        <Col {...this.colspans}>
          <FormItem name="categoryName" label="一级类目">
            <Input placeholder="请输入一级类目名称" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem name="categoryName2" label="二级类目">
            <Input placeholder="请输入二级类目名称" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem name="categoryName3" label="三级类目">
            <Input placeholder="请输入三级类目名称" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem name="categoryName4" label="四级类目">
            <Input placeholder="请输入四级类目名称" autoComplete="off" />
          </FormItem>
        </Col>
        <Col {...this.colspans}>
          <FormItem name="status" label="四级类目状态">
            <Select
              allowClear={true}
              placeholder="请选择状态"
              className="select"
            >
              <Option value={0}>禁用</Option>
              <Option value={1}>启用</Option>
            </Select>
          </FormItem>
        </Col>
      </React.Fragment>
    );
  };
  render() {
    const { level } = this.props;
    return (
      <div className="qtoolOms-condition">
        <Form {...this.formItemLayout} ref={this.formRef} className="serach-common-form">
          <Row gutter={24}>
            {level == 1 && this.Category1()}
            {level == 2 && this.Category2()}
            {level == 3 && this.Category3()}
            {level == 4 && this.Category4()}
          </Row>
        </Form>
        <FormItem className="oms-condition-operate">
          <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
            搜索
          </Qbtn>
        </FormItem>
      </div>
    );
  }
}
export default Search;
