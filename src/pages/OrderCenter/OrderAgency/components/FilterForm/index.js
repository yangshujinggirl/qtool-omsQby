import { Form, Input, Row, Col, Select, DatePicker } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class FilterForm extends BaseFilter {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="来源" {...this.formItemLayout}>
                {getFieldDecorator("sourceCode")(
                  <Select placeholder='请选择'>
                    <Option value=''>所有</Option>
                    <Option value='掌柜'>掌柜订单</Option>
                    <Option value='android'>安卓订单</Option>
                    <Option value='小程序'>小程序订单</Option>
                    <Option value='ios'>IOS订单</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="联系电话" {...this.formItemLayout}>
                {getFieldDecorator("phone")(<Input placeholder="请输入" autoComplete='off'/>)}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品名称" {...this.formItemLayout}>
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入" autoComplete='off'/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="主单号" {...this.formItemLayout}>
                {getFieldDecorator("orderNo")(<Input placeholder="请输入" autoComplete='off'/>)}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="详情订单号" {...this.formItemLayout}>
                {getFieldDecorator("orderDetailNo")(
                  <Input placeholder="请输入" autoComplete='off'/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="下单时间" {...this.formItemLayout}>
                {getFieldDecorator("time")(
                  <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
          <div></div>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(FilterForm);
