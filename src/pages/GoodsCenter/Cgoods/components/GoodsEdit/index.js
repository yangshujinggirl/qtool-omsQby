import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Upload,
  Select,Col,
  Checkbox,Button,Radio,
  AutoComplete,Descriptions,Form
} from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { ColumnsAdd } from '../column';
import { QreturnBtn, Qtable, Qbtn, Qmessage } from 'common';
import { GetDetailApi, GetEditApi,GetLabelApi } from 'api/cTip/GeneralTradeGoods';
import EditTable from './components/EditTable';
import GraphicInformation from './components/GraphicInformation';
import { serviceOption } from '../optionMap';
import './index.less';

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

const MainComponent=({...props})=> {
  let { goodsList,totalData, descList,labelList,form,onSubmit } =props;

  return(
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages general-trade-edit-pages">
        <Form {...formItemLayout} form={form}>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">基础信息</span></p>
            <Form.Item label="spu编码">
              {totalData.spuCode}
            </Form.Item>
            <Form.Item label="商品名称">
              {totalData.productName}
            </Form.Item>
            <FormItem label='品牌'>
              {totalData.brandName}
            </FormItem>
            <FormItem label='品牌归属地'>
              {totalData.brandAddressName}
            </FormItem>
            <FormItem label='商品类型'>
              {totalData.productTypeStr}
            </FormItem>
            <FormItem label='后台类目'>
              {totalData.categoryStr}
            </FormItem>
            <Form.Item label="是否品牌直供">
              {totalData.sendTypeStr}
            </Form.Item>
            <Form.Item label="配送说明">
              {totalData.deliveryDesc}
            </Form.Item>
            <FormItem label='C端商品名称' name="productCname" rules={[{ required: true, message: '请输入C端商品名称'}]}>
               <Input autoComplete="off" placeholder="请输入C端商品名称" maxLength={54}/>
            </FormItem>
            <Form.Item label="C端商品卖点" name="sellingPoint">
              <Input autoComplete="off" placeholder="请输入C端商品名称" maxLength={54}/>
            </Form.Item>
            {
              descList.length>0&&
              <Form.Item label="描述属性">
                <Descriptions bordered column={2}>
                {
                  descList.map((el,idx)=> (
                    <Descriptions.Item  label={el.attributeName} key={el.key}>
                      <Form.Item name={['descriptAttributeList',idx,'attributeValue']} noStyle>
                        <Input autoComplete="off" placeholder="请输入描述属性" maxLength={60}/>
                      </Form.Item>
                    </Descriptions.Item>
                  ))
                }
                </Descriptions>
              </Form.Item>
            }
            <Form.Item label="C端商品标签" name="tabId">
              <Select placeholder="请选择C端商品标签">
                {
                  labelList.map((el) => (
                    <Option value={el.tabId} key={el.tabId}>{el.tabName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </div>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">服务信息</span></p>
            <Form.Item label="服务" name="serviceInfoVal" rules={[{ required: true, message: '请选择服务' }]}>
              <Checkbox.Group>
                {
                  totalData.serviceInfoList&&totalData.serviceInfoList.map((el)=> (
                    <Checkbox value={el.pdExplainId} key={el.pdExplainId}>{el.name}</Checkbox>
                  ))
                }
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">SKU信息</span></p>
            <EditTable dataSource={goodsList}/>
          </div>
          <GraphicInformation formItemLayout={formItemLayout} {...totalData}/>
          <div className="handle-operate-save-action">
            <QreturnBtn {...props} />
            <Qbtn onClick={onSubmit}>
              保存
            </Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  )
}

function withSubscription(WrappedComponent,productNature) {
  // console.log('edit',productNature)
  return ({...props})=> {
    const [form] = Form.useForm();
    let [totalData, setTotal] = useState({serviceInfoList:[]});
    let [goodsList, setGoodsList] = useState([]);
    let [descList, setDescList] = useState([]);
    let [labelList, setLabelList] = useState([]);
    let spuCode = props.match.params.id;
    /*商品信息*/
    const initPage=()=> {
      const  { params } =props.match;
      GetDetailApi(params.id)
      .then((res) => {
        let { descriptAttributeList, subList,...pdSpu} =res.result;
        let serviceInfo = pdSpu.serviceInfo&&pdSpu.serviceInfo;
        subList = subList?subList:[]
        pdSpu.serviceInfo = serviceInfo==""?[]:serviceInfo.split('-');
        descriptAttributeList&&descriptAttributeList.map((el,idx) =>el.key=`${el.descriptAttributeId}${idx}`)
        subList.map((el)=>{el.key=el.pdSkuId;el.skuShelfLife = el.skuShelfLife?moment(el.skuShelfLife):null});
        pdSpu.serviceInfoList = pdSpu.serviceInfoList?pdSpu.serviceInfoList:[];
        let serviceInfoVal =[];
        pdSpu.serviceInfoList.map((el) => {
          if(el.selected==1){
            serviceInfoVal.push(el.pdExplainId)
          }
        });
        pdSpu.serviceInfoVal = serviceInfoVal;
        setTotal(pdSpu)
        setGoodsList(subList)
        setDescList(descriptAttributeList)
      })
      GetLabelApi()
      .then((res) => {
        let { result } =res;
        result=result?result:[];
        result.map((el)=>el.key=el.tabId);
        setLabelList(result);
      })
    }
    const goReturn=()=> {
      let link = productNature == 1?'general_trade_product':'cross_border_product';
      props.history.push(`/account/${link}`)
    }
    const onSubmit=async ()=> {
      try {
        let  values = await form.validateFields();
        let { serviceInfoVal,..._val } =values;
        _val.subList = _val.subList&&_val.subList.map((el,index)=> {
          el.skuShelfLife = el.skuShelfLife?moment(el.skuShelfLife).format('YYYY-MM-DD'):null;
          goodsList.map((item,idx) => {
            if(index == idx) {
              el.skuCode=item.skuCode;
            }
          })
          return el;
        })
        _val.descriptAttributeList = _val.descriptAttributeList&&_val.descriptAttributeList.map((el,index) => {
          descList.map((item,idx) => {
            if(index==idx) {
              el.attributeId = item.attributeId;
              el.attributeName = item.attributeName;
            }
          })
          return el;
        })
        _val = {..._val, spuCode, serviceInfoList: serviceInfoVal }
        GetEditApi(_val)
        .then((res)=> {
          Qmessage.success('保存成功')
          goReturn();
        })
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    }
    useEffect(()=>{
      initPage()
    },[])
    useEffect(()=>{
      form.setFieldsValue(totalData);
    },[totalData])
    useEffect(()=>{
      form.setFieldsValue({descriptAttributeList:descList});
    },[descList])
    useEffect(()=>{
      form.setFieldsValue({subList:goodsList});
    },[goodsList])
    let params = {
      labelList,form,onSubmit,goReturn,
      goodsList,descList,totalData
    }
    return(
      <WrappedComponent {...props} {...params}/>
    )
  }
}

export {
  withSubscription,MainComponent
}
