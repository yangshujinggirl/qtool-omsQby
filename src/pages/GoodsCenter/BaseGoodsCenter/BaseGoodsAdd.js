import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,Card,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { QreturnBtn, Qtable, Qmessage, Qbtn } from 'common';
import { BatchListGenreal,BatchListCross, ColumnsAddGeneral,ColumnsAddCross } from './columns';
import { GetOriginApi, GetEditApi } from 'api/home/BaseGoods';
import Creatlabel from './components/Creatlabel';
import EditableCell from './components/EditableCell';
import StandardsMod from './components/StandardsMod';
import ResetModal from './components/ResetModal';
import BaseInfoSet from './components/BaseInfoSet';
import {
  sendTypeOptions,profitsOptions,rangeBaby,rangMa,
  isBeforeSalesOptions, isDirectSalesOptions,
  batchProcessingStatusOptions, batchProcessingTypeOptions
} from './components/options';
import './BaseGoodsAdd.less';

let FormItem = Form.Item;
let {Option, OptGroup} = Select;
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

const BaseGoodsAdd =({...props})=> {//productNature：1一般贸易，2：跨境商品
  const [form] = Form.useForm();
  const [visible,setVisible] =useState(false)
  const [deletedList,setDeletedList] =useState([])
  let productNature = props.match.params.type;
  let { specData, categoryData, goodsList, totalData } =props;
  let spuCode = props.match.params.id;
  let isEdit = spuCode?true:false;
  let columnsAdd = productNature==1?ColumnsAddGeneral(goodsList):ColumnsAddCross(goodsList);
  let batchList = productNature==1?BatchListGenreal:BatchListCross;

  //初始化
  const initPage=()=> {
    if(spuCode) {
      props.dispatch({
        type:'baseGoodsAdd/fetchTotal',
        payload:{spuCode}
      })
    } else {
      props.dispatch({
        type:'baseGoodsAdd/getGoodsTemplte',
        payload:{productNature}
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
    const { goodsList, specData } =props;
    let { specOne, specTwo } =specData;
    let newGoodsLIst = [...goodsList];
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
    newGoodsLIst.map((el,index)=> {
      deletedList.map((item,idx)=> {
        if(el.salesAttributeName == item.name) {
          deletedList.splice(idx,1);
        }
      });
    })
    if(deletedList.length==0) {
      Qmessage.error('暂无删除SKU');
      return;
    }
    setDeletedList(deletedList);
    setVisible(true);
  }
  const onCancel=()=> {
    setDeletedList([]);
    setVisible(false);
  }
  //确认恢复
  const onOk=(selectVal)=> {
    let resetList = selectVal.map((el)=> {
      let item ={};
      item.salesAttributeName=el;
      item.key=el;
      return item;
    })
    goodsList = [...goodsList,...resetList];
    props.dispatch({
      type:'baseGoodsAdd/getListState',
      payload:{ goodsList }
    })
    onCancel();
  }
  //提交
  const submit = async (saveType) => {
    try {
      const values = await form.validateFields();
      let { rang, brandAddressName, brandName, countryName, country, categoryId, categoryId2, categoryId3, categoryId4, pdType1Id, pdType2Id, list, ...paramsVal} = values;
      if((pdType1Id!='0')&&specData.specOne.length==0) {
        Qmessage.error('请添加属性');
        return;
      }
      if((pdType2Id!='0')&&(specData.specTwo.length==0)) {
        Qmessage.error('请添加属性');
        return;
      }
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
      let rangOption = rang=='B'?rangeBaby:rangMa;
      let suitRangeNameList=[];
      paramsVal.suitRangeList.map((el) => {
        rangOption.map((item) => {
          if(el == item.property) {
            suitRangeNameList.push(item.itemName);
          }
        })
      })
      paramsVal = {
        ...paramsVal,
        suitRangeNameList,
        country:totalData.countryCode,
        brandId:totalData.brandId,
        categoryId:categoryId4,
        productNature,
        saveType,
        list,
        attrList: [{
          attributeId:pdType1Id,
          attributeValueList:listOne
        },{
          attributeId:pdType2Id,
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
    let { sendType, list } = changedValues;
    if(currentKey!='list') {
      if(sendType == 2) {
        changedValues['isBeforeSalesInt'] =1;
      }
      props.dispatch({
        type:'baseGoodsAdd/getTotalState',
        payload:changedValues
      })
    } else if(currentKey=='list') {
      goodsList = goodsList.map((el,index)=> {
        list.map((item,idx)=> {
          if(index == idx) {
            el = {...el,...item}
          }
        })
        return el;
      })
      props.dispatch({
        type:'baseGoodsAdd/getListState',
        payload:{ goodsList }
      })
    }
  }
  useEffect(()=>{ initPage()
    return () => {
      props.dispatch({
        type:'baseGoodsAdd/resetPage',
        payload:{}
      })
    };
  },[spuCode])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=>{ form.setFieldsValue({list:goodsList}) },[goodsList]);

  return (
    <Spin tip="加载中..." spinning={props.loading}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          onValuesChange={onValuesChange}
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <BaseInfoSet
            {...props}
            isEdit={isEdit}
            form={form}
            productNature={productNature}/>
          {
            productNature==1&&
            <div>
              <Card title="销售信息">
                <Form.Item label="联营分成类别" name="profits" rules={[{ required: true, message: '请选择联营分成类别' }]}>
                  <Radio.Group>
                    {
                      profitsOptions.map((el)=> (
                        <Radio value={el.key} key={el.key}>{el.value}</Radio>
                      ))
                    }
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                label="B端销售箱规"
                name="minBoxSpecification"
                rules={[
                  { required: true, message: '请输入大于0的整数' },
                  { pattern:/^[1-9]+\d*$/,message:'请输入大于0的整数' },
                ]}>
                  <Input placeholder="请输入大于0的整数" autoComplete="off"/>
                </Form.Item>
                <Form.Item label="是否代发" name="sendType" rules={[{ required: true, message: '请选择是否代发' }]}>
                  <Radio.Group>
                    {
                      sendTypeOptions.map((el,index)=> (
                        <Radio value={el.key} key={el.key}>{el.value}</Radio>
                      ))
                    }
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.sendType !== currentValues.sendType}>
                  {({ getFieldValue }) => {
                    return getFieldValue('sendType') == 2&&
                    <Form.Item  label="代发时效">
                      <Form.Item
                        noStyle
                        name="distributionDays"
                        rules={[
                          { required: true, message: '请输入大于0的整数' },
                          { pattern:/^[1-9]+\d*$/,message:'请输入大于0的整数' },
                        ]}>
                          <Input placeholder="请输入大于0的整数" className="short-input" autoComplete="off"/>
                      </Form.Item>
                      <span>个工作日内发货</span>
                    </Form.Item>
                  }}
                </Form.Item>
                <Form.Item label="是否预售" name="isBeforeSalesInt" rules={[{ required: true, message: '请选择是否预售' }]}>
                  <Radio.Group>
                    {
                      isBeforeSalesOptions.map((el,index)=> (
                        <Radio value={el.key} key={el.key} disabled={totalData.sendType==2&&index==1?true:false}>{el.value}</Radio>
                      ))
                    }
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="是否直邮" name="isDirectSalesInt" rules={[{ required: true, message: '请选择是否直邮' }]}>
                  <Radio.Group>
                    {
                      isDirectSalesOptions.map((el,index)=> (
                        <Radio value={el.key} key={el.key}>{el.value}</Radio>
                      ))
                    }
                  </Radio.Group>
                </Form.Item>
              </Card>
              <Card title="仓管信息">
                <Form.Item
                  label="基础箱规"
                  name="basicsBoxSpecification"
                  rules={[ { pattern:/^[1-9]+\d*$/,message:'请输入大于0的整数' },]}>
                  <Input placeholder="请输入大于0的整数" autoComplete="off"/>
                </Form.Item>
                <Form.Item label="效期管理" name="batchProcessingStatus" rules={[{ required: true, message: '请选择效期管理' }]}>
                  <Radio.Group>
                    {
                      batchProcessingStatusOptions.map((el,index)=> (
                        <Radio value={el.key} key={el.key}>{el.value}</Radio>
                      ))
                    }
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
                          {
                            batchProcessingTypeOptions.map((el,index)=> (
                              <Radio value={el.key} key={el.key}>{el.value}</Radio>
                            ))
                          }
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item label="禁止入库天数" name="lotLimitInDay" rules={[
                        { required: true, message: '请输入大于0的整数' },
                        { pattern:/^[1-9]+\d*$/,message:'请输入大于0的整数' },
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
            {
              spuCode?
              <Form.Item label="修改说明" name="remarks">
                <Input.TextArea placeholder="请输入修改说明" autoComplete="off" maxLength={400} rows={5}/>
              </Form.Item>
              :null
            }
          </Card>
          <div className="handle-operate-save-action">
            <QreturnBtn {...props} />
            {
              totalData.isSave&&<Qbtn onClick={()=>submit(0)}>保存</Qbtn>
            }
            <Qbtn size="free" onClick={()=>submit(1)}>保存并提交审核</Qbtn>
          </div>
        </Form>
      </div>
      <ResetModal
        options={deletedList}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}/>
    </Spin>
  );
}
function mapStateToProps(state) {
  const { BaseGoodsAddReducers } =state;
  return BaseGoodsAddReducers;
}

export default connect(mapStateToProps)(BaseGoodsAdd);
