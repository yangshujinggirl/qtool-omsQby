import { Modal,Form } from "antd";
import { useEffect } from 'react';
import { QupLoadImgLimt, Qmessage } from 'common';
import { GetSaveApi } from "api/contentCenter/SearchSetCtip";

const FormItem = Form.Item;


const Search=({...props})=> {
  const [form] = Form.useForm();
  let  { homepageModuleId, visible, fileList,fileList2,fileList3, loading } = props;
  //提交
  const onSubmit=async()=> {
    try {
      let  values = await form.validateFields(['backgroundPicUrl','noFullScreenBackGroundPic','contentPicUrl']);
      let { backgroundPicUrl, noFullScreenBackGroundPic, contentPicUrl } =values;
      backgroundPicUrl=formatVal(backgroundPicUrl);
      noFullScreenBackGroundPic=formatVal(noFullScreenBackGroundPic);
      contentPicUrl=formatVal(contentPicUrl);
      let params={ backgroundPicUrl,noFullScreenBackGroundPic,contentPicUrl,homepageModuleId }
      GetSaveApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
        props.onOk();
        onCancel();
      })

    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  //格式化参数
  const formatVal=(val)=> {
    if(val&&val[0].response) {
      let urlPath = val[0].response.result;
      val = urlPath;
    } else {
      val = val.path;
    }
    return val;
  }
  const onCancel=()=> {
    props.onCancel();
    form.resetFields(['backgroundPicUrl','noFullScreenBackGroundPic','contentPicUrl']);
  }
  useEffect(()=>{form.setFieldsValue({backgroundPicUrl:fileList})},[fileList])
  useEffect(()=>{form.setFieldsValue({noFullScreenBackGroundPic:fileList2})},[fileList2])
  useEffect(()=>{form.setFieldsValue({contentPicUrl:fileList3})},[fileList3])
  return (
    <Modal
      width={500}
      getContainer={false}
      confirmLoading={loading}
      visible={visible}
      okText="保存"
      onCancel={onCancel}
      onOk={onSubmit}>
      <Form layout="vertical" form={form}>
        <QupLoadImgLimt
          label='App背景图片(ios全面屏和安卓机型适用)'
          rules={[{ required: true, message: '请上传图片' } ]}
          name="backgroundPicUrl"
          fileList={fileList}
          limit="1"
          width={750}
          height={199}
          upDateList={(fileList)=>props.upDateFilist(1,fileList)}>
            <span>图片宽高比为750:199，支持png格式，大小在2m以内</span>
        </QupLoadImgLimt>
        <QupLoadImgLimt
          label='APP背景图片(ios非全面屏适用)'
          rules={[{ required: true, message: '请上传图片' } ]}
          name="noFullScreenBackGroundPic"
          fileList={fileList2}
          limit="1"
          width={750}
          height={151}
          upDateList={(fileList)=>props.upDateFilist(2,fileList)}>
            <span>图片宽高比为750:151，支持png格式，大小在2m以内</span>
        </QupLoadImgLimt>
        <QupLoadImgLimt
          label='小程序背景图片'
          rules={[{ required: true, message: '请上传图片' } ]}
          name="contentPicUrl"
          fileList={fileList3}
          limit="1"
          width={25}
          height={4}
          upDateList={(fileList)=>props.upDateFilist(3,fileList)}>
            <span>图片宽高比为25:4，支持png格式，大小在2m以内</span>
        </QupLoadImgLimt>
      </Form>
    </Modal>
  );
}

export default Search;
