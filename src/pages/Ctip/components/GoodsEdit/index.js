import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Upload,
  Select,Row,Col,
  Checkbox,Button,Radio,
  AutoComplete,Descriptions,Form
} from 'antd';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ColumnsAdd } from '../column';
import { Qtable, Qbtn, QupLoadImgLimt } from 'common';
import { GetDetailApi, GetEditApi } from 'api/cTip/GeneralTradeGoods';
import EditTable from './components/EditTable';
import GraphicInformation from './components/GraphicInformation';
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
  const { goodsList,totalData, descriptAttributeList,
          form,goReturn,onSubmit } =props;
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
              {totalData.brandAddress}
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
               <Input autoComplete="off" placeholder="请输入C端商品名称"/>
            </FormItem>
            <Form.Item label="C端商品卖点" name="sellingPoint" rules={[{ required: true, message: '请选择商品类型' }]}>
              <Input autoComplete="off" placeholder="请输入C端商品名称"/>
            </Form.Item>
            {
              descriptAttributeList.length>0&&
              <Form.Item label="描述属性">
                <Descriptions bordered column={2}>
                {
                  descriptAttributeList.map((el,index)=> (
                    <Descriptions.Item label={el.attributeName} key={el.key}>
                      <Form.Item name={`descriptAttributeList[${index}]attributeValue`} noStyle>
                        <Input autoComplete="off" placeholder="请输入描述属性" maxLength={60}/>
                      </Form.Item>
                    </Descriptions.Item>
                  ))
                }
                </Descriptions>
              </Form.Item>
            }
            <Form.Item label="C端商品标签" name="tabId" rules={[{ required: true, message: '请选择C端商品标签'}]}>
              <Select placeholder="请选择C端商品标签">
                <Option value={1} key={1}>淮安</Option>
                <Option value={2} key={2}>苏州蔻兔</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">服务信息</span></p>
            <Form.Item label="服务" name="serviceInfo" rules={[{ required: true, message: '请选择服务' }]}>
              <Checkbox.Group>
                <Checkbox value='1' key='1'>七天无理由退换货</Checkbox>
                <Checkbox value='2' key='2'>快速退货</Checkbox>
                <Checkbox value='3' key='3'>提供发票</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">SKU信息</span></p>
            <EditTable dataSource={goodsList}/>
          </div>
          <GraphicInformation formItemLayout={formItemLayout} data={totalData}/>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}>
              返回
            </Qbtn>
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
  console.log('edit',productNature)
  return ({...props})=> {
    const [form] = Form.useForm();
    let [totalData, setTotal] = useState({});
    let [goodsList, setGoodsList] = useState([]);
    let [descriptAttributeList, setDescList] = useState([]);
    let spuCode = props.match.params.id;
    /*商品信息*/
    const initPage=()=> {
      const  { params } =props.match;
      GetDetailApi(params.id)
      .then((res) => {
        let { descriptAttributeList, subList,...pdSpu} =res.result;
        pdSpu.serviceInfo = pdSpu.serviceInfo&&pdSpu.serviceInfo.split('-');
        descriptAttributeList=descriptAttributeList?descriptAttributeList:[];
        subList&&subList.map((el)=>el.key=el.pdSkuId);
        setTotal(pdSpu)
        setGoodsList(subList)
      })
    }
    const goReturn=()=> {

    }
    const onSubmit=async ()=> {
      try {
        let  values = await form.validateFields();
        values.serviceInfo = values.serviceInfo&&values.serviceInfo.join('-');
        values = {...values,spuCode,operateUser:'' }
        console.log(values)
        GetEditApi(values)
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
      form.setFieldsValue(descriptAttributeList);
    },[descriptAttributeList])
    useEffect(()=>{
      form.setFieldsValue({subList:goodsList});
    },[goodsList])
    let params = {
      form,onSubmit,goReturn,goodsList,descriptAttributeList,totalData
    }
    return(
      <WrappedComponent {...props} {...params}/>
    )
  }
}

export {
  withSubscription,MainComponent
}
