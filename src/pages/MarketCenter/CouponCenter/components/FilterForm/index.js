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
          className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem
              label="优惠券名称"
              name="couponName">
                <Input placeholder="请输入优惠券名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="优惠券批次号"  name="couponCode">
                <Input placeholder="请输入优惠券批次号" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="创建人"  name="creater">
                <Input placeholder="请输入sku编码" autoComplete="off" />
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
              <FormItem label="优惠券状态"  name="status">
                <Select allowClear={true} placeholder="请选择优惠券状态">
                  <Option value='1'>发放中</Option>
                  <Option value='2'>发放完</Option>
                  <Option value='3'>熔断</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="是否过期"  name="isExpire">
                <Select allowClear={true} placeholder="请选择是否过期">
                  <Option value='1'>是</Option>
                  <Option value='2'>否</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="创建时间" name="time" {...this.formItemLayout2}>
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
