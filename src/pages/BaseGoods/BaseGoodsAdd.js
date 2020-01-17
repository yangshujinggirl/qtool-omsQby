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
import Creatlabel from './components/Creatlabel';
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
    // console.log('handleChangeLevel')
    level++;
    this.props.dispatch({
      type:'baseGoodsAdd/fetchCategory',
      payload:{level,parentId:selected }
    })
  }
  handleChangeLevel4=(selected)=>{
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
  handleChangeType=(type,option)=> {
    //重置商品规格id,商品属性
    if(option==0&&type=='one') {
      // this.props.form.setFieldsValue({
      //   pdSkus:undefined
      // })
    }
    this.props.dispatch({
      type:'addGoods/changeTypesId',
      payload:{
        typeId:option,
        type
      }
    })
    let { sizeIdList } =this.props;
  }
  //删除商品属性
  deleteGoodsLabel(tags,type) {
    let forms = this.props.form;
    //删除时要清掉form中的历史值，重置pdSkus
    let currentDeleteObj = [];//当前被删项
    if(type == 'one') {
      this.props.addGoods.pdSkus.map((el,index) => {
        if(el.pdType1ValId == tags.key) {
          currentDeleteObj.push(el)
        }
      })
    } else {
      this.props.addGoods.pdSkus.map((el,index) => {
        if(el.pdType2ValId == tags.key) {
          currentDeleteObj.push(el)
        }
      })
    }
    let pdSkus = forms.getFieldsValue(['pdSkus']);
    currentDeleteObj.map((el,index) => {
      pdSkus.pdSkus.map((ee,idx) => {
        if(el.name == ee.name) {
          pdSkus.pdSkus.splice(idx,1);
        }
      })
    })
    forms.setFieldsValue({
      pdSkus:pdSkus.pdSkus
    });
    this.props.dispatch({
      type:'addGoods/deleteSpec',
      payload:{
        payloadVal:tags,
        type
      }
    })
  }
  //新建商品属性
  addGoodsLabel(inputValue,type) {
    const { specData } =this.props;
    let specOne;
    let specTwo;
    if(type == 'one') {
      specOne = [...specData.specOne,...[{name:inputValue,key:inputValue}]];
      specTwo = specData.specTwo;
    } else {
      specOne = specData.specOne;
      specTwo = [...specData.specTwo,...[{name:inputValue,key:inputValue}]];
    }
    this.handleSpec(specOne,specTwo)
  }
  //属性组合
  handleSpec(specOne, specTwo) {
    let oldpdSkus=this.props.goodsList;
    let newPdSkus=[];
    let fixedRow = { key: '00'};
    //处理新增属性数据;
    if(specOne.length >0) {
      if(specTwo.length >0) {
        for(let i=0;i<specOne.length;i++) {
          for(let j=0;j<specTwo.length;j++) {
            let item = {...specOne[i],...fixedRow}
            item.salesAttributeName = `${specOne[i].name}/${specTwo[j].name}`;
            item.key = `${specOne[i].key}_${specTwo[j].key}`;
            item.pdType1ValId = specOne[i].key;
            item.pdType2ValId = specTwo[j].key;
            newPdSkus.push(item);
          }
        }
      }else {
        for(let i=0;i<specOne.length;i++) {
          let item = {...specOne[i],...fixedRow};
          item.pdType1ValId = specOne[i].key;
          item.key = specOne[i].key;
          item.pdType1Va2Id = null;
          newPdSkus.push(item);
        }
      }
    } else {
      newPdSkus.push(fixedRow);
      specTwo=[]
    }
    //处理编辑数据,新旧数据进行合关去重
    for(let m = 0;m<newPdSkus.length;m++) {
      for(let n = 0; n<oldpdSkus.length; n++) {
        if(newPdSkus[m].key == oldpdSkus[n].key) {
          let items = {...newPdSkus[m],...oldpdSkus[n]};
          newPdSkus[m] = items;
        }
      }
    }
    let goodsList = newPdSkus;
    // console.log(pdSkus)
    this.props.dispatch({
      type:'baseGoodsAdd/getSpec',
      payload:{
        specData:{specOne,specTwo},
        goodsList
      }
    })
  }
  goReturn=()=> {
    this.props.history.push('/account/items_list')
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
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">基础信息</span></p>
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
                {getFieldDecorator('categoryId', {
                  initialValue:totalData.categoryId,
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
                {getFieldDecorator('categoryId2', {
                  initialValue:totalData.categoryId2,
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
                {getFieldDecorator('categoryId3', {
                  initialValue:totalData.categoryId3,
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
                {getFieldDecorator('categoryId4', {
                  initialValue:totalData.categoryId4,
                  rules: [{ required: true, message: '请选择四级类目'}],
                  onChange:(select)=>this.handleChangeLevel4(select)
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
              {
                !!totalData.saleRangeShow&&<Form.Item label="代发时效">
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
              }
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
              {
                totalData.batchProcessingStatus&&totalData.batchProcessingStatus==2&&
                <div>
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
              }
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
                     initialValue:totalData.pdType1Id,
                     onChange:(selected)=>this.handleChangeType('one',selected)
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
                 <Creatlabel
                   disabled={totalData.pdType1Id?false:true}
                   deleteGoodsLabel={this.deleteGoodsLabel.bind(this)}
                   addGoodsLabel={this.addGoodsLabel.bind(this)}
                   level="one"/>
              </FormItem>
              <FormItem label='商品规格2'>
                 {
                   getFieldDecorator('pdType2Id',{
                     initialValue:totalData.pdType2Id,
                     onChange:(selected)=>this.handleChangeType('two',selected)
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
                 <Creatlabel
                   disabled={totalData.pdType2Id?false:true}
                   deleteGoodsLabel={this.deleteGoodsLabel.bind(this)}
                   addGoodsLabel={this.addGoodsLabel.bind(this)}
                   level="two"/>
               </FormItem>
              <Form.Item label="商品信息" {...formItemLayoutBig}>
                <Qtable
                  scroll={{x:1400}}
                  dataSource={goodsList}
                  columns={columnsAdd(this.props.form)}/>
              </Form.Item>
            </div>
            <div className="handle-operate-save-action">
              <Qbtn onClick={this.goReturn}>
                返回
              </Qbtn>
              <Qbtn onClick={this.submit}>
                保存
              </Qbtn>
              <Qbtn size="free" onClick={this.submit}>
                保存并提交审核
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
    // console.log('onValuesChange')
    let currentKey = Object.keys(changedFields)[0];
    if(currentKey.indexOf('categoryCode')=='-1') {
      props.dispatch({
        type:'baseGoodsAdd/getTotalState',
        payload:changedFields
      })
    }
  },
})(BaseGoodsAdd);
export default connect(mapStateToProps)(BaseGoodsAddF);
// export default BaseGoodsAddF;
