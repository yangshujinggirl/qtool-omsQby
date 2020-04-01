import { Tabs, Button, Form, Modal } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import {Qmessage, Qbtn } from 'common';
import TabsMod from './components/TabsMod';
import FrameModal from './components/FrameModal';
import BannerIconPicTables from './components/BannerIconPicTables';

const FormItem = Form.Item;
const { TabPane } = Tabs;

function withSubscription(paramsObj,modType,WrapComponent) {//modType:1banner,2:icon;3:多图
  let { GetListApi, GetChangeApi, GetSaveApi, panes } =paramsObj;
  return class Index extends React.Component{
    formRef = React.createRef();
    constructor(props) {
      super(props);
      this.state={
        list:[],
        categorySource:[],
        activiKey:"1",
        visible:false,
        currentItem:{},
        homepageModuleId:this.props.match.params.id,
        unit:modType=="1"?"帖":"坑"
      }
    }
    const [form] = Form.useForm();
    let [list,setList]=useState([]);
    let [categorySource,setCategorySource]=useState([]);
    let [activiKey,setActiviKey]=useState("1");
    let [visible,setVisible]=useState(false);
    let [currentItem,setCurrentItem]=useState({});
    let homepageModuleId = props.match.params.id;
    let unit = modType=="1"?"帖":"坑";
    //查询信息
    getList=(activiKey)=> {
      GetListApi({position:this.state.activiKey,this.state.homepageModuleId})
      .then((res)=> {
        let { dataList, categoryList } =res.result;
        categoryList=categoryList?categoryList:[];
        dataList=dataList?dataList:[];
        dataList =dataList.map((el,index)=> {
          el.key=index;
          if(el.picUrl) {
            let fileLis=[{
               uid: '-1',
               name: 'image.png',
               status: 'done',
               path:el.picUrl,
               url:`${res.fileDomain}${el.picUrl}`
            }]
            el.picUrl=fileLis;
          }
          if(el.beginTime) {
            el.beginTime = moment(el.beginTime)
          }
          return el;
        })
        this.setState({list: dataList,categorySource: categoryList})
      })
    }
    const changePromise=(val)=> {
      return new Promise(function(resolve, reject) {
        setActiviKey(val);
        console.log(val)
        resolve();
      })
    }
    //切换坑帖
    const onOkToggle=(toKey)=> {
      changePromise(toKey)
      .then((res)=> {
        console.log(activiKey)
      })
      // onSubmit(toKey);
    }
    const onCancelToggle=(activiKey)=> {
      setActiviKey(activiKey);
      getList(activiKey);
    }
    //更新list
    const upDateList=(array)=>{setList(array)}
    //格式化参数
    const formatVal=(values)=> {
      if(values.picUrl&&values.picUrl[0].response) {
        let urlPath = values.picUrl[0].response.result;
        values.picUrl = urlPath;
      } else {
        values.picUrl = values.picUrl[0].path;
      }
      if(values.beginTime) {
        values.beginTime = moment(values.beginTime).format("YYYY-MM-DD HH:mm");
      }
      return values;
    }
    //提交
    const onSubmit=async(toggleActiviKey)=> {
      try {
        let  values = await form.validateFields();
        let { goods } =values;
        goods =goods?goods:[];
        let dataList= goods.map((el,index) => {
            el=formatVal(el);
            return el;
        })
        let params={homepageModuleId, position:activiKey, dataList }
        GetSaveApi(params)
        .then((res)=> {
          Qmessage.success('保存成功');
          setActiviKey(toggleActiviKey);
          getList(activiKey)
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
        console.log('newArray,newArray')
        setList(newArray);
      }
    }
    //表单操作事件
    const onOperateClick=(record,type)=> {
      setCurrentItem(record);
      setVisible(true);
    }
    //变帖，坑
    const onOk=(values)=> {
      if(values.frameNum == activiKey ) {
        Qmessage.error(`不可选择当前${unit}`)
        return;
      }
      let params={
        ...currentItem,
        homepageModuleId,
        oldPosition:activiKey,
        newPosition:values.frameNum
      }
      params = formatVal(params);
      GetChangeApi(params)
      .then((res)=> {
        Qmessage.success(`变${unit}成功`);
        onCancel();
        list =list.filter((el)=> el.key!=currentItem.key);
        setList(list);
      })
    }
    const onCancel=()=> {
      setVisible(false);
      setCurrentItem({});
    }
    useEffect(()=> { getList() },[homepageModuleId]);
    useEffect(()=> {form.setFieldsValue({goods:list})},[list])

    return(
      <div className="set-pages oms-common-addEdit-pages">
        {
          WrapComponent&&
          <WrapComponent
            activiKey={activiKey}
            onOk={onOkToggle}
            onCancel ={onCancelToggle}
            {...props}/>
        }
        <Form form={form} onValuesChange={onValuesChange}>
          <BannerIconPicTables
            modType={modType}
            activiKey={activiKey}
            onOperateClick={onOperateClick}
            dataSource={list}
            categorySource={categorySource}
            upDateList={upDateList}/>
          {
            modType!="3"&&
            <FrameModal
              modType={modType}
              visible={visible}
              onOk={onOk}
              onCancel={onCancel}
              form={form}/>
          }
        </Form>
        <div className="handle-operate-save-action">
          <Qbtn onClick={()=>onSubmit()}>保存</Qbtn>
        </div>
      </div>
    )
  }
}
export default withSubscription;
