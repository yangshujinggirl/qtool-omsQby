import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, DatePicker, Cascader } from "antd";
import { BaseFilter, Qbtn } from "common";
import { GetCategoryApi } from "api/home/BaseGoods";
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
class Search extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      catagoryList: [],
      categoryCode2: [],
      catagoryList2: []
    };
    // 表单的列布局
    this.colspans2 = {
      xs: 24,
      md:12,
      xl: 8,
      xxl: 6,
    };
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      const { time, time2, ..._values } = values;
      if (time && time[0]) {
        //提报时间
        _values.create_stime = moment(time[0]).format("YYYY-MM-DD HH:mm:ss");
        _values.create_etime = moment(time[1]).format("YYYY-MM-DD HH:mm:ss");
      }
      if (time2 && time2[0]) {
        //审核时间
        _values.update_stime = moment(time2[0]).format("YYYY-MM-DD HH:mm:ss");
        _values.update_etime = moment(time2[1]).format("YYYY-MM-DD HH:mm:ss");
      }
      this.props.onSubmit(_values);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { catagoryList, catagoryList2 } = this.state;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={8}>
            <Col {...this.colspans}>
              <FormItem label="商品名称" {...this.formItemLayout}>
                {getFieldDecorator("channelName")(
                  <Input placeholder="请输入商品名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="spu编码" {...this.formItemLayout}>
                {getFieldDecorator("spuCode")(
                  <Input placeholder="请输入spu编码" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="sku编码" {...this.formItemLayout}>
                {getFieldDecorator("skuCode")(
                  <Input placeholder="请输入sku编码" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="审核状态" {...this.formItemLayout}>
                {getFieldDecorator("status")(
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
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans2}>
              <FormItem label="提报时间" {...this.formItemLayout}>
                {getFieldDecorator("time")(
                  <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans2}>
              <FormItem label="审核时间" {...this.formItemLayout}>
                {getFieldDecorator("time2")(
                  <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem wrapperCol={{span:24}} className="oms-condition-operate">
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
