import { Form, Input, message, Button, Radio } from "antd";
import { useState, useEffect } from 'react';
import { QupLoadImgLimt, Qbtn, Qmessage } from 'common';
import { GetSaveSetApi } from 'api/contentCenter/IconSetCtip';
import { GetModalInfoApi } from 'api/contentCenter/BannerSetCtip';
const FormItem = Form.Item;

const ModuleSet=({...props})=> {
  const [form] = Form.useForm();
  let [totalData,setTotalData]=useState([]);
  let homepageModuleId = props.match.params.id;
  const initPage = () => {
    GetModalInfoApi(homepageModuleId)
    .then(res => {
      setTotalData(res.result)
    });
  };
  const handleSubmit =async()=> {
    try {
      let  values = await form.validateFields();
      GetSaveSetApi({...values, homepageModuleId})
      .then(res => {
        Qmessage.success('保存成功')
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  useEffect(()=>{ initPage() },[homepageModuleId])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  return (
    <Form form={form}>
      <FormItem label="模块背景色号" name="moduleBackColor">
        <Input type='color' style={{ width: "60px",height:"32px" }}/>
      </FormItem>
      <FormItem label="Icon名称样式" name="titleColor">
        <Radio.Group>
          <Radio value="0">黑色</Radio>
          <Radio value="1">白色</Radio>
        </Radio.Group>
      </FormItem>
      <Qbtn onClick={handleSubmit}>
        保存设置
      </Qbtn>
    </Form>
  );
}
export default ModuleSet;
