import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Qtable, Qbtn, QupLoadImgLimt } from 'common';
import { columnsAdd } from './column';
import { GetEditApi } from 'api/home/BaseGoods';
import Creatlabel from '../components/Creatlabel';
import EditableCell from '../components/EditableCell';
import './BaseGeneralTradeAdd.less';

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
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

const BaseGoodsAdd =({...props})=> {
  console.log(props)
  const [form] = Form.useForm();
  let { sizeIdList, attributeArray, specData, categoryData,goodsList,
        supplierList, attributeList, totalData, brandDataSource, fileList } =props;
  let spuCode = props.match.params.id;
  let isEdit = props.match.params.id?true:false;
  const initPage=()=> {
    const  { params } =props.match;
    props.dispatch({
      type:'baseGoodsAdd/resetPage',
      payload:{}
    })
    if(params.id) {
      props.dispatch({
        type:'baseGoodsAdd/fetchTotal',
        payload:{spuCode:params.id}
      })
    }
    props.dispatch({
      type:'baseGoodsAdd/fetchCategory',
      payload:{level:1,parentId:''}
    })
    props.dispatch({
      type:'baseGoodsAdd/fetchSupplier',
      payload:{}
    })
    props.dispatch({
      type:'baseGoodsAdd/fetchAttribute',
      payload:{}
    })
  }
  const handleChangeLevel=(level,selected)=>{
    level++;
    props.dispatch({
      type:'baseGoodsAdd/fetchCategory',
      payload:{level,parentId:selected }
    })
  }
  const handleChangeLevel4=(selected)=>{
    props.dispatch({
      type:'baseGoodsAdd/fetchAttribute',
      payload:selected
    })
  }
  //品牌搜索
  const handleSearch=(value)=> {
    props.dispatch({
      type:'baseGoodsAdd/fetchbrandList',
      payload:{brandName:value}
    })
  }
  //品牌，国家选中事件
  const autoSelect=(value, option)=> {
    let { brandDataSource,totalData } =props;
    let item = brandDataSource.find((el)=> el.value== value);
    props.dispatch({
      type:'baseGoodsAdd/getTotalState',
      payload:{brandAddress:item.brandCountry}
    })
  }
  //提交
  const submit = async (saveType) => {
    try {
      const values = await form.validateFields();
      let { pdType1Id, pdType2Id, list, ...paramsVal} = values;
      list = list&&list.map((el,index)=> {
        goodsList.map((item,idx) => {
          if(index == idx) {
            el.salesAttributeName = item.salesAttributeName;
            el.skuCode = item.skuCode;
          }
        })
        return el;
      })
      paramsVal = {
        ...paramsVal,
        saveType,
        list,
        attrList: [{
          attributeName:pdType1Id,
          attributeValueList:specData.specOne
        },{
          attributeName:pdType2Id,
          attributeValueList:specData.specTwo
        }]
      }
      if(spuCode) { paramsVal = {...paramsVal,spuCode} }
      GetEditApi(paramsVal)
      .then((res)=> {
        console.log(res)
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  //商品规格change
  const handleChangeType=(type,option)=> {
    //重置商品规格id,商品属性
    if(option==0&&type=='one') {
      // this.props.form.setFieldsValue({
      //   pdSkus:undefined
      // })
    }
    props.dispatch({
      type:'addGoods/changeTypesId',
      payload:{
        typeId:option,
        type
      }
    })
    let { sizeIdList } =props;
  }
  //删除商品属性
  const deleteGoodsLabel=(tags,type)=> {
    //删除时要清掉form中的历史值，重置pdSkus
    let currentDeleteObj = [];//当前被删项
    if(type == 'one') {
      props.addGoods.pdSkus.map((el,index) => {
        if(el.pdType1ValId == tags.key) {
          currentDeleteObj.push(el)
        }
      })
    } else {
      props.addGoods.pdSkus.map((el,index) => {
        if(el.pdType2ValId == tags.key) {
          currentDeleteObj.push(el)
        }
      })
    }
    let pdSkus = form.getFieldsValue(['pdSkus']);
    currentDeleteObj.map((el,index) => {
      pdSkus.pdSkus.map((ee,idx) => {
        if(el.name == ee.name) {
          pdSkus.pdSkus.splice(idx,1);
        }
      })
    })
    form.setFieldsValue({ pdSkus:pdSkus.pdSkus });
    props.dispatch({
      type:'addGoods/deleteSpec',
      payload:{
        payloadVal:tags,
        type
      }
    })
  }
  //新建商品属性
  const addGoodsLabel=(inputValue,type)=> {
    const { specData } =props;
    let specOne;
    let specTwo;
    if(type == 'one') {
      specOne = [...specData.specOne,...[{name:inputValue,key:inputValue}]];
      specTwo = specData.specTwo;
    } else {
      specOne = specData.specOne;
      specTwo = [...specData.specTwo,...[{name:inputValue,key:inputValue}]];
    }
    handleSpec(specOne,specTwo)
  }
  //属性组合
  const handleSpec=(specOne, specTwo)=> {
    let oldpdSkus=props.goodsList;
    let newPdSkus=[];
    let fixedRow = { key: '00'};
    //处理新增属性数据;
    if(specOne.length >0) {
      if(specTwo.length >0) {
        for(let i=0;i< specOne.length; i++) {
          for(let j = 0;j< specTwo.length;j++) {
            let item = {...specOne[i],...fixedRow}
            item.salesAttributeName = `${specOne[i].name}/${specTwo[j].name}`;
            item.key = `${specOne[i].key}_${specTwo[j].key}`;
            item.pdType1ValId = specOne[i].key;
            item.pdType2ValId = specTwo[j].key;
            newPdSkus.push(item);
          }
        }
      }else {
        for(let i = 0;i < specOne.length; i++) {
          let item = {...specOne[i],...fixedRow};
          item.pdType1ValId = specOne[i].key;
          item.key = specOne[i].key;
          item.pdType1Va2Id = null;
          newPdSkus.push(item);
        }
      }
    } else {
      newPdSkus.push(fixedRow);
      specTwo=[];
    }

    for(let m = 0; m< newPdSkus.length; m++) {
      for(let n = 0; n < oldpdSkus.length; n++) {
        if(newPdSkus[m].key == oldpdSkus[n].key) {
          let items = {...newPdSkus[m],...oldpdSkus[n]};
          newPdSkus[m] = items;
        }
      }
    }
    let goodsList = newPdSkus;
    props.dispatch({
      type:'baseGoodsAdd/getSpec',
      payload:{
        specData:{specOne,specTwo},
        goodsList
      }
    })
  }
  const goReturn=()=> {
    props.history.push('/account/items_list')
  }
  const goReset=()=> {

  }
  useEffect(()=>{ initPage()},[])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=>{ form.setFieldsValue({list:goodsList}) },[goodsList])

  console.log(specData)
  return (
    <Spin tip="加载中..." spinning={props.loading}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">基础信息</span></p>
            {
              isEdit&&
                <Form.Item label="spu编码">
                  {totalData.spuCode}
                </Form.Item>
            }
            <Form.Item
              label="商品名称"
              name="productName"
              rules={
                [{ required: true, message: '请输入商品名称'}]
              }>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <FormItem label='品牌' {...formItemLayout}
              name="brandId"
              rules={
                [{ required: true, message: '请选择商品品牌'}]
              }>
              <AutoComplete
               autoComplete="off"
               options={brandDataSource}
               onSearch={handleSearch}
               onSelect={(value, option)=>autoSelect(value, option)}
               placeholder="请选择商品品牌"/>
            </FormItem>
            <Form.Item
              label="品牌归属地"
              name="brandAddress"
              rules={
                [{ required: true, message: '请选择商品品牌'}]
              }>
              <Input disabled autoComplete="off" placeholder="请输入品牌归属地"/>
            </Form.Item>
            <FormItem label='产地' {...formItemLayout} name="country" rules={[{ required: true, message: '请选择产地'}]}>
               <Input autoComplete="off" placeholder="请输入产地"/>
            </FormItem>
            <Form.Item label="商品类型" name="productType" rules={[{ required: true, message: '请选择商品类型' }]}>
              <Radio.Group>
                <Radio value={1}>普通商品</Radio>
                <Radio value={2}>赠品</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="采购主体" name="procurementTarget" rules={[{ required: true, message: '请选择采购主体'}]}>
              <Select placeholder="请选择后台一级类目" disabled={isEdit}>
                <Option value={1} key={1}>淮安</Option>
                <Option value={2} key={2}>苏州蔻兔</Option>
              </Select>
            </Form.Item>
            <Form.Item label="供应商" name="supplierId" rules={[{ required: true, message: '请选择供应商' }]}>
              <Select placeholder="请选择供应商" autoComplete="off">
              {
                supplierList.length>0&&supplierList.map((el)=> (
                  <Option value={el.id} key={el.id}>{el.name}</Option>
                ))
              }
              </Select>
            </Form.Item>
            <Form.Item label="一级类目" name="categoryId" rules={[{ required: true, message: '请选择一级类目'}]}>
              <Select placeholder="请选择后台一级类目" disabled={isEdit} onChange={(select)=>handleChangeLevel(1,select)}>
              {
                categoryData.categoryLevelOne.map((el) => (
                  <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                ))
              }
              </Select>
            </Form.Item>
            <Form.Item label="二级类目" name="categoryId2" rules={[{ required: true, message: '请选择二级类目'}]}>
              <Select
                disabled={isEdit||categoryData.isLevelTwo}
                placeholder="请选择二级类目"
                onChange={(select)=>handleChangeLevel(2,select)}>
                {
                  categoryData.categoryLevelTwo.map((el) => (
                    <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item label="三级类目" name="categoryId3" rules={[{ required: true, message: '请选择三级类目'}]}>
              <Select
              disabled={isEdit||categoryData.isLevelThr}
              placeholder="请选择三级类目"
              onChange={(select)=>handleChangeLevel(3,select)}>
              {
                categoryData.categoryLevelThr.map((el) => (
                  <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                ))
              }
              </Select>
            </Form.Item>
            <Form.Item label="四级类目" name="categoryId4" rules={[{ required: true, message: '请选择四级类目'}]}>
              <Select
              onChange={(select)=>handleChangeLevel4(select)}
              disabled={isEdit||categoryData.isLevelFour} placeholder="请选择四级类目">
              {
                categoryData.categoryLevelFour.map((el) => (
                  <Option value={el.id} key={el.id}>{el.categoryName}</Option>
                ))
              }
              </Select>
            </Form.Item>
          </div>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">销售信息</span></p>
            <Form.Item label="联营分成类别" name="profits" rules={[{ required: true, message: '请选择联营分成类别' }]}>
              <Radio.Group>
                <Radio value={2} key={2}>食品类</Radio>
                <Radio value={1} key={1}>非食品类</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
            label="B端销售箱规"
            name="minBoxSpecification"
            rules={[
              { required: true, message: '请输入大于1的整数' },
              { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
            ]}>
              <Input placeholder="请输入大于1的整数" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="是否代发" name="sendType" rules={[{ required: true, message: '请选择是否代发' }]}>
              <Radio.Group>
                <Radio value={1} key={1}>是</Radio>
                <Radio value={0} key={0}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.sendType !== currentValues.sendType}>
              {({ getFieldValue }) => {
                return getFieldValue('sendType') == 1&&
                <Form.Item  label="代发时效">
                  <Form.Item
                    noStyle
                    name="distributionDays"
                    rules={[
                      { required: true, message: '请输入大于0的整数' },
                      { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
                    ]}>
                      <Input placeholder="请输入大于0的整数" className="short-input" autoComplete="off"/>
                  </Form.Item>
                  <span>个工作日内发货</span>
                </Form.Item>
              }}
            </Form.Item>
          </div>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">仓管信息</span></p>
            <Form.Item
              label="基础箱规"
              name="basicsBoxSpecification"
              rules={[
                { required: true, message: '请输入大于1的整数' },
                { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
              ]}>
              <Input placeholder="请输入大于1的整数" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="效期管理" name="batchProcessingStatus" rules={[{ required: true, message: '请选择效期管理' }]}>
              <Radio.Group>
                <Radio value={2} key={2}>是</Radio>
                <Radio value={1} key={1}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.batchProcessingStatus !== currentValues.batchProcessingStatus}>
              {({ getFieldValue }) => {
                return getFieldValue('batchProcessingStatus') == 2&&
                <div>
                  <Form.Item label="效期类型" name="batchProcessingType" rules={[{ required: true, message: '请选择效期类型' }]}>
                    <Radio.Group>
                      <Radio value={1} key={1}>生产日期</Radio>
                      <Radio value={0} key={0}>到期日期</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="禁止入库天数" name="lotLimitInDay" rules={[
                    { required: true, message: '请输入大于0的整数' },
                    { pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字' },
                  ]}>
                    <Input placeholder="请输入大于0的整数" autoComplete="off"/>
                  </Form.Item>
                </div>
              }}
            </Form.Item>
          </div>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">SKU信息</span></p>
            <Form.Item label='商品规格1'>
              <Form.Item name="pdType1Id" noStyle>
                <Select
                  disabled={totalData.spuCode?true:false}
                  placeholder="请选择商品规格1"
                  autoComplete="off"
                  onChange={(selected)=>handleChangeType('one',selected)}>
                  <Option value={0} key={0}>无</Option>
                  {
                    attributeArray.length>0 &&
                    attributeArray.map((ele,index) => (
                      <Option
                        value={ele.attributeName}
                        key={ele.attributeName}>{ele.attributeName}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Creatlabel
                disabled={totalData.pdType1Id?false:true}
                deleteGoodsLabel={()=>deleteGoodsLabel()}
                addGoodsLabel={()=>addGoodsLabel()}
                level="one"/>
            </Form.Item>
            <Form.Item label='商品规格2'>
              <Form.Item name="pdType2Id" noStyle>
                <Select
                  disabled={totalData.spuCode?true:false}
                  placeholder="商品规格2" autoComplete="off"
                  onChange={(selected)=>handleChangeType('two',selected)}>
                  <Option value={0} key={0}>无</Option>
                  {
                    attributeArray.length>0 &&
                    attributeArray.map((ele,index) => (
                      <Option
                        value={ele.attributeName}
                        key={ele.attributeId}>{ele.attributeName}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Creatlabel
                 disabled={totalData.pdType2Id?false:true}
                 deleteGoodsLabel={()=>deleteGoodsLabel()}
                 addGoodsLabel={()=>addGoodsLabel()}
                 level="two"/>
            </Form.Item>
            <Form.Item label="商品信息" {...formItemLayoutBig} className="table-wrap-fomItem">
                <Qtable
                  scroll={{x:'100%'}}
                  dataSource={goodsList}
                  columns={columnsAdd()}/>
            </Form.Item>
            <div>
              <Qbtn size="free" onClick={goReset}>
                恢复被删除的SKU
              </Qbtn>
            </div>
            <Form.Item label="批量设置">
              <div style={{display:'flex',textAlign:'center'}}>
                <EditableCell text='采购价格' title='purchasePrice'/>
                <EditableCell text='B端售价' title='salePrice'/>
                <EditableCell text='C端售价' title='receivePrice'/>
                <EditableCell text='建议零售价' title='deliveryPrice'/>
                <EditableCell text='直邮服务费' title='salePrice'/>
                <EditableCell text='税率' title='receivePrice'/>
                <EditableCell text='保质期' title='deliveryPrice'/>
                <EditableCell text='毛重' title='deliveryPrice'/>
              </div>
            </Form.Item>
          </div>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}>
              返回
            </Qbtn>
            <Qbtn onClick={()=>submit(0)}>
              保存
            </Qbtn>
            <Qbtn size="free" onClick={()=>submit(1)}>
              保存并提交审核
            </Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}
function mapStateToProps(state) {
  const { BaseGoodsAddReducers } =state;
  return BaseGoodsAddReducers;
}

export default connect(mapStateToProps)(BaseGoodsAdd);
