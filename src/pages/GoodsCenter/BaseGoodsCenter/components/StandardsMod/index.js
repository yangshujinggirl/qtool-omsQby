import { Form, Select } from 'antd';
import { useState, useEffect } from 'react';
import { GetAttributeApi } from 'api/home/BaseGoods';
import Creatlabel from '../Creatlabel';

let Option = Select.Option;

const StandardsMod=({...props})=> {
  const { totalData } =props;
  let [attributeArray,setAttributeArray] =useState([]);
  //获取规格
  const fetchAttribute=()=>{
    GetAttributeApi()
    .then((res) => {
      let { result } =res;
      result=result?result:[]
      result.map((el)=>el.key =el.attributeId);
      setAttributeArray(result);
    })
  };
  //商品规格change
  const handleChangeType=(type,option)=> {
    let { specData, goodsList, pdType1Id, pdType2Id, skuInitData } =props;
    let { specTwo, specOne } =specData;
    goodsList = [{ key:'0/0',...skuInitData }];
    //重置商品规格id,商品属性
    if(option=='0'&&(pdType1Id==0||pdType2Id==0)){
      specData = {specTwo:[], specOne:[] };
    }else if(type=='one') {
      specData = {...specData, specOne:[] };
      if(specTwo.length>0) {
        goodsList = specTwo.map((el) => {
          return {
            ...skuInitData,
            name:el.name,
            key:el.key,
            salesAttributeName:el.name,
          }
        })
      }
    }else if(type=='two') {
      specData = {...specData, specTwo:[] };
      if(specOne.length>0) {
        goodsList = specOne.map((el) => {
          return {
            ...skuInitData,
            salesAttributeName:el.name,
            key:el.key,
            name:el.name
          }
        })
      }
    }
    props.dispatch({
      type:'baseGoodsAdd/getListState',
      payload:{ goodsList }
    })
    props.dispatch({
      type:'baseGoodsAdd/getSpec',
      payload:{ specData }
    })
  }

  //删除商品属性
  const deleteGoodsLabel=(removedTags,type)=> {
    let { specData, goodsList, skuInitData } =props;
    let newArray;
    if(type == 'one') {
      let specOne = specData.specOne.filter(judgeTags => judgeTags.name !== removedTags.name);
      if(specOne.length == 0) {
        if(specData.specTwo.length>0) {
          newArray = specData.specTwo.map((el) => {
            return {
              ...skuInitData,
              name:el.name,
              key:el.key,
              salesAttributeName:el.name,
            }
          })
        } else {
          newArray = [{ key:'0/0', ...skuInitData}];
        }
      } else {
        newArray = goodsList.filter((value)=>{return value.salesAttributeName.indexOf(removedTags.name)=='-1'});
      }
      specData={...specData,specOne };
    } else {
      let specTwo = specData.specTwo.filter(judgeTags => judgeTags.name !== removedTags.name);
      if(specTwo.length == 0) {
        if(specData.specOne.length>0) {
          newArray = specData.specOne.map((el) => {
            return {
              ...skuInitData,
              name:el.name,
              key:el.key,
              salesAttributeName:el.name,
            }
          })
        } else {
          newArray = [{ key:'0/0',...skuInitData}];
        }
      } else {
        newArray = goodsList.filter((value)=>{return value.salesAttributeName.indexOf(removedTags.name)=='-1'});
      }
      specData={...specData,specTwo };
    }
    props.dispatch({
      type:'baseGoodsAdd/getSpec',
      payload:{ specData }
    })
    props.dispatch({
      type:'baseGoodsAdd/getListState',
      payload:{ goodsList:newArray }
    })
  }
  //增加商品属性
  const addGoodsLabel=(inputValue,type)=> {
    let { specData, goodsList, skuInitData } =props;
    let newGoodsList = [...goodsList];
    let newArr = []
    if(type == 'one') {
      let specOne = [...specData.specOne,...[{name:inputValue,key:inputValue,...skuInitData}]];
      if(specData.specTwo.length>0) {
        specData.specTwo.map((el,index) => {
          let item = {...el,salesAttributeName:`${inputValue}/${el.name}`};
          newArr.push(item);
        })
      } else {
        newArr.push({salesAttributeName:inputValue,key:inputValue,...skuInitData});
      }
      specData={ ...specData, specOne }
    } else {
      let specTwo = [...specData.specTwo,...[{name:inputValue,key:inputValue,...skuInitData}]];
      if(specData.specOne.length>0) {
        specData.specOne.map((el,index) => {
          let item = {...el,salesAttributeName:`${el.name}/${inputValue}`};
          newArr.push(item);
        })
      }
      specData={ ...specData, specTwo }
    }
    //去重
    newArr.map((el)=> {
      newGoodsList.map((item,index) => {
        if(el.salesAttributeName.indexOf(item.salesAttributeName)!='-1') {
          newGoodsList.splice(index,1);
        }
        if(item.key == '0/0') {//去除无规格
          newGoodsList.splice(index,1);
        }
      })
    })
    newGoodsList = [...newGoodsList,...newArr];
    props.dispatch({
      type:'baseGoodsAdd/getSpec',
      payload:{ specData }
    })
    props.dispatch({
      type:'baseGoodsAdd/getListState',
      payload:{ goodsList:newGoodsList }
    })
  }

  useEffect(()=>{ fetchAttribute()},[]);

  return <div>
          <Form.Item label='商品规格1'>
            <Form.Item name="pdType1Id" rules={ [{ required: true, message: '请选择'}]}>
              <Select
                disabled={totalData.spuCode?true:false}
                placeholder="请选择商品规格1"
                autoComplete="off"
                onChange={(selected)=>handleChangeType('one',selected)}>
                <Option value={'0'} key={'0'}>无</Option>
                {
                  attributeArray.length>0 &&
                  attributeArray.map((ele,index) => (
                    <Option
                      disabled={ele.attributeId == totalData.pdType2Id?true:false}
                      value={ele.attributeId}
                      key={ele.attributeId}>{ele.attributeName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Creatlabel
              disabled={(totalData.pdType1Id!='0'&&totalData.pdType1Id)?false:true}
              deleteGoodsLabel={deleteGoodsLabel}
              addGoodsLabel={addGoodsLabel}
              level="one"/>
          </Form.Item>
          <Form.Item label='商品规格2'>
            <Form.Item name="pdType2Id" rules={ [{ required: true, message: '请选择'}]}>
              <Select
                disabled={(totalData.spuCode)?true:false}
                placeholder="商品规格2" autoComplete="off"
                onChange={(selected)=>handleChangeType('two',selected)}>
                <Option value={'0'} key={'0'}>无</Option>
                {
                  attributeArray.length>0 &&
                  attributeArray.map((ele,index) => (
                    <Option
                      disabled={ele.attributeId == totalData.pdType1Id?true:false}
                      value={ele.attributeId}
                      key={ele.attributeId}>{ele.attributeName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Creatlabel
               disabled={(totalData.pdType2Id!='0'&&totalData.pdType2Id)?false:true}
               deleteGoodsLabel={deleteGoodsLabel}
               addGoodsLabel={addGoodsLabel}
               level="two"/>
          </Form.Item>
  </div>
}

export default StandardsMod;
