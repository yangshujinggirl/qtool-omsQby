import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
import { cooperationStatus, accountsType, statusOption } from '../../options';

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
                {
                  statusOption.map((el)=>(
                    <Option value={el.key} key={el.key}>{el.value}</Option>
                  ))
                }
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="合作状态"
                {...this.formItemLayout}
                name="cooperationStatus">
                <Select placeholder="请选择" allowClear={true}>
                  {
                    cooperationStatus.map((el)=> (
                      <Option value={el.key} key={el.key}>{el.value}</Option>
                    ))
                  }
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="账期类型"
                {...this.formItemLayout}
                name="accountsType">
                <Select placeholder="请选择" allowClear={true}>
                {
                  accountsType.map((el)=> (
                    <Option value={el.key} key={el.key}>{el.value}</Option>
                  ))
                }
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
