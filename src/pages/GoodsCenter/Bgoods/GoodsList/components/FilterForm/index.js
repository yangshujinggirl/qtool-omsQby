import { Form, Input, Select, DatePicker, Row, Col } from "antd";
import { moment } from "moment";
import { BaseFilter, Qbtn } from "common";
import { GetCategoryApi } from "api/home/BaseGoods";
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class Search extends BaseFilter {
  constructor(props) {
    super(props);
    this.state = {
      catagoryList: [],
      catagoryList2: []
    };
  }
  componentDidMount = () => {
    this.initPage();
  };
  initPage = () => {
    GetCategoryApi({ level: 1, parentId: "" }).then(res => {
      this.setState({
        catagoryList: res.result
      });
    });
  };
  onChange = value => {
    this.props.form.resetFields(["categoryCode2"]);
    this.setState({ catagoryList2: [] });
    if (value) {
      GetCategoryApi({ level: -1, parentId: value }).then(res => {
        this.setState({
          catagoryList2: res.result || []
        });
      });
    }
  };
  handleSubmit=()=>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const {time,..._values} = values;
        if (time && time[0]) {
          _values.lastUpperShelvesTimeStart = moment(time[0], "YYYY-MM-DD H:mm:ss");
          _values.lastUpperShelvesTimeEnd = moment(time[1], "YYYY-MM-DD H:mm:ss");
        };
        this.props.onSubmit(_values)
      };
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { catagoryList, catagoryList2 } = this.state;
    return ( 
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
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
              <FormItem label="商品名称" {...this.formItemLayout}>
                {getFieldDecorator("productName")(
                  <Input placeholder="请输入商品名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品品牌" {...this.formItemLayout}>
                {getFieldDecorator("brandName")(
                  <Input placeholder="请输入商品品牌" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="一级类目" {...this.formItemLayout}>
                {getFieldDecorator("pdCategory1Id", {
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
                {getFieldDecorator("pdCategory2Id")(
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
              <FormItem label="商品类型" {...this.formItemLayout}>
                {getFieldDecorator("productType")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>正常销售品</Option>
                    <Option value={2}>赠品</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品标签" {...this.formItemLayout}>
                {getFieldDecorator("productTag")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={1}>新品</Option>
                    <Option value={2}>畅销</Option>
                    <Option value={3}>预售</Option>
                    <Option value={4}>多规格</Option>
                    <Option value={5}>缺图文</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品状态" {...this.formItemLayout}>
                {getFieldDecorator("bStatus")(
                  <Select placeholder="请选择" allowClear={true}>
                    <Option value={0}>待引用</Option>
                    <Option value={1}>上架中</Option>
                    <Option value={2}>已下架</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col {...this.colspans}>
              <FormItem label="创建时间" {...this.formItemLayout}>
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
const SearchForm = Form.create({})(Search);
export default SearchForm;
