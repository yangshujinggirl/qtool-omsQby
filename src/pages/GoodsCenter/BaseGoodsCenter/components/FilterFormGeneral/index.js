import '@ant-design/compatible/assets/index.css';
import { AutoComplete, Input, Select, DatePicker, Row, Col, Form } from "antd";
import { BaseFilter, Qbtn } from "common";
import { GetBrandApi, GetCategoryApi } from "api/home/BaseGoods";
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
class Search extends BaseFilter {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      catagoryList: [],
      catagoryList2: [],
      brandList: []
    }
  }
  componentDidMount(){
    this.initPage();
  }
  //品牌搜索
  handleSearch=(value)=> {
    GetBrandApi({brandName:value})
    .then((res)=> {
      let { result } =res;
      result=result?result:[];
      this.setState({ brandList:result });
    })
  }
  initPage(){
    GetCategoryApi({ level: 1, parentId: "" })
    .then(res => {
      this.setState({
        catagoryList: res.result
      });
    });
  }
  onChangeCategoryCode = (value) => {
    this.formRef.current.resetFields(['categoryCode2']);
    this.setState({catagoryList2:[]});
    if (value) {
      GetCategoryApi({ level: -1, parentId: value }).then(res => {
        this.setState({
          catagoryList2: res.result || []
        });
      });
    }
  }

  render() {
    const { catagoryList, catagoryList2, brandList } = this.state;
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
              <FormItem label="商品名称" name="productName">
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SPU编码" name="spuCode">
                <Input placeholder="请输入spu编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SKU编码" name="skuCode">
                <Input placeholder="请输入sku编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品条码" name="barCode">
                <Input placeholder="请输入商品条码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品品牌" name="brandId">
                <AutoComplete
                 autoComplete="off"
                 onSearch={this.handleSearch}
                 placeholder="请选择商品品牌">
                 {
                   brandList.map((el)=> (
                     <Option key={el.id} value={el.brandNameCn}>
                        {el.brandNameCn}
                     </Option>
                   ))
                 }
                </AutoComplete>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="一级类目" name="categoryCode1">
                <Select placeholder="请选择" allowClear={true} onChange={this.onChangeCategoryCode}>
                  {catagoryList.map(item => (
                    <Select.Option value={item.categoryCode} key={item.categoryCode}>
                      {item.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="二级类目" name="categoryCode2">
                <Select
                  placeholder="请选择"
                  disabled={!catagoryList2.length > 0}
                  allowClear={true}>
                  {catagoryList2.map(item => (
                    <Select.Option value={item.categoryCode} key={item.categoryCode}>
                      {item.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品类型" name="productType">
                <Select placeholder="请选择" allowClear={true}>
                  <Select.Option value={1}>普通商品</Select.Option>
                  <Select.Option value={2}>赠品</Select.Option>
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
