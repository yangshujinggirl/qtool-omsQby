
import {
  Input,Spin,Form,Select,Table,Card,Modal,
  Row,Col,Checkbox,Button
} from 'antd';
import { useState, useEffect } from 'react';
import { Qmessage, QupLoadAndDownLoad, BaseEditTable, QupLoadImgLimt, Qbtn } from 'common';
import { GetActivityInfoApi, GetActivityListApi, GetSaveGoodsApi } from 'api/contentCenter/SingleGoodsSet';
import MainMod from './components/MainMod';

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
  let { params } =props;//时段参数
  let [goods,setGoods]=useState({listOne:[],listTwo:[]});
  let [list,setList]=useState([]);
  let [totalData,setTotalData]=useState({});
  let [activityList,setActivityList]=useState([]);
  let [activityId,setActivityId]=useState();
  let homepageModuleId = props.match.params.id;
  //格式化数据
  const upDateList=(array)=> {
    let listOne=[], listTwo=[], goodsObj;
    if(array.length>0) {
      if(array.length>=6) {
        listOne = array.slice(0,8);
        listTwo = array.slice(8);
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
  //获取信息
  const getInfo =()=> {
    let pdListDisplayCfgId = params.pdListDisplayCfgId;
    GetActivityInfoApi(pdListDisplayCfgId)
    .then((res)=> {
      let { pdSpuList,...val } =res.result;
      pdSpuList =pdSpuList?pdSpuList:[];
      pdSpuList.map((el,index)=>el.key=index);

      upDateList(pdSpuList)
      setTotalData(val)
    })
    GetActivityListApi(pdListDisplayCfgId)
    .then((res)=> {
      let { activitys } =res.result;
      activitys = activitys?activitys:[]
      setActivityList(activitys);
    })
  }
  //提交
  const submit=async()=> {
    try {
      if(list.length< 8) {
        Qmessage.error('请至少配置8个商品');
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
      let val= { homepageModuleId, pdSpuList, pdListDisplayCfgId:params.pdListDisplayCfgId};
      if(val.type == 1) {
        val = {...val,activityId}
      }
      GetSaveGoodsApi(val)
      .then((res)=> {
        Qmessage.success('保存成功');
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  //导入更新
  const upDateFileList=(res)=> {
    let { pdSpuList, noImportSpuCode, noImportSpu } = res.result;
    if((noImportSpu &&noImportSpu.length>0)||(noImportSpuCode &&noImportSpuCode.length>0)) {
      Modal.error({
        title:'以下商品导入失败',
        content:(
          <div>
            {
              noImportSpu &&noImportSpu.length>0&&
              <p style={{"wordWrap": "break-word" }}>
                SPUID:　
                {noImportSpu.map((item,index) => (
                  `${item}${index==noImportSpu.length-1?'':'/'}`
                ))}
              </p>
            }
            {
              noImportSpuCode &&noImportSpuCode.length>0&&
              <p style={{ "wordWrap": "break-word" }}>
                商品编码:　
                {noImportSpuCode.map((item,index) => (
                  `${item}${index==noImportSpuCode.length-1?'':'/'}`
                ))}
              </p>
            }
          </div>
        )
      })
    }

    pdSpuList = pdSpuList ? pdSpuList : [];
    pdSpuList.map((el, index) => (el.key = index));
    upDateList(pdSpuList);
  }
  const selectId=(key)=> {
    setActivityId(key)
  }

  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    if(currentKey == 'fieldsOne') {
      goods['listOne'] = allValues['fieldsOne'];
    } else {
      goods['listTwo'] = allValues['fieldsTwo'];
    }
    goods = {...goods};
    let array = [...goods['listOne'],...goods['listTwo']];
    setList(array)
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
          <Form.Item label="时间段">
            {totalData.beginTime}~{totalData.endTime}
          </Form.Item>
          {
            params.type==1&&
            <Form.Item label="选择活动">
              <Form.Item noStyle name="activityId">
                <Select  onSelect={selectId}>
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
          }
          {
              params.type==1?
              (
                activityId?
                <div>
                  <QupLoadAndDownLoad
                    noLabel={true}
                    data={{type:params.type, activityId}}
                    fileName="singleGoods"
                    action="/qtoolsApp/pdListDisplay/singleLineSpuImport"
                    upDateList={upDateFileList}>
                    <span>注：首页单行横划商品模块固定展示8件商品，按照以下顺序展示，B端在售库存为0或下架商品不展示，由后位商品按照顺序补充</span>
                  </QupLoadAndDownLoad>
                  <MainMod
                    form={form}
                    upDateList={upDateList}
                    goods={goods}
                    list={list}
                    params={params}/>
                </div>
                :null
              )
              :
              <div>
                <QupLoadAndDownLoad
                  noLabel={true}
                  data={{type:params.type, activityId}}
                  fileName="singleGoods"
                  action="/qtoolsApp/pdListDisplay/singleLineSpuImport"
                  upDateList={upDateFileList}>
                  <span>注：首页单行横划商品模块固定展示8件商品，按照以下顺序展示，B端在售库存为0或下架商品不展示，由后位商品按照顺序补充</span>
                </QupLoadAndDownLoad>
                <MainMod
                  form={form}
                  upDateList={upDateList}
                  goods={goods}
                  list={list}
                  params={params}/>
              </div>
          }
          <div className="handle-operate-save-action">
            <Qbtn onClick={submit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  )
}

export default MoreGoodSet;
