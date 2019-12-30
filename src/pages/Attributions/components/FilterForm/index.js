import { Form, Input, Row, Col, Select } from "antd";
import { BaseFilter, Qbtn } from "common";
const Option = Select.Option;
const FormItem = Form.Item;
class Search extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="规格名称" {...this.formItemLayout}>
                {getFieldDecorator("attributeName")(
                  <Input placeholder="请输入规格名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="状态" {...this.formItemLayout}>
                {getFieldDecorator("attributeState")(
                  <Select placeholder="请选择状态" allowClear={true}>
                    <Option value={0}>禁用</Option>
                    <Option value={1}>启用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
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
