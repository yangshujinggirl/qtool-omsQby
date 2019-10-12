import { Form, Input, Row, Col } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { level } = this.props;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            {level == 1 && (
              <Col {...this.colspans}>
                <FormItem label="一级类目名称" {...this.formItemLayout}>
                  {getFieldDecorator("categoryName")(
                    <Input
                      placeholder="请输入一级类目名称"
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            )}
            {level == 2 && (
              <Col {...this.colspans}>
                <FormItem label="二级类目名称" {...this.formItemLayout}>
                  {getFieldDecorator("categoryName2")(
                    <Input
                      placeholder="请输入二级类目名称"
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            )}
            {level == 3 && (
              <Col {...this.colspans}>
                <FormItem label="三级类目名称" {...this.formItemLayout}>
                  {getFieldDecorator("categoryName3")(
                    <Input
                      placeholder="请输入三级类目名称"
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            )}
            {level == 4 && (
              <Col {...this.colspans}>
                <FormItem label="四级类目名称" {...this.formItemLayout}>
                  {getFieldDecorator("categoryName4")(
                    <Input
                      placeholder="请输入四级类目名称"
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            )}
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
