import '@ant-design/compatible/assets/index.css';
import { Input, Select, DatePicker, Row, Col, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Search extends BaseFilter {
  formRef = React.createRef();

  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          {...this.formItemLayout}
          ref={this.formRef}
          initialValues={this.props.initialValues}
          className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="优惠券批次号"  name="couponCode">
                <Input placeholder="请输入spu编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="用户手机"  name="userMobile">
                <Input placeholder="请输入用户手机" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="注券人"  name="voucher">
                <Input placeholder="请输入联系人" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="发放方式"  name="couponUseScene">
              <Select allowClear={true} placeholder="请选择发放方式">
                  <Option value='1'>注册领取</Option>
                  <Option value='3'>手动领取</Option>
                  <Option value='2'>注券</Option>
              </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="注券时间" name="time" {...this.formItemLayout2}>
                <RangePicker
                  placeholder={this.placeholder}
                  format={this.formatType}
                  showTime/>
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
