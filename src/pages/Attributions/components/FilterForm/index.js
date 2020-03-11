import { Input, Row, Col, Select, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
const Option = Select.Option;
const FormItem = Form.Item;

class Search extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          {...this.formItemLayout}
          ref={this.formRef}
          className="serach-common-form"
        >
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem name="attributeName" label="规格名称">
                  <Input placeholder="请输入规格名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="attributeState" label="状态">
                <Select placeholder="请选择状态" allowClear={true}>
                  <Option value={0}>禁用</Option>
                  <Option value={1}>启用</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <FormItem offset={21} className="oms-condition-operate">
          <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
            搜索
          </Qbtn>
        </FormItem>
      </div>
    );
  }
}
export default Search;
