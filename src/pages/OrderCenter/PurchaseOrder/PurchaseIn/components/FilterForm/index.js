import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, DatePicker, AutoComplete } from "antd";
import { BaseFilter, Qbtn } from "common";
const FormItem = Form.Item;
const { Option } = Select;

const { RangePicker } = DatePicker;

class Search extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      suppliersList:[]
    };
  }
  //供应商名称选中事件
  autoSelect(value, option) {
    let { suppliersList } =this.state;
    let item = suppliersList.find((el)=> el.value== value);
  }
  //品牌搜索
  handleSearch=(value)=> {

  }
  render() {
    const { suppliersList }=this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="采购单号" {...this.formItemLayout}>
                {getFieldDecorator("stockingCode")(
                  <Input placeholder="请输入采购单号" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SKU" {...this.formItemLayout}>
                {getFieldDecorator("itemCode")(
                  <Input placeholder="请输入SKU" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品名称" {...this.formItemLayout}>
                {getFieldDecorator("itemName")(
                  <Input placeholder="请输入商品名称" autoComplete="off"/>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label='供应商名称' {...this.formItemLayout}>
                 {
                   getFieldDecorator('suppliersName')(
                     <AutoComplete
                      autoComplete="off"
                      dataSource={suppliersList}
                      onSearch={this.handleSearch}
                      onSelect={(value, option)=>this.autoSelect(value, option)}
                      placeholder="请选择供应商名称"/>
                   )
                 }
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="时间" {...this.formItemLayout}>
                {getFieldDecorator("time")(
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
