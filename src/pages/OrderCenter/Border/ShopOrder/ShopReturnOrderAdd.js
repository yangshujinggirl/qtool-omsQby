import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Modal,Select,Table, DatePicker,Card, Radio
} from 'antd';
import NP from 'number-precision';
import { useState, useEffect } from 'react';
import { QupLoadAndDownLoad, Qtable, Qbtn, BaseEditTable, Qmessage } from 'common';
import { GetExpressApi, GetSaveReturnApi, GetSearchShopApi} from 'api/home/OrderCenter/Border/ShopOrder';
import { ColumnsReturnAdd } from './column';

let FormItem = Form.Item;
let Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };


const ShopOrderAdd=({...props})=> {
  const [form] = Form.useForm();
  let [totalData, setTotal] = useState({});
  let [goodsList, setGoodsList] = useState([]);
  let [expressList, setExpressList] = useState([]);
  //搜索快递
  const getExpressList=()=> {
    GetExpressApi()
    .then((res)=> {
      let { result } =res;
      result = result?result:[];
      result.map((el,index)=> el.key=index)
      setExpressList(result);
    })
  }
  //搜索订单
  const handleSearch = (e) => {
    let value = e.target.value;
    if(!value) {
      return;
    }
    GetSearchShopApi(value)
    .then((res) => {
      let { listDetail,...values } =res.result;
      listDetail = listDetail?listDetail:[];
      listDetail.map((el,index)=> {
        el.key=index;
        let canReturn = el.returnQty?el.returnQty:0;
        el.qty = NP.minus(el.qty,canReturn)
        el.returnQty=null;
      })
      setTotal(values)
      setGoodsList(listDetail)
    })
  }
  const handleBlur=(event,index)=> {
    let value = event.target.value;
    if(!value) {return}
    goodsList[index] = {...goodsList[index],returnQty:value };
    goodsList.map((el)=> {
      if(el.returnQty) {
        el.amount=NP.times(el.returnQty,el.price);
      }
    })
    goodsList=[...goodsList]
    setGoodsList(goodsList)
  }
  const goReturn=()=> {
    props.history.push('/account/channel_orders')
  }
  const onSubmit = async () => {
    try {
      let  values = await form.validateFields();
      handleOk(values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  //确认
  const handleOk=(values)=> {
    let { list,...params } =values;
    params = {
      ...params,
      type:"20",
      details:goodsList,
      spOrderId:totalData.spOrderId,
      spShopId:totalData.spShopId
    }
    GetSaveReturnApi(params)
    .then((res)=> {
      Qmessage.success('保存成功')
      goReturn();
    })
  }
  const upDateList=(arrVal)=> { setGoodsList(arrVal) }
  useEffect(()=>{ getExpressList()},[])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=>{ form.setFieldsValue({list:goodsList })},[goodsList])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages shopOrder-addEdit-pages">
        <Form className="common-addEdit-form" form={form} {...formItemLayout}>
          <Card title="基础信息">
            <Form.Item label="门店单号" name="spOrderNo" rules={[{ required: true, message: '请输入门店单号'}]}>
              <Input placeholder="请输入门店单号" autoComplete="off" onBlur={handleSearch}/>
            </Form.Item>
            <Form.Item label="门店名称" name="spName">
              <Input placeholder="请输入门店名称" autoComplete="off" disabled/>
            </Form.Item>
            <Form.Item label="退货原因" name="reason" rules={[{ required: true, message: '请输入退货原因' }]}>
              <Input.TextArea placeholder='请输入退货原因' maxLength='50' rows={4} autoComplete="off"/>
            </Form.Item>
            <Form.Item label="退单类型" name="returnType" rules={[{ required: true, message: '请选择退单类型' }]}>
              <Radio.Group>
                <Radio value={10}>退货退款</Radio>
                <Radio value={20}>仅退款</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="退货商品">
              <Table
                bordered
                pagination={false}
                dataSource={goodsList}
                columns={ColumnsReturnAdd(handleBlur)}/>
            </Form.Item>
            <Form.Item
               noStyle
               shouldUpdate={(prevValues, currentValues) => prevValues.returnType !== currentValues.returnType}>
               {({ getFieldValue }) => {
                 return getFieldValue('returnType') == 10 ? (
                   <Form.Item noStyle>
                     <Form.Item label="收货仓库" name="wsWarehouseId" rules={[{ required: true, message: '请选择收货仓库' }]}>
                       <Select placeholder="请选择收货仓库">
                         <Option value={2} key={2}>华东仓配中心</Option>
                         <Option value={1} key={1}>吴江仓库</Option>
                       </Select>
                     </Form.Item>
                     <Form.Item label="发货快递" name="logisticsId" rules={[{ required: true, message: '请选择发货快递' }]}>
                       <Select placeholder="请选择发货快递">
                       {
                         expressList.map((el) => (
                           <Option value={el.logisticsId} key={el.logisticsId}>{el.logisticsName}</Option>
                         ))
                       }
                       </Select>
                     </Form.Item>
                     <Form.Item label="快递单号" name="trackingNumber" >
                       <Input.TextArea placeholder='请输入快递单号' maxLength='50' rows={4} autoComplete="off"/>
                     </Form.Item>
                   </Form.Item>
                 ) : null;
               }}
             </Form.Item>
             <Form.Item label="订单备注" name="remarks" >
               <Input.TextArea placeholder='请输入快递单号' maxLength='100' rows={4} autoComplete="off"/>
             </Form.Item>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}>
              返回
            </Qbtn>
            <Qbtn onClick={()=>onSubmit()}>
              保存
            </Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

export default ShopOrderAdd;
