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
        catagoryList:[],
        categoryCode2:[],
        catagoryList2:[]
    }
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
    this.props.form.resetFields(['categoryCode2'])
    this.setState({catagoryList2:[]});
    if (value) {
      GetCategoryApi({ level: -1, parentId: value }).then(res => {
        this.setState({
          catagoryList2: res.result || []
        });
      });
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { catagoryList=[], catagoryList2=[] } = this.state;
    return (
      <div className="qtoolOms-condition">
        <Form className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="商品名称" {...this.formItemLayout}>
                {getFieldDecorator("channelName")(
                  <Input placeholder="请输入商品名称" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="spu编码" {...this.formItemLayout}>
                {getFieldDecorator("channelName")(
                  <Input placeholder="请输入spu编码" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="sku编码" {...this.formItemLayout}>
                {getFieldDecorator("channelName")(
                  <Input placeholder="请输入sku编码" autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="一级类目" {...this.formItemLayout}>
                {getFieldDecorator("categoryCode1", {
                  onChange: this.onChange
                })(
                  <Select placeholder="请选择" allowClear={true}>
                    {catagoryList.length>0&&catagoryList.map(item => (
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
                    {catagoryList2.length>0&&catagoryList2.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="提交人" {...this.formItemLayout}>
                {getFieldDecorator("channelName")(
                  <Input placeholder="请输入提交人" autoComplete="off" />
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
