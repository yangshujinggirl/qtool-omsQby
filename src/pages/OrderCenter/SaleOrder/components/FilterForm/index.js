import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import { BaseFilter, Qbtn } from "common";
import moment from 'moment'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

class Search extends BaseFilter {
  constructor(props) {
    super(props);
  }
  handleSubmit=()=>{
    this.props.form.validateFields((err,values)=>{
      const {time,..._values} = values;
      if(time&&time[0]){
        _values.stime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss')
        _values.etime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
      };
      this.props.onSubmit(_values)
    })
  }
  render() {
    const { shopId } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="订单编号" {...this.formItemLayout}>
                {getFieldDecorator("orderNo")(
                  <Input placeholder="请输入订单编号" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SKU商品编号" {...this.formItemLayout}>
                {getFieldDecorator("skuCode")(
                  <Input placeholder="请输入SKU商品编号" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="收货人" {...this.formItemLayout}>
                {getFieldDecorator("consignee")(
                  <Input placeholder="请输入收货人" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="联系电话" {...this.formItemLayout}>
                {getFieldDecorator("phone")(
                  <Input placeholder="请输入联系电话" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="渠道" {...this.formItemLayout}>
                {getFieldDecorator("sourceCode")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value="">所有</Option>
                    <Option value="QANDDROID,QIOS,QWCHAT">线上</Option>
                    <Option value="QPOS,QMANAGER">线下</Option>
                    <Option value="QPOS">pos</Option>
                    <Option value="QMANAGER">掌柜</Option>
                    <Option value="QANDDROID">安卓</Option>
                    <Option value="QIOS">ios</Option>
                    <Option value="QWCHAT">小程序</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="订单状态" {...this.formItemLayout}>
                {getFieldDecorator("orderStatus")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value="">所有</Option>
                    <Option value={210}>待发货</Option>
                    <Option value={230}>已发货</Option>
                    <Option value={999}>已完成</Option>
                    <Option value={310}>申请退货</Option>
                    <Option value={911}>订单关闭</Option>
                    <Option value={320}>退货中</Option>
                    <Option value={390}>退货完成</Option>
                    <Option value={0}>缺货中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                className="select_multiple"
                label="门店ID"
                {...this.formItemLayout}
              >
                {getFieldDecorator("channelCode", {
                  initialValue: shopId,
                  onChange:this.props.shopIdChange
                })(
                  <Select
                    maxTagTextLength={100}
                    maxTagCount={2}
                    allowClear={true}
                    mode="multiple"
                    placeholder="选择门店id"
                  >
                    {shopId.map(item => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
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
        </Form>
      </div>
    );
  }
}
const SearchForm = Form.create({
  mapPropsToFields(props) {
    return {
      channelCode: Form.createFormField({
        value: props.shopId,
      }),
    };
  },
})(Search);
export default SearchForm;
