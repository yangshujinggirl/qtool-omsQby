import { Form, Input, Select, Row, Col } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
class Search extends BaseFilter {
  constructor(props) {
    super(props);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="仓库名称" {...this.formItemLayout}>
                {getFieldDecorator("warehouseName")(
                  <Input placeholder="请输入仓库名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="仓库编码" {...this.formItemLayout}>
                {getFieldDecorator("warehouseCode")(
                  <Input placeholder="请输入仓库编码" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="仓库类型" {...this.formItemLayout}>
                {getFieldDecorator("warehouseType")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>大仓</Option>
                    <Option value={2}>门店仓</Option>
                    <Option value={3}>保税仓</Option>
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
