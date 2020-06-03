import '@ant-design/compatible/assets/index.css';
import { Input, Form, Select, DatePicker, Row, Col } from "antd";
import { BaseFilter, Qbtn } from "common";
import { GetCategoryApi } from "api/home/BaseGoods";
const FormItem = Form.Item;
const { Option } = Select;

class Search extends BaseFilter {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      catagoryList: [],
      catagoryList2: [],
      catagoryList3: [],
      catagoryList4: [],
    };
  }
  componentDidMount = () => {
    this.getCategoryList(1)
  };
  getCategoryList(level,parentId) {
    GetCategoryApi({ level, parentId })
    .then(res => {
      let list = res.result?res.result:[];
      switch(level) {
        case 1:
          this.setState({ catagoryList: list });
          break;
        case 2:
          this.setState({ catagoryList2: list });
          break;
        case 3:
          this.setState({ catagoryList3: list });
          break;
        case 4:
          this.setState({ catagoryList4: list });
          break;
      }
    });
  }
  onSelectCatagory = (level,value) => {
    switch(level) {
      case 1:
        this.setState({ catagoryList3: [],catagoryList4:[] });
        this.formRef.current.resetFields(['categoryCode2','categoryCode3','categoryCode4']);
      case 2:
        this.setState({ catagoryList3: [],catagoryList4:[] });
        this.formRef.current.resetFields(['categoryCode2','categoryCode3','categoryCode4']);
        break;
      case 3:
        this.setState({ catagoryList4: [] });
        this.formRef.current.resetFields(['categoryCode4']);
        break;
    }
    this.getCategoryList(level, value);
  };
  onChangeCatagory = (level,value) => {
    switch(level) {
      case 1:
        this.setState({ catagoryList3: [],catagoryList4:[] });
        this.formRef.current.resetFields(['categoryCode2','categoryCode3','categoryCode4']);
      case 2:
        this.setState({ catagoryList3: [],catagoryList4:[] });
        this.formRef.current.resetFields(['categoryCode2','categoryCode3','categoryCode4']);
        break;
      case 3:
        this.setState({ catagoryList4: [] });
        this.formRef.current.resetFields(['categoryCode4']);
        break;
    }
  };
  render() {
    const { catagoryList, catagoryList2, catagoryList3, catagoryList4 } = this.state;
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} {...this.formItemLayout} className="serach-common-form">
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
              <FormItem
                label="spu编码"
                {...this.formItemLayout}
                name="spuCode">
                <Input placeholder="请输入spu编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem
                label="sku编码"
                {...this.formItemLayout}
                name="skuCode">
                <Input placeholder="请输入sku编码" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem name="cstatus" label="上架状态">
                <Select
                  placeholder="请选择"
                  allowClear={true}>
                  <Option value={-1}>全部</Option>
                  <Option value={1}>上架</Option>
                  <Option value={2}>下架</Option>
                  <Option value={0}>待引用</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品品牌" name="brandName">
                <Input placeholder="请输入商品品牌" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="商品类型" name="productType">
                <Select
                  placeholder="请选择"
                  allowClear={true}>
                  <Option value={0}>全部</Option>
                  <Option value={1}>正常品</Option>
                  <Option value={2}>赠品</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="是否新品" name="isNew">
                <Select
                  placeholder="请选择"
                  allowClear={true}>
                  <Option value={0}>全部</Option>
                  <Option value={1}>是</Option>
                  <Option value={2}>否</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后端一级类目" name="category1Id">
                <Select placeholder="请选择" allowClear={true}
                onChange={(value)=>this.onChangeCatagory(2,value)}
                onSelect={(value)=>this.onSelectCatagory(2,value)}>
                  {catagoryList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后端二级类目" name="categoryCode2">
                <Select
                  placeholder="请选择"
                  disabled={!catagoryList2.length > 0}
                  allowClear={true}
                  onChange={(value)=>this.onChangeCatagory(3,value)}
                  onSelect={(value)=>this.onSelectCatagory(3,value)}
                >
                  {catagoryList2.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后端三级类目" name="categoryCode3">
                <Select
                  placeholder="请选择"
                  disabled={!catagoryList3.length > 0}
                  allowClear={true}
                  onChange={(value)=>this.onChangeCatagory(4,value)}
                  onSelect={(value)=>this.onSelectCatagory(4,value)}
                >
                  {catagoryList3.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后端四级类目" name="categoryCode4">
                  <Select
                    placeholder="请选择"
                    disabled={!catagoryList4.length > 0}
                    allowClear={true}
                  >
                    {catagoryList4.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.categoryName}
                      </Option>
                    ))}
                  </Select>
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
export default Search;
