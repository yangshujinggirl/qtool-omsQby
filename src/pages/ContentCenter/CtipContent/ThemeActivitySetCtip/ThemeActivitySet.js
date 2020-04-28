
import {
  Input,Spin,Form,Select,Table,Card,
  Row,Col,Checkbox,Button,DatePicker
} from 'antd';
import { useState, useEffect } from 'react';
import { QreturnBtn, BaseEditTable, Qmessage, QupLoadImgLimt, Qbtn } from 'common';
import { GetListApi, GetSaveApi } from 'api/contentCenter/ThemeActivitySetCtip';
import ColumnsAdd from './columns';
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

const ThemeActivitySet=({...props})=> {
  const [form] = Form.useForm();
  let [themeList,setThemeList]=useState([{}]);
  let [showThemeList,setShowThemeList]=useState([]);
  let homepageModuleId = props.match.params.id;
  const getInfo=()=> {
    GetListApi({homepageModuleId})
    .then((res)=> {
      let { showThemeList, themeList } = res.result;
      showThemeList.map((el,index)=>{
        el.key=index;
        el.themeId = el.showThemeId;
      });
      setThemeList(themeList);
      setShowThemeList(showThemeList);
    })
  }
  const submit=async()=> {
    try {
      let  values = await form.validateFields();
      let list = showThemeList.map((el)=>{
        return {
          themeId:el.themeId,
          frameDetailId:el.frameDetailId,
        }
      })
      let params= { themeList:list, homepageModuleId }
      GetSaveApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const upDateList=(array)=> {
    setShowThemeList(array)
  }
  const onselect=(value,index)=> {
    let currentItem=themeList.find((el)=>el.themeId == value);
    showThemeList[index] = {
      ...showThemeList[index],
      themeId:currentItem.themeId,
      showSubtitle: currentItem.subtitle,
      showThemeStatusStr: currentItem.statusStr,
    };
    showThemeList=[...showThemeList]
    setShowThemeList(showThemeList)
  }
  useEffect(()=> { getInfo() },[homepageModuleId]);
  useEffect(()=>{ form.setFieldsValue({list:showThemeList}) },[showThemeList])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <BaseEditTable
            limit="4"
            dataSource={showThemeList}
            upDateList={upDateList}
            columns={ColumnsAdd(themeList,onselect)}/>
          <div className="handle-operate-save-action">
            <QreturnBtn {...props} />
            <Qbtn onClick={submit} disabled={showThemeList.length< 4}>保存</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  )
}

export default ThemeActivitySet;
