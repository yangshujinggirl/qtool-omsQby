import { Input, Select, Row, Col, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const { Option } = Select;
class Search extends BaseFilter {
  formRef = React.createRef();
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          className="serach-common-form"
          ref={this.formRef}
          {...this.formItemLayout}
        >
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem name="brandNameCn" label="品牌中文名称">
                <Input placeholder="请输入品牌中文名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="brandNameEn" label="品牌英文名称">
                <Input placeholder="请输入品牌英文名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="status" label="品牌状态">
                <Select placeholder="请选择" allowClear={true}>
                  <Option value={1}>启用</Option>
                  <Option value={0}>不启用</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="isSq" label="品牌授权">
                <Select placeholder="请选择" allowClear={true}>
                  <Option value={1}>有</Option>
                  <Option value={0}>无</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Col offset={21}>
          <FormItem className="oms-condition-operate">
            <Qbtn type="primary" onClick={this.handleSubmit}>
              搜索
            </Qbtn>
          </FormItem>
        </Col>
      </div>
    );
  }
}
export default Search;
