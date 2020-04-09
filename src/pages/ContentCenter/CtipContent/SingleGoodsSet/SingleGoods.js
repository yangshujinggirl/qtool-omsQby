
import {
  Input,Spin,Form,Select,Table,Card,
  Row,Col,Checkbox,Button,DatePicker
} from 'antd';
import { useState, useEffect } from 'react';
import { QupLoadAndDownLoad, BaseEditTable, QupLoadImgLimt, Qbtn } from 'common';
import { GetActivityInfoApi, GetActivityListApi, GetSaveGoodsApi } from 'api/contentCenter/SingleGoodsSet';
import MainMod from './components/MainMod';
const { RangePicker } = DatePicker;
let FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

const MoreGoodSet=({...props})=> {
  const [form] = Form.useForm();
  let { params } =props;
  let [goods,setGoods]=useState({listOne:[],listTwo:[]});
  let [list,setList]=useState([]);
  let [totalData,setTotalData]=useState({});
  let [activityList,setActivityList]=useState([]);
  let [activityId,setActivityId]=useState({});
  let homepageModuleId = props.match.params.id;
  const getInfo =()=> {
    let pdListDisplayCfgId = params.pdListDisplayCfgId;
    GetActivityInfoApi(pdListDisplayCfgId)
    .then((res)=> {
      let { pdSpuList,...val } =res.result;
      pdSpuList =pdSpuList?pdSpuList:[];
      pdSpuList.map((el,index)=>el.key=index);
      setList(pdSpuList)
      setTotalData(val)
    })
    GetActivityListApi(pdListDisplayCfgId)
    .then((res)=> {
      let { activitys } =res.result;
      activitys = activitys?activitys:[]
      setActivityList(activitys);
    })
  }
  const submit=async()=> {
    try {
      if(list.length< 6) {
        message.error('请至少配置6个商品');
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
      GetSaveGoodsApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const upDateFileList=()=> {

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
  console.log(props)
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          onValuesChange={onValuesChange}
          {...formItemLayout}>
          <Form.Item label="时间段">
            {totalData.beginTime}~{totalData.endTime}
          </Form.Item>
          <Form.Item label="选择活动">
            <Form.Item noStyle name="activityId">
              <Select>
              {
                activityList.map((el) =>(
                  <Select.Option value={el.activityId} key={el.activityId}>
                    {el.activityName}
                  </Select.Option>
                ))
              }
              </Select>
            </Form.Item>
            请先选择你要展示的商品所在的活动
          </Form.Item>
          <QupLoadAndDownLoad
            noLabel={true}
            data={{type:params.type, activityId}}
            fileName="singleGoods"
            action="/qtoolsApp/pdListDisplay/singleLineSpuImport"
            upDateList={upDateFileList}>
            <span>注：首页单行横划商品模块固定展示8件商品，按照以下顺序展示，B端在售库存为0或下架商品不展示，由后位商品按照顺序补充</span>
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
