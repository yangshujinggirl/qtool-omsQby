import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,Card,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Qtable, Qmessage, Qbtn, QupLoadImgLimt } from 'common';
import { ColumnsAddGeneral,ColumnsAddCross } from './columns';
import { GetBaseInfoApi } from 'api/marketCenter/CtipActivity';
import StepMod from './components/StepMod';
import InfoSet from './components/InfoSet';
// import WebSet from './components/WebSet';
// import ShareSet from './components/ShareSet';
import './CtipActivityAdd.less';

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

const CtipActivityAdd =({...props})=> {//productNature：1一般贸易，2：跨境商品
  const [form] = Form.useForm();
  let [activityInfo, setTotalData] =useState({});
  let [ratioList, setRatioList] =useState([]);
  let [tagsList, setTagsList] =useState([]);
  let promotionId = props.match.params.id;
  //初始化
  const initPage=()=> {
    if(promotionId) {
      getBaseInfo()
    }
  }
  const goReturn=()=> {

  }
  const updateRatioList=(array)=> {
    console.log(array);
    setRatioList(array)
  }
  const getBaseInfo=()=> {
    GetBaseInfoApi(promotionId)
    .then((res)=> {
      console.log(res);
      let { costApportions, promtionShare } =res.result;
      let resData = {...res.result,...promtionShare};
      if(costApportions) {
        costApportions = costApportions.map((el) =>{
          el.key = el.costApportionId;
          if(el.bearer!="A"&&el.bearer!="B") {
            el.bearerType = "C"
          } else {
            el.bearerType = el.bearer;
          }
          return el;
        });
      }
      resData.time=[resData.beginTime,resData.endTime];
      if(resData.budget) {
        costApportions.map((el) =>el.budget = costApportions.budget)
      }
      let budgetItem = ratioList.find((el)=>el.budget);
      budgetItem = budgetItem?budgetItem:{};
      costApportions.map((el) =>el.budget = budgetItem.budget)
      costApportions=[...costApportions]
      let tagsArray = costApportions.filter(el => el.bearerType=='C');
      setTotalData(resData);
      setRatioList(costApportions);
      setTagsList(tagsArray);
    })
  }
  //提交
  const submit = async (saveType) => {
    try {
      const values = await form.validateFields();
      let { country, categoryId, categoryId2, categoryId3, categoryId4, pdType1Id, pdType2Id, list, ...paramsVal} = values;
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
        country:totalData.countryCode,
        categoryId:categoryId4,
        productNature,
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
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    if(currentKey=='list') {
      return;
    }
    if(currentKey == 'promotionType') {
      if(allValues.promotionScope==2&&allValues.promotionType!=22) {
        allValues.pdScope=2;
        allValues.pdKind=null;
      }
      if(allValues.promotionType==10) {
        allValues.bannerTitle=null;
        allValues.bannerSubtitle=null;
      }
    }
    if(currentKey == 'platform') {
      if(allValues.promotionScope==2&&allValues.platform.includes('2')) {
        allValues.promotionScope=null;
      }
    }
    if(currentKey == 'time') {
      allValues.warmUpBeginTime=null;
    }
    activityInfo = {...activityInfo,...allValues};
    setTotalData(activityInfo)
  }

  useEffect(()=>{
    initPage();
  },[promotionId])
  useEffect(()=>{ form.setFieldsValue(activityInfo) },[activityInfo])
  useEffect(()=>{ form.setFieldsValue({bearers:ratioList}) },[ratioList])
  console.log(activityInfo)
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages ctipActivity-addEdit-pages">
        <StepMod step={0}/>
        <Form
          onValuesChange={onValuesChange}
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <InfoSet
            upDateList={updateRatioList}
            tagsList={tagsList}
            ratioList={ratioList}
            form={form}
            activityInfo={activityInfo}/>
          {/*<WebSet form={form}/>
          <ShareSet form={form}/>*/}
          {/*<Card title="基础信息">
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
            <Form.Item
              label='产地'
              name="country">
              <AutoComplete
               autoComplete="off"
               options={originList}
               onSearch={handleOriginSearch}
               onSelect={(value, option)=>autoOriginSelect(value, option)}
               placeholder="请输入产地"/>
            </Form.Item>
            {
              productNature==1?
              <div>
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
              </div>
              :
              <Form.Item label="保税仓" name="bondedWarehouseId" rules={[{ required: true, message: '请选择保税仓'}]}>
                <Select placeholder="请选择后台一级类目" disabled={isEdit}>
                  <Option value={1} key={1}>淮安</Option>
                  <Option value={2} key={2}>苏州蔻兔</Option>
                </Select>
              </Form.Item>
            }
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
          </Card>
          {
            productNature==1&&
            <div>
              <Card title="销售信息">
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
              </Card>
              <Card title="仓管信息">
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
              </Card>
            </div>
          }
          <Card title="SKU信息">
            <StandardsMod {...props}/>
            <Form.Item label="商品信息" {...formItemLayoutBig} className="table-wrap-fomItem">
              <Qtable
                scroll={{x:'100%'}}
                dataSource={goodsList}
                columns={columnsAdd}
                onOperateClick={onOperateClick}/>
            </Form.Item>
            <Row >
              <Col offset={4}>
                <Qbtn size="free" onClick={goReset}>恢复被删除的SKU</Qbtn>
              </Col>
            </Row>
            <Form.Item label="批量设置">
              <div style={{display:'flex',textAlign:'center'}}>
                {
                  batchList.map((el,index) => (
                    <EditableCell key={index} text={el.value} upDateList={(value)=>upDateGoodsList(el.key,value)}/>
                  ))
                }
              </div>
            </Form.Item>
          </Card>*/}
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}> 返回 </Qbtn>
            <Qbtn size="free" onClick={()=>submit(1)}>保存并继续</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}
// function mapStateToProps(state) {
//   const { BaseGoodsAddReducers } =state;
//   return BaseGoodsAddReducers;
// }

// export default connect(mapStateToProps)(BaseGoodsAdd);
export default CtipActivityAdd;
