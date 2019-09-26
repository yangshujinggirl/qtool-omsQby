import { Form, Input, Select, DatePicker, Row, Col } from "antd";
import { moment } from "moment";
import { BaseFilter, Qbtn } from "common";
import { getOneCategoryApi, getSubCategoryApi } from "api/home/BaseGoods";
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Search extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      catagoryList: [],
      catagoryList2: [],
    };
  }
  componentDidMount = () => {
    this.initPage();
  };
  initPage = () => {
    getOneCategoryApi({ level: 1 }).then(res => {
      this.setState({
        catagoryList: res.result
      });
    });
  };
  onChange = value => {
    getSubCategoryApi({ parentId: value }).then(res => {
      this.setState({
        catagoryList2: res.result
      });
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { catagoryList, catagoryList2 } = this.state;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="商品名称" {...this.formItemLayout}>
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入商品名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="spu编码" {...this.formItemLayout}>
                {getFieldDecorator("spuCode")(
                  <Input placeholder="请输入spu编码" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="sku编码" {...this.formItemLayout}>
                {getFieldDecorator("skuCode")(
                  <Input placeholder="请输入sku编码" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="上架状态" {...this.formItemLayout}>
                {getFieldDecorator("productNature")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>普通商品</Option>
                    <Option value={2}>跨境商品</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品品牌" {...this.formItemLayout}>
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入商品品牌" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="一级类目" {...this.formItemLayout}>
                {getFieldDecorator("categoryCode1", {
                  onChange: this.onChange
                })(
                  <Select placeholder="请选择" allowClear={true}>
                    {catagoryList.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="二级类目" {...this.formItemLayout}>
                {getFieldDecorator("categoryCode2")(
                  <Select
                    placeholder="请选择"
                    disabled={!catagoryList2.length > 0}
                    allowClear={true}
                  >
                    {catagoryList2.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="同步时间" {...this.formItemLayout}>
                {getFieldDecorator("time",{
                  initialValue:this.initTime
                })(
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
