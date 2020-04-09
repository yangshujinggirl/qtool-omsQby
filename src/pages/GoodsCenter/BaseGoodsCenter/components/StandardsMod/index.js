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
    //重置商品规格id,商品属性
    if(option==0&&type=='one') {
      // this.props.form.setFieldsValue({
      //   pdSkus:undefined
      // })
    }
  }
  //删除商品属性
  const deleteGoodsLabel=(removedTags,type)=> {
    let { specData,goodsList } =props;
    let newArray = goodsList.filter((value)=>{return value.salesAttributeName.indexOf(removedTags.name)=='-1'});
    if(type == 'one') {
      let specOne = specData.specOne.filter(judgeTags => judgeTags.name !== removedTags.name);
      specData={...specData,specOne };
    } else {
      let specTwo = specData.specTwo.filter(judgeTags => judgeTags.name !== removedTags.name);
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
    let { specData, goodsList } =props;
    let newGoodsList = [...goodsList];
    let newArr = []
    if(type == 'one') {
      let specOne = [...specData.specOne,...[{name:inputValue,key:inputValue}]];
      if(specData.specTwo.length>0) {
        specData.specTwo.map((el,index) => {
          let item = {...el,salesAttributeName:`${inputValue}/${el.name}`};
          newArr.push(item);
        })
      } else {
        newArr.push({salesAttributeName:inputValue,key:inputValue});
      }
      specData={ ...specData, specOne }
    } else {
      let specTwo = [...specData.specTwo,...[{name:inputValue,key:inputValue}]];
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

  useEffect(()=>{ fetchAttribute()},[])
  return <div>
          <Form.Item label='商品规格1'>
            <Form.Item name="pdType1Id" rules={ [{ required: true, message: '请选择'}]}>
              <Select
                disabled={totalData.spuCode?true:false}
                placeholder="请选择商品规格1"
                autoComplete="off"
                onChange={(selected)=>handleChangeType('one',selected)}>
                <Option value={0} key={0}>无</Option>
                {
                  attributeArray.length>0 &&
                  attributeArray.map((ele,index) => (
                    <Option
                      value={ele.attributeId}
                      key={ele.attributeId}>{ele.attributeName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Creatlabel
              disabled={totalData.pdType1Id?false:true}
              deleteGoodsLabel={deleteGoodsLabel}
              addGoodsLabel={addGoodsLabel}
              level="one"/>
          </Form.Item>
          <Form.Item label='商品规格2'>
            <Form.Item name="pdType2Id" rules={ [{ required: true, message: '请选择'}]}>
              <Select
                disabled={totalData.spuCode?true:false}
                placeholder="商品规格2" autoComplete="off"
                onChange={(selected)=>handleChangeType('two',selected)}>
                <Option value={0} key={0}>无</Option>
                {
                  attributeArray.length>0 &&
                  attributeArray.map((ele,index) => (
                    <Option
                      value={ele.attributeId}
                      key={ele.attributeId}>{ele.attributeName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Creatlabel
               disabled={totalData.pdType2Id?false:true}
               deleteGoodsLabel={deleteGoodsLabel}
               addGoodsLabel={addGoodsLabel}
               level="two"/>
          </Form.Item>
  </div>
}

export default StandardsMod;
