import { Tabs, Button, Form, Modal } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { BaseEditTable, Qbtn } from 'common';
import ColumnsAdd from './columns';
import TabsMod from './components/TabsMod';
import { linkOption, linkOptionTwo } from './optionsMap';
import { GetListApi, GetSaveBannerApi } from 'api/contentCenter/BannerSetCtip';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const panes = [
  { title: '第一帧', key: '1' },
  { title: '第二帧', key: '2' },
  { title: '第三帧', key: '3'},
  { title: '第四帧', key: '4'},
  { title: '第五帧', key: '5'},
];
const BannerSet=({...props})=> {
  const [form] = Form.useForm();
  let [list,setList]=useState([]);
  let [categorySource,setCategorySource]=useState([]);
  let [activiKey,setActiviKey]=useState("1");
  let homepageModuleId = props.match.params.id;

  const onOkToggle=(activiKey)=> {
    setActiviKey(activiKey)
  }
  const upDateList=(array)=>{setList(array)}
  const getList=()=> {
    GetListApi({position:activiKey?activiKey:"1",homepageModuleId})
    .then((res)=> {
      let { dataList, categoryList } =res.result;
      categoryList=categoryList?categoryList:[];
      dataList =dataList.map((el)=> {
        let fileList;
        if(el.picUrl) {
          el.picUrl=[{
             uid: '-1',
             name: 'image.png',
             status: 'done',
             path:el.picUrl,
             url:`${res.fileDomain}${el.picUrl}`
          }]
        }
        if(el.beginTime) {
          el.beginTime = moment(el.beginTime)
        }
        return el;
      })
      setList(dataList);
      setCategorySource(categoryList);
    })
  }
  const onSubmit=async()=> {
    try {
      let  values = await form.validateFields();
      let { goods } =values;
      let dataList= goods.map((el,index) => {
        if(el.picUrl&&el.picUrl instanceof Array == true) {
          let urlPath = el.picUrl[0].response.result;
          el.picUrl = urlPath;
        }
        if(el.beginTime) {
          el.beginTime = moment(el.beginTime).format("YYYY-MM-DD HH:mm");
        }
        return el;
      })
      let params={homepageModuleId, position:activiKey, dataList }
      GetSaveBannerApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
        getList()
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    if(currentKey == 'goods') {
      let newArray = allValues['goods'];
      newArray = newArray.map((el,index)=> {
        list.map((item,idx) => {
          if(index == idx) {
            el = {...item, ...el};
          }
        })
        return el;
      })
      setList(newArray);
    }
  }
  useEffect(()=> { getList() },[homepageModuleId,activiKey]);
  useEffect(()=> {form.setFieldsValue({goods:list})},[list])
  let optionSource = activiKey==1?linkOption:linkOptionTwo;
  console.log(list)
  return(
    <div className="banner-set-pages common-modal-set-component">
      <TabsMod
        activiKey={activiKey}
        panes={panes}
        onOk={onOkToggle}
        onCancel ={getList}/>
      <Form form={form} onValuesChange={onValuesChange}>
        <BaseEditTable
          btnText="新增"
          upDateList={upDateList}
          columns={ColumnsAdd(optionSource,categorySource)}
          dataSource={list}/>
      </Form>
      <Qbtn onClick={()=>onSubmit()}>
        保存
      </Qbtn>
    </div>
  )
}
export default BannerSet;
