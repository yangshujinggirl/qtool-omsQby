import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, DatePicker, Cascader } from "antd";
import { BaseFilter, Qbtn,CascaderAddressOptions } from "common";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
class Search extends BaseFilter {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(CascaderAddressOptions)
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="门店名称" {...this.formItemLayout}>
                {getFieldDecorator("channelName")(
                  <Input placeholder="请输入门店名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="营业状态" {...this.formItemLayout}>
                {getFieldDecorator("channelStatus")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>开业中</Option>
                    <Option value={2}>待开业</Option>
                    <Option value={3}>关业中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="门店类型" {...this.formItemLayout}>
                {getFieldDecorator("channelType")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>直营</Option>
                    <Option value={2}>联营</Option>
                    <Option value={3}>加盟</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="省市区" {...this.formItemLayout}>
                {getFieldDecorator("address")(
                  <Cascader
                  options={CascaderAddressOptions}
                  placeholder="请选择地区" />
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
