import {
  Form,Input,Icon,Spin,
  Select,Row,Col,Checkbox,
  Button,Radio,AutoComplete,
} from 'antd';
import { Qtable, Qbtn, QbyConnect } from 'common';
import { columnsAdd } from './column';
import { GetEditInfoApi } from '../../api/home/BaseGoods';
import * as Actions from "./actions/actionsAdd";

let FormItem = Form.Item;
let Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
const formItemLayoutBig = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };

class BaseGoodsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      brandDataSource:[]
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    const  { params } =this.props.match;
    if(params.id) {
      this.props.actions.fetchTotalData({spuCode:params.id})
    }
  }
  //品牌搜索
  handleSearch=(value)=> {
    this.props.actions.fetchbrandList(value)
  }
  //品牌，国家选中事件
  autoSelect(e) {
    console.log(e)
  }
  submit=(e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    console.log(this.props)
    const { categoryData, totalData, brandDataSource, match } =this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <Spin tip="加载中..." spinning={this.props.loading}>
        <div className="oms-common-addEdit-pages">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {
            match.params.id&&
            <Form.Item label="spu编码">
              {match.params.id}
            </Form.Item>
          }
            <Form.Item label="商品名称">
              {getFieldDecorator('productName', {
                  initialValue:totalData.productName,
                  rules: [{ required: true, message: '请输入商品名称'}],
                })(
                <Input placeholder="请输入商品名称" autoComplete="off"/>
              )}
            </Form.Item>
            <Form.Item label="货主">
              {getFieldDecorator('supplierName', {
                  initialValue:totalData.supplierName,
                  rules: [{ required: true, message: '请选择货主' }],
                })(
                  <Select placeholder="请选择货主">
                    <Option value="red">Red</Option>
                    <Option value="green">Green</Option>
                    <Option value="blue">Blue</Option>
                  </Select>
              )}
            </Form.Item>
            <Form.Item label="商品类型">
              {getFieldDecorator('productType',{
                initialValue:totalData.productType,
                rules: [{ required: true, message: '请选择商品类型' }],
              })(
                <Radio.Group>
                  <Radio value="a">普通商品</Radio>
                  <Radio value="b">赠品</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <FormItem label='品牌' {...formItemLayout}>
               {
                 getFieldDecorator('brandId',{
                   initialValue:totalData.brandName,
                   rules: [{ required: true, message: '请选择商品品牌'}],
                 })(
                   <AutoComplete
                    dataSource={brandDataSource}
                    onSearch={this.handleSearch}
                    onSelect={(e)=>this.autoSelect(e)}
                    placeholder="请选择商品品牌"/>
                 )
               }
            </FormItem>
            <Form.Item label="品牌归属地">
              {getFieldDecorator('brandAddress', {
                initialValue:totalData.brandAddress,
                rules: [{ required: true, message: '请输入品牌归属地' }],
              })(
                <Input disabled autoComplete="off" placeholder="请输入品牌归属地"/>
              )}
            </Form.Item>
            <FormItem label='产地' {...formItemLayout}>
               {getFieldDecorator('country',{
                 initialValue:totalData.country,
                 rules: [{ required: true, message: '请选择产地'}],
               })(
                 <Input autoComplete="off" placeholder="请输入产地"/>
               )}
             </FormItem>
            <Form.Item label="后台一级类目">
              {getFieldDecorator('categoryId', {
                initialValue:totalData.categoryId,
                rules: [
                  { required: true, message: '请选择后台一级类目'},
                ],
              })(
                <Select placeholder="请选择后台一级类目">
                {
                  categoryData.categoryLevelOne.length>0&&
                  categoryData.categoryLevelOne.map((el) => (
                    <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                  ))
                }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="后台二级类目">
              {getFieldDecorator('secondCategoryId', {
                initialValue:totalData.secondCategoryId,
                rules: [
                  { required: true, message: '请选择后台二级类目'},
                ],
              })(
                <Select placeholder="请选择后台二级类目">
                {
                  categoryData.categoryLevelTwo.length>0&&
                  categoryData.categoryLevelTwo.map((el) => (
                    <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                  ))
                }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="后台三级类目">
              {getFieldDecorator('thirdCategoryId', {
                initialValue:totalData.thirdCategoryId,
                rules: [
                  { required: true, message: '请选择后台三级类目'},
                ],
              })(
                <Select placeholder="请选择后台三级类目">
                {
                  categoryData.categoryLevelThr.length>0&&
                  categoryData.categoryLevelThr.map((el) => (
                    <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                  ))
                }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="后台四级类目">
              {getFieldDecorator('fourCategoryId', {
                initialValue:totalData.fourCategoryId,
                rules: [
                  { required: true, message: '请选择后台四级类目'},
                ],
              })(
                <Select mode="multiple" placeholder="请选择后台四级类目">
                {
                  categoryData.categoryLevelFour.length>0&&
                  categoryData.categoryLevelFour.map((el) => (
                    <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                  ))
                }
                </Select>
              )}
            </Form.Item>
            <Form.Item label="分润服务扣点">
              {getFieldDecorator('bonusRate', {
                initialValue:totalData.bonusRate,
                rules: [{ required: true, message: '请输入分润服务扣点' }],
              })(
                <Input placeholder="请输入分润服务扣点"/>
              )}
            </Form.Item>
            <Form.Item label="联营分成类别">
              {getFieldDecorator('profits',{
                initialValue:totalData.profits,
                rules: [{ required: true, message: '请选择联营分成类别' }],
              })(
                <Radio.Group>
                  <Radio value={2} key={2}>食品类</Radio>
                  <Radio value={1} key={1}>非食品类</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="销售端">
              {getFieldDecorator('saleRange',{
                initialValue:totalData.saleRange,
                rules: [{ required: true, message: '请选择销售端' }],
              })(
                <Checkbox.Group>
                  <Checkbox value="B" key="B">B端</Checkbox>
                  <Checkbox value="C" key="C">C端</Checkbox>
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item label="是否预售">
              {getFieldDecorator('isBeforeSales',{
                initialValue:totalData.isBeforeSales,
                rules: [{ required: true, message: '请选择是否预售' }],
              })(
                <Radio.Group>
                  <Radio value={1} key={1}>是</Radio>
                  <Radio value={0} key={0}>否</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="发货类型">
              {getFieldDecorator('sendType',{
                initialValue:totalData.sendType,
                rules: [{ required: true, message: '请选择发货类型' }],
              })(
                <Radio.Group>
                  <Radio value={1} key={1}>系统发货</Radio>
                  <Radio value={2} key={2}>非食品类</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="商品图片">
              {getFieldDecorator('imageListB')(
                <Input placeholder="请输入商品描述"/>
              )}
            </Form.Item>
            <Form.Item label="商品描述">
              {getFieldDecorator('rproductDetailB')(
                <Input placeholder="请输入商品描述"/>
              )}
            </Form.Item>
            <Form.Item label="商品SKU规格1">
              {getFieldDecorator('radio-group')(
                <Select mode="multiple" placeholder="Please select favourite colors">
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                  <Option value="blue">yellow</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="商品SKU规格2">
              {getFieldDecorator('radio-group')(
                <Select mode="multiple" placeholder="Please select favourite colors">
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                  <Option value="blue">yellow</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="商品信息" {...formItemLayoutBig}>
              <Qtable dataSource={[]} columns={columnsAdd}/>
            </Form.Item>
            <div className="handle-operate-save-action">
              <Qbtn>
                返回
              </Qbtn>
              <Qbtn onClick={this.submit}>
                保存
              </Qbtn>
            </div>
          </Form>
        </div>
      </Spin>
    )
  }
}
const BaseGoodsAddF = Form.create()(BaseGoodsAdd);
export default QbyConnect(BaseGoodsAddF, Actions, "BaseGoodsAddReducers");
// export default BaseGoodsAddF;
