
import {
  Input,Spin,Form,Select,Table,Card,
  Row,Col,Checkbox,Button,DatePicker
} from 'antd';
import { useState, useEffect } from 'react';
import { BaseEditTable, QupLoadImgLimt, Qbtn } from 'common';
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
      setThemeList(themeList);
      setShowThemeList(showThemeList);
    })
  }
  const submit=async()=> {
    try {
      let  values = await form.validateFields();
      let { newComerPicUrl, couponPopUpPicUrl, time, ...params } =valus;
      params.beginTime = moment(time[0]).format('YYYY-MM-DD hh:mm:ss')
      params.endTime = moment(time[1]).format('YYYY-MM-DD hh:mm:ss');
      console.log(params);
      // GetSaveApi(params)
      // .then((res)=> {
      //   Qmessage.success('保存成功');
      //   func&&typeof func == 'function'?func():getList(activiKey)
      // })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const onValuesChange=()=> {

  }
  const upDateList=(array)=> {
    setShowThemeList(array)
  }
  const onselect=(value,option)=> {
    console.log(value,option)
  }
  useEffect(()=> {getInfo()},[homepageModuleId])
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          onValuesChange={onValuesChange}
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <BaseEditTable
            btnText="新增"
            dataSource={showThemeList}
            upDateList={upDateList}
            columns={ColumnsAdd(themeList,onselect)}/>
          <div className="handle-operate-save-action">
            <Qbtn onClick={submit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  )
}

export default ThemeActivitySet;
