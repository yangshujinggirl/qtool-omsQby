import { Input, Select, Row, Col, DatePicker, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

class Search extends BaseFilter {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };
    this.colspans2={
      xs: 24,
      md: 12,
      xl: 8,
      xxl:6
    }
  }
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} className="serach-common-form">
          <Row>
            <Col {...this.colspans}>
              <FormItem
                label="商品名称"
                {...this.formItemLayout}
                name="productName"
              >
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="spu编码" {...this.formItemLayout} name="spuCode">
                <Input placeholder="请输入spu编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="sku编码" {...this.formItemLayout} name="skuCode">
                <Input placeholder="请输入sku编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="审核状态" {...this.formItemLayout} name="status">
                <Select placeholder="请选择" allowClear={true}>
                  <Option value={1} key={1}>
                    待审核
                  </Option>
                  <Option value={2} key={2}>
                    审核通过
                  </Option>
                  <Option value={3} key={3}>
                    审核不通过
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans2}>
              <FormItem label="提报时间" {...this.formItemLayout} name="time">
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </FormItem>
            </Col>
            <Col {...this.colspans2}>
              <FormItem label="审核时间" {...this.formItemLayout} name="time2">
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
export default Search;
