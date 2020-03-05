import '@ant-design/compatible/assets/index.css';
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
          ref={this.formRef}
          className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem
              label="供应商名称"
              {...this.formItemLayout}
              name="name">
                <Input placeholder="请输入供应商名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="审核状态"
                {...this.formItemLayout}
                name="status">
                <Select placeholder="请选择" allowClear={true}>
                  <Option value={0} key={0}>待审核</Option>
                  <Option value={1} key={1}>已审核</Option>
                  <Option value={2} key={2}>审核不通过</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="合作状态"
                {...this.formItemLayout}
                name="cooperationStatus">
                <Select placeholder="请选择" allowClear={true}>
                  <Option value={1} key={1}>合作中</Option>
                  <Option value={2} key={2}>待合作</Option>
                  <Option value={3} key={3}>停止合作</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="账期类型"
                {...this.formItemLayout}
                name="accountsType">
                <Select placeholder="请选择" allowClear={true}>
                  <Option value={1} key={1}>现结</Option>
                  <Option value={2} key={2}>货到</Option>
                  <Option value={3} key={3}>票到</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit}>
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

export default Search;
