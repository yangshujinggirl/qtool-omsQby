import { Modal, Form, Input, message, Button, Radio } from "antd";
import { useState, useEffect } from 'react';
import { QreturnBtn, QupLoadImgLimt, Qbtn, Qmessage } from 'common';
import { GetSaveSetApi } from 'api/contentCenter/IconSetCtip';
import { GetModalInfoApi } from 'api/contentCenter/BannerSetCtip';
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
  let [totalData,setTotalData]=useState([]);
  let [visible,setVisible]=useState(false);
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
  const lookExample = () => {
    setVisible(true)
  };
  const onCancel = () => {
    setVisible(false)
  };
  useEffect(()=>{ initPage() },[homepageModuleId])
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  return (
    <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
      <Form
        className="common-addEdit-form"
        form={form}
        {...formItemLayout}>
        <FormItem label="模块背景色号" name="moduleBackColor">
          <Input type='color' style={{ width: "60px",height:"32px" }}/>
        </FormItem>
        <FormItem label="Icon名称样式" className="common-required-formItem">
          <FormItem name="titleColor" rules={[{ required: true, message: '请选择' } ]} noStyle>
            <Radio.Group>
              <Radio value="0">黑色</Radio>
              <Radio value="1">白色</Radio>
            </Radio.Group>
          </FormItem>
          <span className="pointerSty" onClick={lookExample}>
            查看示例
          </span>
        </FormItem>
        <div className="handle-operate-save-action">
          <QreturnBtn {...props} />
          <Qbtn onClick={handleSubmit}>
            保存设置
          </Qbtn>
        </div>
        <Modal visible={visible} onCancel={onCancel} footer={null}>
          <img src={require('./img/ex1.png')} style={{width:'470px'}} />
        </Modal>
      </Form>
    </div>
  );
}
export default ModuleSet;
