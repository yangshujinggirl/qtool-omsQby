import { Modal,Form, Input } from "antd";
import { useEffect } from 'react';
import { Sessions, CommonUtils } from 'utils';
import { QupLoadImgLimt, Qmessage } from 'common';
import { GetSaveApi } from "api/contentCenter/BrandSetCtip";

const FormItem = Form.Item;


const Search=({...props})=> {
  const [form] = Form.useForm();
  let  { moduleBackColor, homepageModuleId, visible, fileList, loading } = props;
  //提交
  const onSubmit=async()=> {
    try {
      let  values = await form.validateFields(['moduleBackColor','contentPicUrl']);
      let { contentPicUrl, moduleBackColor } =values;
      contentPicUrl = CommonUtils.formatToUrlPath(contentPicUrl);
      let params={ homepageModuleId, contentPicUrl, moduleBackColor }
      GetSaveApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
        onCancel();
        props.onOk();
      })

    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const onCancel=()=> {
    props.onCancel();
    form.resetFields(['moduleBackColor','backgroundPicUrl']);
  }
  useEffect(()=>{form.setFieldsValue({contentPicUrl:fileList})},[fileList])
  useEffect(()=>{form.setFieldsValue({ moduleBackColor })},[moduleBackColor])
  return (
    <Modal
      width={500}
      getContainer={false}
      confirmLoading={loading}
      visible={visible}
      okText="保存"
      onCancel={onCancel}
      onOk={onSubmit}>
      <Form form={form}>
        <QupLoadImgLimt
          label='内容图片'
          rules={[{ required: true, message: '请上传图片' } ]}
          name="contentPicUrl"
          fileList={fileList}
          limit="1"
          width={343}
          height={16}
          upDateList={(fileList)=>props.upDateFilist(1,fileList)}>
            <span>图片宽高比为343:16，支持png格式，大小在2m以内</span>
        </QupLoadImgLimt>
        <FormItem label="设置模块背景色号" name="moduleBackColor">
          <Input type='color' style={{ width: "60px",height:"32px" }}/>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Search;
