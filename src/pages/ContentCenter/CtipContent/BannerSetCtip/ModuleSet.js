import { Form, message, Button } from "antd";
import { useState, useEffect } from 'react';
import { CommonUtils } from 'utils';
import { QreturnBtn, QupLoadImgLimt, Qbtn, Qmessage } from 'common';
import { GetModalInfoApi, GetSaveSetApi } from 'api/contentCenter/BannerSetCtip';
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
  let [list,setList]=useState([]);
  let homepageModuleId = props.match.params.id;
  const initPage = () => {
    GetModalInfoApi(homepageModuleId)
    .then(res => {
      let { backgroundPicUrl } =res.result;
      backgroundPicUrl = CommonUtils.formatToFilelist(backgroundPicUrl)
      setList(backgroundPicUrl)
    });
  };
  const upDateList=(array)=> {
    setList(array)
  }
  const handleSubmit =async()=> {
    try {
      let  values = await form.validateFields();
      let { backgroundPicUrl } = values;
      backgroundPicUrl = CommonUtils.formatToUrlPath(backgroundPicUrl);
      GetSaveSetApi({ homepageModuleId, backgroundPicUrl })
      .then(res => {
        Qmessage.success('保存成功')
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  useEffect(()=>{ initPage() },[homepageModuleId]);
  useEffect(()=>{ form.setFieldsValue({backgroundPicUrl: list}) },[list])
  return (
    <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
      <Form
        className="common-addEdit-form"
        form={form}
        {...formItemLayout}>
        <FormItem label="模块背景图">
            <QupLoadImgLimt
              rules={[{ required: true, message: '请上传图片' } ]}
              name="backgroundPicUrl"
              fileList={list}
              limit="1"
              width={375}
              height={196}
              upDateList={upDateList}>
            图片宽高比为375:196，支持png格式，大小在2m以内
          </QupLoadImgLimt>
          <div className="handle-operate-save-action">
            <QreturnBtn {...props} />
            <Qbtn onClick={handleSubmit}>
              保存设置
            </Qbtn>
          </div>
        </FormItem>
      </Form>
    </div>
  );
}
export default ModuleSet;
