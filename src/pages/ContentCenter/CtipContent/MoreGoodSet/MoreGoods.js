
import {
  Input,Spin,Form,Select,Table,Card,Modal,
  Row,Col,Checkbox,Button,DatePicker
} from 'antd';
import { useState, useEffect } from 'react';
import { Qmessage, QupLoadAndDownLoad, BaseEditTable, QupLoadImgLimt, Qbtn } from 'common';
import { GetInfoApi, GetSaveApi } from 'api/contentCenter/MoreGoodSet';
import MainMod from './components/MainMod';
const { RangePicker } = DatePicker;
let FormItem = Form.Item;

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

const MoreGoodSet=({...props})=> {
  const [form] = Form.useForm();
  let [goods,setGoods]=useState({listOne:[],listTwo:[]});
  let [list,setList]=useState([]);
  let homepageModuleId = props.match.params.id;
  const getInfo =()=> {
    GetInfoApi(homepageModuleId)
    .then((res)=> {
      let { pdSpuList } = res.result;
      pdSpuList=pdSpuList?pdSpuList:[];
      pdSpuList.map((el)=>el.key = el.pdSpuId);
      upDateList(pdSpuList)
    })
  }
  const submit=async()=> {
    try {
      if(list.length< 6) {
        Qmessage.error('请至少配置6个商品');
        return;
      }
      let  values = await form.validateFields();
      let { fieldsTwo, fieldsOne } =values;
      let pdSpuList;
      if(fieldsOne&&fieldsTwo) {
        pdSpuList =[...fieldsOne,...fieldsTwo]
      } else if(fieldsOne) {
        pdSpuList = fieldsOne;
      }
      let params= { homepageModuleId, pdSpuList };
      GetSaveApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const upDateFileList=(response)=> {
    let { pdSpuList,noImportSpu } =response.result;
    if(noImportSpu&&noImportSpu.length>0) {
      let content = <div className="import-error-modal">
      以下商品导入失败<br/>
      SPUID:
        {
          noImportSpu.map((el,index) => el = `${el}${index==(noImportSpu.length-1)?'':'/'}`)
        }
      </div>
      Modal.error({
        title:'以下商品导入失败',
        content:content
      })
    }
    pdSpuList&&pdSpuList.map((el)=>el.key=el.pdSpuId)
    upDateList(pdSpuList);
  }
  const upDateList=(array)=> {
    let listOne=[], listTwo=[], goodsObj;
    if(array.length>0) {
      if(array.length>=6) {
        listOne = array.slice(0,6);
        listTwo = array.slice(6);
      } else {
        listOne = array;
      }
      goodsObj = { listOne, listTwo };
    } else {
      goodsObj = { listOne, listTwo };
    }
    setList(array)
    setGoods(goodsObj)
  }
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    if(currentKey == 'fieldsOne') {
      goods['listOne'] = allValues['fieldsOne'];
    } else {
      goods['listTwo'] = allValues['fieldsTwo'];
    }
    goods = {...goods}
    setGoods(goods);
  }
  useEffect(()=> { getInfo() },[homepageModuleId]);
  useEffect(()=> {form.setFieldsValue({fieldsOne:goods.listOne})},[goods.listOne])
  useEffect(()=> {form.setFieldsValue({fieldsTwo:goods.listTwo})},[goods.listTwo])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          onValuesChange={onValuesChange}
          {...formItemLayout}>
          <QupLoadAndDownLoad
            noStyle={false}
            fileName="moreGoods"
            action="/qtoolsApp/pdListDisplay/multilineSpuImport"
            upDateList={upDateFileList}>
            <div>注：首页2行3列商品模块固定展示6件商品，按照以下顺序展示，B端在售库存为0或下架商品不展示，由后位商品按照顺序补充</div>
          </QupLoadAndDownLoad>
          <MainMod form={form} upDateList={upDateList} goods={goods} list={list}/>
          <div className="handle-operate-save-action">
            <Qbtn onClick={submit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  )
}

export default MoreGoodSet;
