import '@ant-design/compatible/assets/index.css';
import { Input, Select, DatePicker, Row, Col, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
import { GetSupplierApi } from "api/home/BaseGoods";
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Search extends BaseFilter {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      supplierList: [],
    }
  }
  componentDidMount(){
    this.initPage();
  }
  initPage(){
    GetSupplierApi()
    .then(res => {
      this.setState({
        supplierList: res.result
      });
    });
  }
  render() {
    const { supplierList } = this.state;
    let  initialValues = this.props.inputValues;
    return (
      <div className="qtoolOms-condition">
        <Form
          {...this.formItemLayout}
          ref={this.formRef}
          initialValues={{...initialValues}}
          className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem
              label="商品名称"

              name="productName">
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SPU编码"  name="spuCode">
                <Input placeholder="请输入spu编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SKU编码"  name="skuCode">
                <Input placeholder="请输入sku编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品条码"  name="productName">
                <Input placeholder="请输入商品品牌" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="第三方商品编码"  name="outerProductCode">
                <Input placeholder="请输入第三方商品编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品品牌"  name="brandId">
                <Input placeholder="请输入商品品牌" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="保税仓"
                name="bondedWarehouseId">
                <Select placeholder="请选择" allowClear={true} onChange={this.onChangeCategoryCode}>
                  {supplierList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
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
