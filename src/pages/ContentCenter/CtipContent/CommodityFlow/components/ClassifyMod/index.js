import { useState, useEffect } from 'react';
import { Form, Select, Col, Row, Input, Button, Radio, message } from 'antd';
import lodash from 'lodash';
import { QupLoadAndDownLoad, Qbtn, Qmessage } from 'common';
import { GetCategoryApi } from "api/home/BaseGoods";
import { GetAddClassProApi } from 'api/contentCenter/CommodityFlow';

const FormItem = Form.Item;
const Option = Select.Option;

const ClassifyMod=({...props})=> {
  let { goodsList } =props;
  let [list1,setList1]=useState([]);
  let [list2,setList2]=useState([]);
  let [list3,setList3]=useState([]);
  let [list4,setList4]=useState([]);

  const getCategory=(level,parentId)=> {
    GetCategoryApi({ level, parentId })
    .then(res => {
      let list = res.result?res.result:[];
      list.map((el,index)=>el.key=index);
      switch(level) {
        case 1:
          setList1(list)
          break;
        case 2:
          setList2(list)
          break;
        case 3:
          setList3(list)
          break;
        case 4:
          setList4(list)
          break;
      }
    });
  }
  const handleChangeLevel = (level,value) => {
    switch(level) {
      case 1:
        setList2([])
        setList3([])
        setList4([])
        props.form.current.resetFields(['pdCategory2Id','pdCategory3Id','pdCategory4Id']);
      case 2:
        setList3([])
        setList4([])
        props.form.current.resetFields(['pdCategory3Id','pdCategory4Id']);
        break;
      case 3:
        setList4([])
        props.form.current.resetFields(['pdCategory4Id']);
        break;
    }
    level++;
    getCategory(level, value);
  };
  //添加
  const handleAdd=()=> {
    if(goodsList.length==100) {
      message.error('商品数量已满100，请删除后再添加');
      return;
    }
    const { pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id } =props.form.current.getFieldsValue();
    let pdCategory = { pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id }
    let paramsStr=null;
    for( let key in pdCategory) {
      if(pdCategory[key]) {
        paramsStr = paramsStr?`${paramsStr}-`:'';
        paramsStr+= pdCategory[key];
      }
    }
    if(!paramsStr) {
      return;
    }
    GetAddClassProApi({categoryAddStr:paramsStr})
    .then((res) => {
      let { result } =res;
        let differenceLen = Number(100)-Number(goodsList.length);
        for(var i=0;i< goodsList.length;i++){
            for(var j = 0;j< result.length;j++){
              if(goodsList[i].pdSpuId == result[j].pdSpuId) {
                result.splice(j,1);
              }
            }
        }
        if(result.length > differenceLen) {
          message.error('表格仅支持添加100个商品，超出的商品添加失败',4);
          result = result.slice(0,differenceLen)
        }
        goodsList =[...goodsList,...result]
        goodsList.map((el,index) => {
          el.FixedPdSpuId = el.pdSpuId;
          el.key = index;
        })
        props.upDateList(goodsList);
    })
  }
  //导入
  const upDateFileList=(response)=> {
    let { unImportSpuArr,notExistSpuArr,pdFlowTabSpus }=response.result;
    if(unImportSpuArr&&unImportSpuArr.length>0) {
      let content = <div className="import-error-modal">
      商品已导入超过100个，以下商品导入失败<br/>
      SPUID:
        {
          unImportSpuArr.map((el,index) => el = `${el}${index==(unImportSpuArr.length-1)?'':'/'}`)
        }
      </div>
      Qmessage.error(content)
    }
    if(notExistSpuArr&&notExistSpuArr.length>0) {
      let content = <div className="import-error-modal">
      以下商品不存在，导入失败<br/>
      SPUID:
        {
          notExistSpuArr.map((el,index) => el = `${el}${index==(notExistSpuArr.length-1)?'':'/'}`)
        }
      </div>
      Qmessage.error(content)
    }
    pdFlowTabSpus= pdFlowTabSpus?pdFlowTabSpus:[];
    pdFlowTabSpus.map((el,index) =>{
      el.key = index;
      el.FixedPdSpuId = el.pdSpuId;
    })
    props.upDateList(pdFlowTabSpus);
  }

  useEffect(()=>{ getCategory(1) },[]);
  return(
    <div className="part-one part-same">
      <p className="part-head">选择商品</p>
      <Row gutter={24}>
        <Col span={6}>
          <FormItem label='一级分类' name="pdCategory1Id">
            <Select placeholder="请选择一级分类" onChange={(select)=>handleChangeLevel(1,select)}>
              {
                list1.map((ele,index) => (
                  <Option
                    value={ele.id}
                    key={ele.id}>{ele.categoryName}</Option>
                ))
              }
            </Select>
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='二级分类' name="pdCategory2Id">
            <Select
              placeholder="请选择二级分类"
              disabled={!list2.length>0}
              autoComplete="off"
              onChange={(select)=>handleChangeLevel(2,select)}>
              {
                list2.map((ele,index) => (
                  <Option
                    value={ele.id}
                    key={ele.id}>{ele.categoryName}</Option>
                ))
              }
            </Select>
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='三级分类' name="pdCategory3Id">
            <Select
              placeholder="请选择三级分类"
              disabled={!list3.length>0}
              autoComplete="off"
              onChange={(select)=>handleChangeLevel(3,select)}>
              {
                list3.map((ele,index) => (
                  <Option
                    value={ele.id}
                    key={ele.id}>{ele.categoryName}</Option>
                ))
              }
            </Select>
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label='四级分类' name="pdCategory4Id">
            <Select
              placeholder="请选择四级分类"
              disabled={!list4.length>0}
              autoComplete="off"
              onChange={(select)=>handleChangeLevel(4,select)}>
              {
                list4.map((ele,index) => (
                  <Option
                    value={ele.id}
                    key={ele.id}>{ele.categoryName}</Option>
                ))
              }
            </Select>
          </FormItem>
        </Col>
      </Row>
      <div className="handle-add-btn-list">
        <Qbtn
          className="btn-item"
          onClick={handleAdd}>
            确定添加
        </Qbtn>
        <QupLoadAndDownLoad
          noStyle={true}
          fileName="commodityFlow"
          action="/qtoolsApp/content/pdFlowTab/pdFlowSpuImport"
          upDateList={upDateFileList}/>
      </div>
    </div>
  )
}
export default ClassifyMod;
