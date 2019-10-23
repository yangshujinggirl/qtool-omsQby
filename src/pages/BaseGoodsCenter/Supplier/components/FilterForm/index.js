import { Form, Input,Row, Col } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
class Search extends BaseFilter {
  constructor(props) {
    super(props);
    this.state={
      dataSource:[]
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="sku编码" {...this.formItemLayout}>
                {getFieldDecorator("skuCode")(
                  <Input placeholder="请输入仓库名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="供应商" {...this.formItemLayout}>
              {getFieldDecorator("supplierName")(
                  <Input placeholder="请输入供应商" autoComplete="off" />
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
