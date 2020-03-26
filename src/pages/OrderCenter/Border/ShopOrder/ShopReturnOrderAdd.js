import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Modal,Select,Cascader,AutoComplete,Table,Upload
} from 'antd';
import NP from 'number-precision';
import { useState, useEffect } from 'react';
import { QupLoadAndDownLoad, Qtable, Qbtn, BaseEditTable, Qmessage, CascaderAddressOptions } from 'common';
import {
  GetSaveApi, GetSaveFreeApi,
  GetShopAddressApi, GetShopListApi,
  GetSpuInfoApi
} from 'api/home/OrderCenter/Border/ShopOrder';

import { columnsAdd } from './column';

let FormItem = Form.Item;
let Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };


const ShopOrderAdd=({...props})=> {
  const [form] = Form.useForm();
  console.log(props)
  let orderType = props.match.params.type;//2赠品 1商品
  let SaveOrderApi = orderType==1?GetSaveApi:GetSaveFreeApi;
  let [totalData, setTotal] = useState({});
  let [shopList, setShopList] = useState([]);
  let [goodsList, setGoodsList] = useState([{key:0}]);
  //搜索门店
  const handleSearch = (value) => {
    GetShopListApi({name:value})
    .then((res) => {
      let { result } =res;
      result = result?result:[];
      result = result.map((el)=> {
        return {
          key:el.spShopId,
          value:el.name
        }
      })
      setShopList(result)
    })
  }
  //选中门店
  const onSelect=(value,option)=>{
    GetShopAddressApi({spShopId:option.key})
    .then((res) => {
      let { result } =res;
      let cascaderAdress = [result.recProvinceId,result.recCityId,result.recDistrictId];
      totalData = {
        ...totalData,
        cascaderAdress,
        spShopId:option.key,
        recName:result.shopman,
        recTel:result.telephone,
        recAddress:result.address
      }
      setTotal(totalData)
    })
  }
  const handleBlur=(event,index,type)=> {
    let value = event.target.value;
    switch(type){
      case "code":
        onBlurCode(value,index)
        break;
      case "qty":
        onBlurQty(value,index)
        break;
    }
  }
  //查询商品
  const onBlurCode=(value,index)=> {
    GetSpuInfoApi(value)
    .then((res)=> {
      let { subList } =res.result;
      let itemInfo={
        code:subList[0].skuCode,
        name:subList[0].productName,
        displayName:subList[0].salesAttributeName,
        price:subList[0].businessPrice,
        amount:null
      }
      goodsList[index] = {...goodsList[index],...itemInfo };
      goodsList=[...goodsList]
      setGoodsList(goodsList)
    })
  }
  const onBlurQty=(value,index)=> {
    goodsList[index] = {...goodsList[index],qty:value };
    let qtySum=0, amountSum=0;
    goodsList.map((el)=> {
      if(el.qty) {
        qtySum=NP.plus(qtySum, el.qty)
        el.amount=NP.times(el.qty,el.price);
        if(orderType==2) {
          el.amount=NP.times(el.qty,"0.01");
        }
        amountSum=NP.plus(amountSum,el.amount);
      }
    })
    setTotal({...totalData,qtySum, amountSum })
    setGoodsList(goodsList)
  }
  const goReturn=()=> {
    props.history.push('/account/channel_orders')
  }
  const onSubmit = async () => {
    try {
      let  values = await form.validateFields();
      Modal.confirm({
        title: '请确认订单？',
        content: `订单数量：${totalData.qtySum}，订单金额：${totalData.amountSum}`,
        onOk() {
          handleOk(values)
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  //确认
  const handleOk=(values)=> {
    let { cascaderAdress, list,...params } =values;
    params = {
      spOrder:{
        ...params,
        spShopId:totalData.spShopId,
        recProvinceId:cascaderAdress[0],
        recCityId:cascaderAdress[1],
        recDistrictId:cascaderAdress[2],
      },
      orderCodes:goodsList
    }
    SaveOrderApi(params)
    .then((res)=> {
      Qmessage.success('保存成功')
      goReturn();
    })
  }
  const upDateList=(arrVal)=> { setGoodsList(arrVal) }
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=>{ form.setFieldsValue({list:goodsList })},[goodsList])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages shopOrder-addEdit-pages">
        <Form className="common-addEdit-form" form={form} {...formItemLayout}>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">基础信息</span></p>
            <Form.Item label="门店名称" name="shopName" rules={[{ required: true, message: '请输入门店名称'}]}>
              <AutoComplete
                  options={shopList}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                  placeholder='请选择门店名称'/>
            </Form.Item>
            <Form.Item label="下单原因" name="createType" rules={[{ required: true, message: '请选择' }]}>
              <Select placeholder="请选择" allowClear={true}>
                <Option value='1'>新店铺货</Option>
                <Option value='3'>总部样品</Option>
                <Option value='4'>办公物料</Option>
              </Select>
            </Form.Item>
            <Form.Item label="收货人" name="recName" rules={[{ required: true, message: '请输入收货人'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="收货电话" name="recTel" rules={[{ required: true, message: '请输入收货电话'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="收货地址">
              <Form.Item noStyle name="cascaderAdress" rules={[{ required: true, message: '请输入收货地址'}]}>
                <Cascader
                  options={CascaderAddressOptions}
                  placeholder="请选择省市区" />
              </Form.Item>
              <Form.Item noStyle name="recAddress" rules={[{ required: true, message: '请输入详细地址'}]}>
                <Input placeholder="请输入详细地址" autoComplete="off"/>
              </Form.Item>
            </Form.Item>
            <QupLoadAndDownLoad action="/qtoolsErp/import/spOrder/skuCode" upDateList={upDateList}>
              <BaseEditTable
                btnText="添加商品"
                upDateList={upDateList}
                dataSource={goodsList}
                columns={columnsAdd(handleBlur)}/>
            </QupLoadAndDownLoad>
            <Form.Item label="商品数量" name="qtySum" rules={[{ required: true, message: '请输入商品数量'}]}>
              <Input placeholder="请输入商品数量" autoComplete="off" disabled/>
            </Form.Item>
            <Form.Item label="订单总额" name="amountSum" rules={[{ required: true, message: '请输入订单总额'}]}>
              <Input placeholder="请输入订单总额" autoComplete="off" disabled/>
            </Form.Item>
            <Form.Item label="订单备注" name="remark">
              <Input.TextArea placeholder='请输入备注，50字以内' maxLength='50' rows={4} autoComplete="off"/>
            </Form.Item>
          </div>
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
