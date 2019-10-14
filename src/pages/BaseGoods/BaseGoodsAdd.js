import {
  Form,Input,Icon,Spin,Upload,
  Select,Row,Col,Checkbox,
  Button,Radio,AutoComplete,
} from 'antd';
import { connect } from 'react-redux';
import { Qtable, Qbtn, QupLoadImgLimt } from 'common';
import { columnsAdd } from './column';
import { GetEditInfoApi, GetAddApi } from '../../api/home/BaseGoods';
import UpLoadImgLimt from './components/UpLoadImgLimt';
// import * as Actions from "./actions/actionsAdd";

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
      brandDataSource:[],
      previewVisible: false,
      previewImage: '',
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    const  { params } =this.props.match;
    this.props.dispatch({
      type:'baseGoodsAdd/resetPage',
      payload:{}
    })
    if(params.id) {
      this.props.dispatch({
        type:'baseGoodsAdd/fetchTotal',
        payload:{spuCode:params.id}
      })
    }
    this.props.dispatch({
      type:'baseGoodsAdd/fetchCategory',
      payload:{level:1,parentId:''}
    })
    this.props.dispatch({
      type:'baseGoodsAdd/fetchSupplier',
      payload:{}
    })
  }
  handleChangeLevel=(level,selected)=>{
    level++;
    this.props.dispatch({
      type:'baseGoodsAdd/fetchCategory',
      payload:{level,parentId:selected }
    })
  }
  handleAttribute=(selected)=>{
    this.props.dispatch({
      type:'baseGoodsAdd/fetchAttribute',
      payload:selected
    })
  }
  //品牌搜索
  handleSearch=(value)=> {
    this.props.dispatch({
      type:'baseGoodsAdd/fetchbrandList',
      payload:{brandName:value}
    })
  }
  //品牌，国家选中事件
  autoSelect(value, option) {
    let { brandDataSource,totalData } =this.props;
    let item = brandDataSource.find((el)=> el.value== value);
    // totalData = { ...totalData, brandAddress:item.brandCountry};
    // totalData = { ...totalData, brandAddress:'美国'};
    // this.props.actions.setData({totalData});
    this.props.dispatch({
      type:'baseGoodsAdd/getTotalState',
      payload:{brandAddress:item.brandCountry}
    })
  }
  //规格
  changeAttrubte(value,record,typeIndex) {
    let { attrubteArray } =this.props;
    let idx = attrubteArray.findIndex((el)=> el.attributeId==record.attributeId);
    value =value.map((el,index)=> {
      let item = {};
      item.id =`${record.attributeId}${index}`;
      item.value =el;
      return item;
    })
    if(idx == '-1') {
      let item = {
        attributeId:record.attributeId,
        attributeVal:value
      }
      attrubteArray.push(item)
    } else {
      attrubteArray[idx].attributeVal = value
    }
    let selectArry =[];
    attrubteArray.map((el)=>{
      el.attributeVal.map((item)=>{
        let current = {
          name:`${item.value}/`,
          parentId:el.attributeId,
          typeId:item.id,
        }
        let idxParent = selectArry.findIndex((value)=> item.parentId==value.parentId);
        let idxType = selectArry.findIndex((value)=> item.attributeId==value.attributeId);
        console.log(idxParent,idxType)
        selectArry.push(current);
      })
    })
    this.props.dispatch({
      type:'baseGoodsAdd/getAttrubteList',
      payload:attrubteArray
    })
  }
  submit=(e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        GetAddApi(values)
        .then((res)=> {
          console.log(res)
        })
      }
    });
  }
  updateFileList = (fileList) => {
    this.props.dispatch({
      type:'baseGoodsAdd/getFileList',
      payload:fileList
    })
  }
  render() {
    const { categoryData,supplierList, attributeList, totalData, brandDataSource, match, fileList } =this.props;
    const { getFieldDecorator } = this.props.form;
    let isEdit=match.params.id?true:false;
    console.log(this.props);

    return(
      <Spin tip="加载中..." spinning={this.props.loading}>
        <div className="oms-common-addEdit-pages">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {
          isEdit&&
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
              {getFieldDecorator('supplierId', {
                  initialValue:totalData.supplierId,
                  rules: [{ required: true, message: '请选择货主' }],
                })(
                  <Select placeholder="请选择货主" autoComplete="off">
                  {
                    supplierList.length>0&&supplierList.map((el)=> (
                      <Option value={el.id} key={el.id}>{el.name}</Option>
                    ))
                  }
                  </Select>
              )}
            </Form.Item>
            <Form.Item label="商品类型">
              {getFieldDecorator('productType',{
                initialValue:totalData.productType,
                rules: [{ required: true, message: '请选择商品类型' }],
              })(
                <Radio.Group>
                  <Radio value={1}>普通商品</Radio>
                  <Radio value={2}>赠品</Radio>
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
                    autoComplete="off"
                    dataSource={brandDataSource}
                    onSearch={this.handleSearch}
                    onSelect={(value, option)=>this.autoSelect(value, option)}
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
                rules: [{ required: true, message: '请选择后台一级类目'}],
                onChange:(select)=>this.handleChangeLevel(1,select)
              })(
                <Select placeholder="请选择后台一级类目" disabled={isEdit}>
                {
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
                rules: [{ required: true, message: '请选择后台二级类目'}],
                onChange:(select)=>this.handleChangeLevel(2,select)
              })(
                <Select disabled={isEdit||categoryData.isLevelTwo} placeholder="请选择后台二级类目">
                {
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
                rules: [{ required: true, message: '请选择后台三级类目'}],
                onChange:(select)=>this.handleChangeLevel(3,select)
              })(
                <Select disabled={isEdit||categoryData.isLevelThr} placeholder="请选择后台三级类目">
                {
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
                rules: [{ required: true, message: '请选择后台四级类目'}],
                onChange:(select)=>this.handleAttribute(select)
              })(
                <Select disabled={isEdit||categoryData.isLevelFour} placeholder="请选择后台四级类目">
                {
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
                rules: [
                  { required: true, message: '请输入分润服务扣点' },
                  { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
                ],
              })(
                <Input placeholder="请输入分润服务扣点" autoComplete="off"/>
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
              {getFieldDecorator('saleRangeShow',{
                initialValue:totalData.saleRangeShow,
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
              <QupLoadImgLimt
                limit={5}
                upDateList={this.updateFileList}
                fileList={fileList}/>
            </Form.Item>
            <Form.Item label="商品描述">
              {getFieldDecorator('productDetailB',{
                initialValue:totalData.productDetailB,
              })(
                <Input placeholder="请输入商品描述" autoComplete="off"/>
              )}
            </Form.Item>
            {
              attributeList.length>0&&attributeList.map((el,index)=> (
                <Form.Item label={el.attributeName} key={index}>
                  {getFieldDecorator(`attribute${index}`,{
                    onChange:(value)=>this.changeAttrubte(value,el,index)
                  })(
                    <Checkbox.Group>
                    {
                      el.attributeValueShow.map((item,idx) => (
                        <Checkbox value={item} key={`${el.attributeId}${idx}`}>{item}</Checkbox>
                      ))
                    }
                    </Checkbox.Group>
                  )}
                </Form.Item>
              ))
            }
            <Form.Item label="商品信息" {...formItemLayoutBig}>
              <Qtable
                dataSource={[]}
                columns={columnsAdd}/>
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
function mapStateToProps(state) {
  const { BaseGoodsAddReducers } =state;
  return BaseGoodsAddReducers;
}
const BaseGoodsAddF = Form.create()(BaseGoodsAdd);
export default connect(mapStateToProps)(BaseGoodsAddF);
// export default BaseGoodsAddF;
