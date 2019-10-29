import { Form, Input, Row, Col, Select } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const {Option} = Select
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
              <FormItem label="供应商" {...this.formItemLayout}>
                {getFieldDecorator("name")(
                  <Input placeholder="请输入供应商" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="状态" {...this.formItemLayout}>
                {getFieldDecorator("cooperationStatus")(
                  <Select allowClear='true' placeholder='请选择'>
                    <Option value={1}>合作中</Option>
                    <Option value={2}>待合作</Option>
                    <Option value={3}>停止合作</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="账期类型" {...this.formItemLayout}>
                {getFieldDecorator("accountsType")(
                  <Select allowClear={true} placeholder='请选择'>
                    <Option value={1}>现结</Option>
                    <Option value={2}>票到付款</Option>
                    <Option value={3}>货到付款</Option>
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
