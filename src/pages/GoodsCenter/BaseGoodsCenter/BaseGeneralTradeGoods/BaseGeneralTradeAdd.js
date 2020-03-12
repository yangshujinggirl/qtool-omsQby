import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Qtable, Qbtn, QupLoadImgLimt } from 'common';
import { ColumnsAdd } from './column';
import { GetAttributeApi, GetEditApi, GetBrandApi } from 'api/home/BaseGoods';
import Creatlabel from '../components/Creatlabel';
import EditableCell from '../components/EditableCell';
import StandardsMod from '../components/StandardsMod';
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
  let { params } =props.match;
  const [form] = Form.useForm();
  let { specData, categoryData, goodsList, totalData, fileList } =props;
  let spuCode = params.id;
  let isEdit = params.id?true:false;
  const [brandList,setBrandlIst] =useState([])
  //初始化
  const initPage=()=> {
    props.dispatch({
      type:'baseGoodsAdd/resetPage',
      payload:{}
    })
    props.dispatch({
      type:'baseGoodsAdd/fetchCategory',
      payload:{level:1,parentId:''}
    })
    if(params.id) {
      props.dispatch({
        type:'baseGoodsAdd/fetchTotal',
        payload:{spuCode:params.id}
      })
    }
  }
  //批量操作
  const upDateGoodsList=(title,value)=> {
    goodsList = goodsList.map((el)=> {
      el = {...el,[title]:value};
      return el;
    });
    goodsList = [...goodsList]
    form.setFieldsValue({list:goodsList})
    props.dispatch({
      type:'baseGoodsAdd/getListState',
      payload:{goodsList}
    })
  }
  //类目修改
  const handleChangeLevel=(level,selected)=>{
    level++;
    props.dispatch({
      type:'baseGoodsAdd/fetchCategory',
      payload:{level,parentId:selected }
    })
  }
  //品牌搜索
  const handleSearch=(value)=> {
    GetBrandApi({brandName:value})
    .then((res)=> {
      let { result } =res;
      result=result?result:[];
      result = result.map((el)=>{
        let item={}
        item.key =el.id;
        item.value =el.id;
        item.brandCountry =el.brandCountry;
        item.text =el.brandNameCn;
        return item;
      })
      setBrandlIst(result);
    })
  }
  //品牌，国家选中事件
  const autoSelect=(value, option)=> {
    let item = brandList.find((el)=> el.value== value);
    props.dispatch({
      type:'baseGoodsAdd/getTotalState',
      payload:{brandAddress:item.brandCountry}
    })
  }
  //返回
  const goReturn=()=> {
    props.history.push('/account/items_list')
  }
  //删除
  const onOperateClick=(record)=> {
   goodsList = goodsList.filter(value => value.salesAttributeName !== record.salesAttributeName);
   props.dispatch({
     type:'baseGoodsAdd/getListState',
     payload:{ goodsList }
   })
  }
  //恢复
  const goReset=()=> {
    const { specOne, specTwo } =specData;
    let deletedList=[];
    if(specOne.length>0&&specTwo.length>0) {
      specOne.map((el)=> {
        specTwo.map((item) => {
          let lem = {...el,name:`${el.name}/${item.name}`};
          deletedList.push(lem);
        })
      })
    } else {
      specOne.map((el)=> {
        deletedList.push(el);
      })
    }
    let newGoodsLIst = [...goodsList];
    newGoodsLIst.map((el,index)=> {
      deletedList.map((item,idx)=> {
        if(item.name == el.salesAttributeName) {
          deletedList.splice(idx,1);
        }
      });
    })
    console.log(deletedList)
  }
  //提交
  const submit = async (saveType) => {
    try {
      const values = await form.validateFields();
      let { categoryId, categoryId2, categoryId3, categoryId4, pdType1Id, pdType2Id, list, ...paramsVal} = values;
      list = list&&list.map((el,index)=> {
        goodsList.map((item,idx) => {
          if(index == idx) {
            el.salesAttributeName = item.salesAttributeName;
            el.skuCode = item.skuCode;
          }
        })
        return el;
      })
      let listOne = specData.specOne.map((el)=> el.name);
      let listTwo = specData.specTwo.map((el)=> el.name);
      paramsVal = {
        ...paramsVal,
        categoryId:categoryId4,
        productNature:params.type,
        saveType,
        list,
        attrList: [{
          attributeName:pdType1Id,
          attributeValueList:listOne
        },{
          attributeName:pdType2Id,
          attributeValueList:listTwo
        }]
      }
      if(spuCode) { paramsVal = {...paramsVal,spuCode} }
      GetEditApi(paramsVal)
      .then((res)=> {
        Qmessage.success('保存成功');
        goReturn();
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    if(currentKey!='list') {
      props.dispatch({
        type:'baseGoodsAdd/getTotalState',
        payload:changedValues
      })
    }
  }
  useEffect(()=>{ initPage()},[])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=>{ form.setFieldsValue({list:goodsList}) },[goodsList])

  console.log('specData',specData)
  console.log('goodsList',goodsList)
  return (
    <Spin tip="加载中..." spinning={props.loading}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          onValuesChange={onValuesChange}
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
              rules={ [{ required: true, message: '请输入商品名称'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <FormItem label='品牌' {...formItemLayout}
              name="brandId"
              rules={[{ required: true, message: '请选择商品品牌'}]}>
              <AutoComplete
               autoComplete="off"
               options={brandList}
               onSearch={handleSearch}
               onSelect={(value, option)=>autoSelect(value, option)}
               placeholder="请选择商品品牌"/>
            </FormItem>
            <Form.Item
              label="品牌归属地"
              name="brandAddress"
              rules={[{ required: true, message: '请选择商品品牌'}]}>
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
            <StandardsMod {...props}/>
            <Form.Item label="商品信息" {...formItemLayoutBig} className="table-wrap-fomItem">
              <Qtable
                scroll={{x:'100%'}}
                dataSource={goodsList}
                columns={ColumnsAdd}
                onOperateClick={onOperateClick}/>
            </Form.Item>
            <div><Qbtn size="free" onClick={goReset}>恢复被删除的SKU</Qbtn></div>
            <Form.Item label="批量设置">
              <div style={{display:'flex',textAlign:'center'}}>
                <EditableCell text='采购价格' upDateList={(value)=>upDateGoodsList('purchasePrice',value)}/>
                <EditableCell text='B端售价' upDateList={(value)=>upDateGoodsList('businessPrice',value)}/>
                <EditableCell text='C端售价' upDateList={(value)=>upDateGoodsList('customerPrice',value)}/>
                <EditableCell text='建议零售价' upDateList={(value)=>upDateGoodsList('proposalPrice',value)}/>
                <EditableCell text='直邮服务费' upDateList={(value)=>upDateGoodsList('bonusRate',value)}/>
                <EditableCell text='税率'  upDateList={(value)=>upDateGoodsList('taxRate',value)}/>
                <EditableCell text='保质期' upDateList={(value)=>upDateGoodsList('shelfLife',value)}/>
                <EditableCell text='毛重' upDateList={(value)=>upDateGoodsList('weight',value)}/>
              </div>
            </Form.Item>
          </div>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}> 返回 </Qbtn>
            {
              totalData.isSave&&<Qbtn onClick={()=>submit(0)}>保存</Qbtn>
            }
            <Qbtn size="free" onClick={()=>submit(1)}>保存并提交审核</Qbtn>
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
