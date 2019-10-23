import { Form, Input, Select, Row, Col } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
class Search extends BaseFilter {
  constructor(props) {
    super(props);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="订单编号" {...this.formItemLayout}>
                {getFieldDecorator("warehouseName")(
                  <Input placeholder="请输入订单编号" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="门店编号" {...this.formItemLayout}>
                {getFieldDecorator("warehouseName")(
                  <Input placeholder="请输入门店编号" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="区域" {...this.formItemLayout}>
                {getFieldDecorator("warehouseName")(
                  <Input placeholder="请输入门店名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="门店名称" {...this.formItemLayout}>
                {getFieldDecorator("warehouseName")(
                  <Input placeholder="请输入门店名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SKU商品编号" {...this.formItemLayout}>
                {getFieldDecorator("warehouseCode")(
                  <Input placeholder="请输入SKU商品编号" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="收货人" {...this.formItemLayout}>
                {getFieldDecorator("warehouseName")(
                  <Input placeholder="请输入收货人" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="联系电话" {...this.formItemLayout}>
                {getFieldDecorator("warehouseCode")(
                  <Input placeholder="请输入联系电话" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="渠道" {...this.formItemLayout}>
                {getFieldDecorator("warehouseType")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>所有</Option>
                    <Option value={2}>线上</Option>
                    <Option value={3}>线下</Option>
                    <Option value={3}>pos</Option>
                    <Option value={3}>掌柜</Option>
                    <Option value={3}>安卓</Option>
                    <Option value={3}>ios</Option>
                    <Option value={3}>小程序</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="渠道" {...this.formItemLayout}>
                {getFieldDecorator("warehouseType")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>所有</Option>
                    <Option value={2}>线上</Option>
                    <Option value={3}>线下</Option>
                    <Option value='QPOS'>pos</Option>
                    <Option value='QMANAGER'>掌柜</Option>
                    <Option value='QANDROID'>安卓</Option>
                    <Option value='QIOS'>ios</Option>
                    <Option value='QWCHAT'>小程序</Option>
                  </Select>
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
