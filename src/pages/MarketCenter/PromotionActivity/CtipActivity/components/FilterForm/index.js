import '@ant-design/compatible/assets/index.css';
import { Input, Select, DatePicker, Row, Col, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
import { GetCategoryApi } from "api/home/BaseGoods";
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Search extends BaseFilter {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          {...this.formItemLayout}
          className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="商品编码" name="pdCode">
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="活动ID" name="promotionId">
                <Input placeholder="请输入spu编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="活动名称" name="name">
                <Input placeholder="请输入sku编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="活动状态" name="status">
                <Select allowClear={true} placeholder="请选择活动状态">
                  <Option value={0} key={0}>全部</Option>
                  <Option value={1} key={1}>待提交</Option>
                  <Option value={2} key={2}>审核中</Option>
                  <Option value={3} key={3}>待开始</Option>
                  <Option value={4} key={4}>进行中</Option>
                  <Option value={5} key={5}>已结束</Option>
                  <Option value={6} key={6}>已作废</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="促销类型" name="type">
                <Select allowClear={true} placeholder="请选择促销类型">
                  <Option value={0} key={0}>全部</Option>
                  <Option key={10} value={10}>单品直降</Option>
                  <Option key={11} value={11}>单品多级满赠</Option>
                  <Option key={20} value={20}>专区多级满元赠</Option>
                  <Option key={21} value={21}>专区多级满件赠</Option>
                  <Option key={22} value={22}>专区多级满元减</Option>
                  <Option key={23} value={23}>专区满件减免</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="发起人" name="createUser">
                <Input placeholder="请输入发起人" autoComplete="off" />
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
