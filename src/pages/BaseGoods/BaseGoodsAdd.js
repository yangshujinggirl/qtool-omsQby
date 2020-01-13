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
import './BaseGoodsAdd.less';

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
    this.props.dispatch({
      type:'baseGoodsAdd/fetchAttribute',
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
      item.key =item.id ;
      item.attributeName =el;
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
    attrubteArray = attrubteArray.filter((el)=> el.attributeVal.length!=0);
    let combineVal=attrubteArray.map((el)=> {return el.attributeVal});
    let goodsList=this.handleCombine(combineVal);
    this.props.dispatch({
      type:'baseGoodsAdd/getAttrubteList',
      payload:{goodsList,attrubteArray}
    })
  }
  //n级规格排列组合
  handleCombine=(arr)=> {
    var len = arr.length;
    if (len >= 2) {
      //从前两个开始组合
      var len1 = arr[0].length;
      var len2 = arr[1].length;
      var lenBoth = len1 * len2;
      var items = new Array(lenBoth);
      var index = 0;
      //for循环构建两两组合后的数组
      for (var i = 0; i < len1; i++) {
        for (var j = 0; j < len2; j++) {
          if (arr[0][i] instanceof Array) {
            items[index] = {
              attributeName:`${arr[0][i].attributeName}${arr[1][j].attributeName}`.concat(arr[1][j].attributeName),
              id:`${arr[0][i].id}${arr[1][j].id}`.concat(arr[1][j].id),
              key:`${arr[0][i].id}${arr[1][j].id}`.concat(arr[1][j].id),
            };
          } else {
            items[index] = {
              attributeName:`${arr[0][i].attributeName}/${arr[1][j].attributeName}`,
              id:`${arr[0][i].id}/${arr[1][j].id}`,
              key:`${arr[0][i].id}/${arr[1][j].id}`,
            };
          }
          index++;
        }
      }
      // 新组合的数组取代原来前两个数组
      var newArr = new Array(len - 1);
      for (var i = 2; i < arr.length; i++) {
        newArr[i - 1] = arr[i];
      }
      newArr[0] = items;
      // 再次组合前两个
      return this.handleCombine(newArr);
    } else {
      return arr[0];
    }
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
  handleChangeOne=()=> {

  }
  render() {
    const { sizeIdList, attributeArray, categoryData,goodsList,
      supplierList, attributeList, totalData, brandDataSource,
      match, fileList } =this.props;
    const { getFieldDecorator } = this.props.form;
    let isEdit=match.params.id?true:false;
    console.log(this.props);
    return(
      <Spin tip="加载中..." spinning={this.props.loading}>
        <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {
              isEdit&&
                <Form.Item label="spu编码">
                  {match.params.id}
                </Form.Item>
            }
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">基础信息</span></p>
              <Form.Item label="商品名称">
                {getFieldDecorator('productName', {
                    initialValue:totalData.productName,
                    rules: [{ required: true, message: '请输入商品名称'}],
                  })(
                  <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
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
              <Form.Item label="采购主体">
                {getFieldDecorator('procurementTarget', {
                  initialValue:totalData.procurementTarget,
                  rules: [{ required: true, message: '请选择采购主体'}],
                })(
                  <Select placeholder="请选择后台一级类目" disabled={isEdit}>
                    <Option value={1} key={1}>淮安</Option>
                    <Option value={2} key={2}>苏州蔻兔</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="供应商">
                {getFieldDecorator('supplierId', {
                    initialValue:totalData.supplierId,
                    rules: [{ required: true, message: '请选择供应商' }],
                  })(
                    <Select placeholder="请选择供应商" autoComplete="off">
                    {
                      supplierList.length>0&&supplierList.map((el)=> (
                        <Option value={el.id} key={el.id}>{el.name}</Option>
                      ))
                    }
                    </Select>
                )}
              </Form.Item>
              <Form.Item label="一级类目">
                {getFieldDecorator('categoryCode', {
                  initialValue:totalData.categoryCode,
                  rules: [{ required: true, message: '请选择一级类目'}],
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
              <Form.Item label="二级类目">
                {getFieldDecorator('categoryCode2', {
                  initialValue:totalData.categoryCode2,
                  rules: [{ required: true, message: '请选择二级类目'}],
                  onChange:(select)=>this.handleChangeLevel(2,select)
                })(
                  <Select disabled={isEdit||categoryData.isLevelTwo} placeholder="请选择二级类目">
                  {
                    categoryData.categoryLevelTwo.map((el) => (
                      <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                    ))
                  }
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="三级类目">
                {getFieldDecorator('categoryCode3', {
                  initialValue:totalData.categoryCode3,
                  rules: [{ required: true, message: '请选择三级类目'}],
                  onChange:(select)=>this.handleChangeLevel(3,select)
                })(
                  <Select disabled={isEdit||categoryData.isLevelThr} placeholder="请选择三级类目">
                  {
                    categoryData.categoryLevelThr.map((el) => (
                      <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                    ))
                  }
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="四级类目">
                {getFieldDecorator('categoryCode4', {
                  initialValue:totalData.categoryCode4,
                  rules: [{ required: true, message: '请选择四级类目'}],
                  onChange:(select)=>this.handleAttribute(select)
                })(
                  <Select disabled={isEdit||categoryData.isLevelFour} placeholder="请选择四级类目">
                  {
                    categoryData.categoryLevelFour.map((el) => (
                      <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                    ))
                  }
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">销售信息</span></p>
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
              <Form.Item label="B端销售箱规">
                {getFieldDecorator('minBoxSpecification', {
                  initialValue:totalData.minBoxSpecification,
                  rules: [
                    { required: true, message: '请输入大于1的整数' },
                    { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
                  ],
                })(
                  <Input placeholder="请输入大于1的整数" autoComplete="off"/>
                )}
              </Form.Item>
              <Form.Item label="是否代发">
                {getFieldDecorator('saleRangeShow',{
                  initialValue:totalData.saleRangeShow,
                  rules: [{ required: true, message: '请选择是否代发' }],
                })(
                  <Radio.Group>
                    <Radio value={1} key={1}>是</Radio>
                    <Radio value={0} key={0}>否</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="代发时效">
                {getFieldDecorator('distributionDays', {
                  initialValue:totalData.distributionDays,
                  rules: [
                    { required: true, message: '请输入大于0的整数' },
                    { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
                  ],
                })(
                  <Input placeholder="请输入大于0的整数" autoComplete="off"/>
                )}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">仓管信息</span></p>
              <Form.Item label="基础箱规">
                {getFieldDecorator('basicsBoxSpecification', {
                  initialValue:totalData.basicsBoxSpecification,
                  rules: [
                    { required: true, message: '请输入大于1的整数' },
                    { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
                  ],
                })(
                  <Input placeholder="请输入大于1的整数" autoComplete="off"/>
                )}
              </Form.Item>
              <Form.Item label="效期管理">
                {getFieldDecorator('batchProcessingStatus',{
                  initialValue:totalData.batchProcessingStatus,
                  rules: [{ required: true, message: '请选择效期管理' }],
                })(
                  <Radio.Group>
                    <Radio value={2} key={2}>是</Radio>
                    <Radio value={1} key={1}>否</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="效期类型">
                {getFieldDecorator('batchProcessingType',{
                  initialValue:totalData.batchProcessingType,
                  rules: [{ required: true, message: '请选择是否代发' }],
                })(
                  <Radio.Group>
                    <Radio value={1} key={1}>生产日期</Radio>
                    <Radio value={0} key={0}>到期日期</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="禁止入库天数">
                {getFieldDecorator('lotLimitInDay', {
                  initialValue:totalData.lotLimitInDay,
                  rules: [
                    { required: true, message: '请输入大于0的整数' },
                    { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
                  ],
                })(
                  <Input placeholder="请输入大于0的整数" autoComplete="off"/>
                )}
              </Form.Item>
            </div>
            {/*<Form.Item label="商品图片">
              <QupLoadImgLimt
                limit={5}
                upDateList={this.updateFileList}
                fileList={fileList}/>
            </Form.Item>*/}
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">SKU信息</span></p>
              <FormItem label='商品规格1'>
                 {
                   getFieldDecorator('pdType1Id',{
                     initialValue:sizeIdList.pdSkusSizeOne,
                     onChange:(selected)=>this.handleChangeOne('one',selected)
                   })(
                    <Select
                      placeholder="请选择商品分类"
                      autoComplete="off">
                      <Option value={0} key={0}>无</Option>
                      {
                        attributeArray.length>0 &&
                        attributeArray.map((ele,index) => (
                          <Option
                            value={ele.attributeId}
                            key={ele.attributeId}>{ele.attributeName}</Option>
                        ))
                      }
                    </Select>
                   )
                 }
              </FormItem>
              <FormItem label='商品规格2'>
                 {
                   getFieldDecorator('pdType2Id',{
                     initialValue:sizeIdList.pdSkusSizeTwo,
                     onChange:(selected)=>this.handleChangeOne('two',selected)
                   })(
                    <Select placeholder="商品规格2" autoComplete="off">
                      <Option value={0} key={0}>无</Option>
                      {
                        attributeArray.length>0 &&
                        attributeArray.map((ele,index) => (
                          <Option
                            value={ele.attributeId}
                            key={ele.attributeId}>{ele.attributeName}</Option>
                        ))
                      }
                    </Select>
                   )
                 }
               </FormItem>
              <Form.Item label="商品信息" {...formItemLayoutBig}>
                <Qtable
                  dataSource={goodsList}
                  columns={columnsAdd(this.props.form)}/>
              </Form.Item>
            </div>
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
const BaseGoodsAddF = Form.create({
  onValuesChange(props, changedFields, allFields) {
    const { totalData,goodsList }=props;
    // console.log(changedFields);
    let currentKey = Object.keys(changedFields)[0];
    props.dispatch({
      type:'baseGoodsAdd/getTotalState',
      payload:changedFields
    })
  },
  mapPropsToFields(props) {
    // return {
    //   pdCategory1Id: Form.createFormField(props.categoryIdList.pdCategory1Id),
    //   pdCategory2Id: Form.createFormField(props.categoryIdList.pdCategory2Id),
    //   pdCategory3Id: Form.createFormField(props.categoryIdList.pdCategory3Id),
    //   pdCategory4Id: Form.createFormField(props.categoryIdList.pdCategory4Id),
    //   spuList: Form.createFormField(props.goodsList),
    //   day: Form.createFormField(props.totalData.day),
    //   time: Form.createFormField(props.totalData.time),
    //   ruleType: Form.createFormField(props.totalData.ruleType),
    //   sortType:Form.createFormField(props.totalData.sortType),
    // };
  }
})(BaseGoodsAdd);
export default connect(mapStateToProps)(BaseGoodsAddF);
// export default BaseGoodsAddF;
