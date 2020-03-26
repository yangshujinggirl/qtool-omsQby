import '@ant-design/compatible/assets/index.css';
import { Input, Select, Form, DatePicker, Row, Col } from "antd";
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
  onChangeCatagory = (level,value) => {
    switch(level) {
      case 1:
        this.setState({ catagoryList2:[], catagoryList3: [],catagoryList4:[] });
        this.formRef.current.resetFields(['categoryCode2','categoryCode3','categoryCode4']);
      case 2:
        this.setState({ catagoryList3: [],catagoryList4:[] });
        this.formRef.current.resetFields(['categoryCode3','categoryCode4']);
        break;
      case 3:
        this.setState({ catagoryList4: [] });
        this.formRef.current.resetFields(['categoryCode4']);
        break;
    }
    level++;
    value&&this.getCategoryList(level, value);
  };
  render() {
    const { catagoryList, catagoryList2, catagoryList3, catagoryList4 } = this.state;
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} {...this.formItemLayout} className="serach-common-form">
          <Row gutter={24}>
            <Col {...this.colspans}>
              <FormItem label="属性名称" name="attributeName">
                <Input placeholder="请输入属性名称" autoComplete="off" />
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后台一级类目" name="categoryCode1">
                <Select placeholder="请选择" allowClear={true} onChange={(value)=>this.onChangeCatagory(1,value)}>
                  {catagoryList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col {...this.colspans}>
              <FormItem label="后台二级类目" name="categoryCode2">
                <Select
                  placeholder="请选择"
                  disabled={!catagoryList2.length > 0}
                  allowClear={true}
                  onChange={(value)=>this.onChangeCatagory(2,value)}
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
              <FormItem label="后台三级类目" name="categoryCode3">
                <Select
                  placeholder="请选择"
                  disabled={!catagoryList3.length > 0}
                  allowClear={true}
                  onChange={(value)=>this.onChangeCatagory(3,value)}
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
              <FormItem label="后台四级类目" name="categoryCode4">
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
            <Col {...this.colspans}>
              <FormItem label="最后修改人"name="modifyBy">
                <Input placeholder="请输入最后修改人" autoComplete="off" />
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
