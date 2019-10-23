import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import { BaseFilter, Qbtn } from "common";
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
              <FormItem label="订单编号" {...this.formItemLayout}>
                {getFieldDecorator("orderNo")(
                  <Input placeholder="请输入渠道订单编号" autoComplete="off" />
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
              <FormItem label="收货人" {...this.formItemLayout}>
                {getFieldDecorator("consignee")(
                  <Input placeholder="请输入收货人" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="下单时间" {...this.formItemLayout}>
                {getFieldDecorator("time")(
                  <RangePicker
                    placeholder={this.placeholder}
                    format={this.formatType}
                    showTime
                  />
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
