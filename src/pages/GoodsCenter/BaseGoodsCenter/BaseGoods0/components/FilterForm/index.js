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
    this.state = {
      catagoryList: [],
      catagoryList2: []
    }
  }
  componentDidMount(){
    this.initPage();
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
    const { catagoryList, catagoryList2 } = this.state;
    let  initialValues = this.props.inputValues;
    return (
      <div className="qtoolOms-condition">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{...initialValues}}
          className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem
              label="商品名称"
              {...this.formItemLayout}
              name="productName">
                <Input placeholder="请输入商品名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SPU编码" {...this.formItemLayout} name="spuCode">
                <Input placeholder="请输入spu编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="SKU编码" {...this.formItemLayout} name="skuCode">
                <Input placeholder="请输入sku编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品条码" {...this.formItemLayout} name="productName">
                <Input placeholder="请输入商品品牌" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品品牌" {...this.formItemLayout} name="brandId">
                <Input placeholder="请输入商品品牌" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="一级类目"
                {...this.formItemLayout}
                name="categoryCode1">
                <Select placeholder="请选择" allowClear={true} onChange={this.onChangeCategoryCode}>
                  {catagoryList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="二级类目"
                {...this.formItemLayout}
                name="categoryCode2">
                <Select
                  placeholder="请选择"
                  disabled={!catagoryList2.length > 0}
                  allowClear={true}>
                  {catagoryList2.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品类型" name="productType" {...this.formItemLayout}>
                <Select placeholder="请选择" allowClear={true}>
                  <Option value={1}>普通商品</Option>
                  <Option value={2}>赠品</Option>
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
