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
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          {...this.formItemLayout}
          className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="版本名称" name="versionName">
                <Input placeholder="请输入版本名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="发布时间" name="time">
                <RangePicker format="YYYY-MM-DD HH:mm:ss" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="版本状态" name="status">
                <Select allowClear={true} placeholder="请选择活动状态">
                  <Option value={1} key={1}>草稿中</Option>
                  <Option value={2} key={2}>待发布</Option>
                  <Option value={0} key={0}>线上版本</Option>
                  <Option value={4} key={4}>已下线</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="版本编号" name="versionCode">
                <Input placeholder="请输入版本编号" autoComplete="off" />
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
