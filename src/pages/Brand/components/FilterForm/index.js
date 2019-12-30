import { Form, Input, Select, Row, Col } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const { Option } = Select;
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
              <FormItem label="品牌中文名称" {...this.formItemLayout}>
                {getFieldDecorator("brandNameCn")(
                  <Input placeholder="请输入品牌中文名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="品牌英文名称" {...this.formItemLayout}>
                {getFieldDecorator("brandNameEn")(
                  <Input placeholder="请输入品牌英文名称" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="品牌状态" {...this.formItemLayout}>
                {getFieldDecorator("status")(
                  <Select placeholder="请选择" allowClear={true}> 
                    <Option value={1}>启用</Option>
                    <Option value={0}>不启用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="品牌授权" {...this.formItemLayout}>
                {getFieldDecorator("isSq")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>有</Option>
                    <Option value={0}>无</Option>
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
