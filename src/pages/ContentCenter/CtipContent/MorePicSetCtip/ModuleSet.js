import { Col, Modal, Form, Radio, Input, message, Button } from "antd";
import { useState, useEffect } from 'react';
import { QreturnBtn, QupLoadImgLimt, Qbtn, Qmessage } from 'common';
import { GetModalInfoApi } from 'api/contentCenter/BannerSetCtip';
import { GetSaveSetApi } from 'api/contentCenter/MorePicSetCtip';
const FormItem = Form.Item;

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

const ModuleSet=({...props})=> {
  const [form] = Form.useForm();
  let [totalData,setTotalData]=useState({});
  let [visible,setVisible]=useState(false);
  let homepageModuleId = props.match.params.id;
  const initPage = () => {
    GetModalInfoApi(homepageModuleId)
    .then(res => {
      setTotalData(res.result)
    });
  };
  const upDateList=(array)=> {
    setList(array)
  }
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
  const lookExample = () => {
    setVisible(true)
  };
  const onCancel = () => {
    setVisible(false)
  };
  useEffect(()=>{ initPage() },[homepageModuleId])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  return (
    <div className="oms-common-addEdit-pages">
      <Form form={form} className="common-addEdit-form" {...formItemLayout} >
        <FormItem label="模块标题名称">
          <FormItem name="title" rules={[{ required: true, message: '请输入模块标题名称' } ]} noStyle>
            <Input  placeholder="请输入模块标题名称" autoComplete="off"/>
          </FormItem>
          模块名称2-4个字符，将在C端App和小程序中展示
        </FormItem>
        <FormItem label="标题栏样式" className="common-required-formItem">
          <FormItem name="titleColor" rules={[{ required: true, message: '请选择' } ]} noStyle>
            <Radio.Group>
              <Radio value={'0'}>黑色</Radio>
              <Radio value={'1'}>白色</Radio>
            </Radio.Group>
          </FormItem>
          <span className="pointerSty" onClick={lookExample}>
            查看示例
          </span>
        </FormItem>
        <FormItem label="是否隐藏模块分割线" name="isDisplaySplitLine" rules={[{ required: true, message: '请选择' } ]}>
          <Radio.Group>
            <Radio value={1}>不隐藏</Radio>
            <Radio value={0}>隐藏</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label="设置模块背景色号" name="moduleBackColor">
          <Input type='color' style={{ width: "60px",height:"32px" }}/>
        </FormItem>
        <div className="handle-operate-save-action">
          <QreturnBtn {...props} />
          <Qbtn onClick={handleSubmit}>
            保存设置
          </Qbtn>
        </div>
      </Form>
      <Modal visible={visible} onCancel={onCancel} footer={null}>
        <img src={require("./img/ex3.png")} style={{ width: "472px" }}/>
      </Modal>
    </div>
  );
}
export default ModuleSet;
