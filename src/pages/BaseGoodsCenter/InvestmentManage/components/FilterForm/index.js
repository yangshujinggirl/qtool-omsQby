import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, DatePicker, Cascader } from "antd";
import { BaseFilter, Qbtn, CascaderAddressOptions } from "common";
import { statusOption } from '../../optionMap';
const FormItem = Form.Item;
const { Option } = Select;

const { RangePicker } = DatePicker;

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
              <FormItem label="客户姓名" {...this.formItemLayout}>
                {getFieldDecorator("name")(
                  <Input placeholder="请输入客户姓名" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="联系电话" {...this.formItemLayout}>
                {getFieldDecorator("phone")(
                  <Input placeholder="请输入联系电话" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="省市区" {...this.formItemLayout}>
                {getFieldDecorator('address')(
                    <Cascader
                      options={CascaderAddressOptions}
                      placeholder="请选择地区" />
                  )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="招商状态" {...this.formItemLayout}>
                {getFieldDecorator("status")(
                  <Select placeholder="请选择" allowClear={true}>
                  {
                    statusOption.map((el,index)=> (
                      <Option value={el.key} key={el.key}>{el.value}</Option>
                    ))
                  }
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
