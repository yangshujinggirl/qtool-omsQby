import { Input,Form,Select,Card,Checkbox,Radio,AutoComplete} from 'antd';
import { useState, useEffect } from 'react';
import { GetOriginApi, GetBrandApi, GetWarehouseApi, GetCategoryApi } from "api/home/BaseGoods";
import { productTypeOptions, procurementTargetOptions } from '../options';
let Option = Select.Option;

const BaseInfoSet=({...props})=> {
  const [wareList,setWareList] =useState([]);
  const [brandList,setBrandlIst] =useState([])
  const [originList,setOriginList] =useState([])
  let [list,setList]=useState([]);
  let [list2,setList2]=useState([]);
  let [list3,setList3]=useState([]);
  let [list4,setList4]=useState([]);
  const { totalData, isEdit, categoryData, productNature } =props;

  const initCategory=(level,parentId)=> {
    GetCategoryApi({ level, parentId })
    .then(res => {
      let list = res.result?res.result:[];
      list.map((el,index)=>el.key=index);
      switch(level) {
        case 1:
          setList(list)
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
  const getCategory=(level,parentId)=> {
    return new Promise((resolve, reject) => {
      GetCategoryApi({ level, parentId })
      .then(res => {
        let list = res.result?res.result:[];
        list.map((el,index)=>el.key=index);
        resolve(list);
      });
    });
  }
  const getCategoryArray=()=> {
    Promise.all([
      getCategory('2',totalData.categoryId),
      getCategory('3',totalData.categoryId2),
      getCategory('4',totalData.categoryId3)
    ])
    .then((result) => {
      [list2,list3,list4]=result;
      setList2(list2)
      setList3(list3)
      setList4(list4)
    }).catch((error) => {
      console.log(error)
    })
  }
  const handleChangeLevel = (level,value) => {
    switch(level) {
      case 1:
        setList2([])
        setList3([])
        setList4([])
        props.dispatch({
          type:'baseGoodsAdd/getTotalState',
          payload:{categoryId2:null,categoryId3:null,categoryId4:null}
        })
      case 2:
        setList3([])
        setList4([])
        props.dispatch({
          type:'baseGoodsAdd/getTotalState',
          payload:{categoryId3:null,categoryId4:null}
        })
        break;
      case 3:
        setList4([])
        props.dispatch({
          type:'baseGoodsAdd/getTotalState',
          payload:{categoryId4:null}
        })
        break;
    }
    level++;
    initCategory(level, value);
  };

  //品牌搜索
  const handleSearch=(value)=> {
    GetBrandApi({brandName:value})
    .then((res)=> {
      let { result } =res;
      result=result?result:[];
      setBrandlIst(result);
    })
  }
  //品牌，国家选中事件
  const autoSelect=(value, option)=> {
    let item = brandList.find((el)=> el.brandNameCn== value);
    props.dispatch({
      type:'baseGoodsAdd/getTotalState',
      payload:{brandAddress:item.brandCountryName,brandId:option.key}
    })
  }
  //产地搜索
  const handleOriginSearch=(value)=> {
    GetOriginApi({countryName:value})
    .then((res)=> {
      let { result } =res;
      result=result?result:[];
      result = result.map((el)=>{
        let item={}
        item.key =el.countryCode;
        item.value =el.countryName;
        return item;
      })
      setOriginList(result);
    })
  }
  //产地选中事件
  const autoOriginSelect=(value,option)=> {
    props.dispatch({
      type:'baseGoodsAdd/getTotalState',
      payload:{countryCode:option.key}
    })
  }

  //保税仓
  const getWarehouse=()=> {
    GetWarehouseApi({warehouseType:3})
    .then((res)=> {
      setWareList(res.result)
    })
  }
  useEffect(()=>{
    initCategory(1,null);
    if(productNature == 2) {
      getWarehouse()
    }
  },[])
  useEffect(()=>{
    if(totalData.spuCode) {
      getCategoryArray()
    }
  },[totalData.spuCode])
  return (
    <Card title="基础信息">
      {
        isEdit&&
          <Form.Item label="spu编码">
            {totalData.spuCode}
          </Form.Item>
      }
      <Form.Item label="商品名称" name="productName" rules={ [{ required: true, message: '请输入商品名称'}]}>
        <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
      </Form.Item>
      <Form.Item label='品牌' name="brandName" rules={[{ required: true, message: '请选择商品品牌'}]}>
        <AutoComplete
         autoComplete="off"
         onSearch={handleSearch}
         onSelect={(value, option)=>autoSelect(value, option)}
         placeholder="请选择商品品牌">
         {
           brandList.map((el)=> (
             <AutoComplete.Option key={el.id} value={el.brandNameCn} text={el.brandCountry}>
                {el.brandNameCn}
             </AutoComplete.Option>
           ))
         }
        </AutoComplete>
      </Form.Item>
      <Form.Item label="品牌归属地" name="brandAddress" rules={[{ required: true, message: '请选择商品品牌'}]}>
        <Input disabled autoComplete="off" placeholder="请输入品牌归属地"/>
      </Form.Item>
      <Form.Item label='产地' name="countryName">
        <AutoComplete
         autoComplete="off"
         options={originList}
         onSearch={handleOriginSearch}
         onSelect={(value, option)=>autoOriginSelect(value, option)}
         placeholder="请输入产地"/>
      </Form.Item>
      {
        productNature==1?
        <div>
          <Form.Item label="商品类型" name="productType" rules={[{ required: true, message: '请选择商品类型' }]}>
            <Radio.Group>
              {
                productTypeOptions.map((el)=>(
                <Radio value={el.key} key={el.key}>{el.value}</Radio>
                ))
              }
            </Radio.Group>
          </Form.Item>
          <Form.Item label="采购主体" name="procurementTarget" rules={[{ required: true, message: '请选择采购主体'}]}>
            <Select placeholder="请选择后台一级类目" disabled>
              {
                procurementTargetOptions.map((el)=>(
                <Option value={el.key} key={el.key}>{el.value}</Option>
                ))
              }
            </Select>
          </Form.Item>
        </div>
        :
        <Form.Item label="保税仓" name="bondedWarehouseId" rules={[{ required: true, message: '请选择保税仓'}]}>
          <Select placeholder="请选择保税仓" disabled={isEdit}>
            {
              wareList.map((el)=>(
                <Option value={el.id} key={el.id}>{el.warehouseName}</Option>
              ))
            }
          </Select>
        </Form.Item>
      }
      <Form.Item label="一级类目" name="categoryId" rules={[{ required: true, message: '请选择一级类目'}]}>
        <Select placeholder="请选择后台一级类目" disabled={isEdit} onChange={(select)=>handleChangeLevel(1,select)}>
        {
          list.map((el) => (
            <Option value={el.id} key={el.id}>{el.categoryName}</Option>
          ))
        }
        </Select>
      </Form.Item>
      <Form.Item label="二级类目" name="categoryId2" rules={[{ required: true, message: '请选择二级类目'}]}>
        <Select
          disabled={isEdit||list2.length==0}
          placeholder="请选择二级类目"
          onChange={(select)=>handleChangeLevel(2,select)}>
          {
            list2.map((el) => (
              <Option value={el.id} key={el.id}>{el.categoryName}</Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item label="三级类目" name="categoryId3" rules={[{ required: true, message: '请选择三级类目'}]}>
        <Select
        disabled={isEdit||list3.length==0}
        placeholder="请选择三级类目"
        onChange={(select)=>handleChangeLevel(3,select)}>
        {
          list3.map((el) => (
            <Option value={el.id} key={el.id}>{el.categoryName}</Option>
          ))
        }
        </Select>
      </Form.Item>
      <Form.Item label="四级类目" name="categoryId4" rules={[{ required: true, message: '请选择四级类目'}]}>
        <Select
        disabled={isEdit||list4.length==0} placeholder="请选择四级类目">
        {
          list4.map((el) => (
            <Option value={el.id} key={el.id}>{el.categoryName}</Option>
          ))
        }
        </Select>
      </Form.Item>
    </Card>
  )
}
export default BaseInfoSet;
