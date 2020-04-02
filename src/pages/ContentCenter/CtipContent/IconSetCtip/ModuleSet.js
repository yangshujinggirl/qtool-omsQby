import { Form, Input, message, Button, Radio } from "antd";
import { useState, useEffect } from 'react';
import { QupLoadImgLimt, Qbtn, Qmessage } from 'common';
import { GetSaveSetApi } from 'api/contentCenter/IconSetCtip';
import { GetModalInfoApi } from 'api/contentCenter/BannerSetCtip';
const FormItem = Form.Item;

const ModuleSet=({...props})=> {
  const [form] = Form.useForm();
  let [list,setList]=useState([]);
  let homepageModuleId = props.match.params.id;
  const initPage = () => {
    GetModalInfoApi(homepageModuleId)
    .then(res => {
    //   if (res.code == "0") {
    //     const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
    //     const { backgroundPicUrl } = res.homepageModuleVo;
    //     let fileList = [];
    //     if (backgroundPicUrl) {
    //       fileList = [
    //         {
    //           uid: "-1",
    //           status: "done",
    //           url: fileDomain + backgroundPicUrl
    //         }
    //       ];
    //     }
    //     this.setState({ fileList,imageUrl:backgroundPicUrl });
    //     this.props.dispatch({type: 'tab/loding',payload:false})
    //   }else{
    //     this.props.dispatch({type: 'tab/loding',payload:false})
    //   }
    });
  };
  const handleSubmit =()=> {
    GetSaveSetApi({
      homepageModuleId,
      backgroupPicUrl:list[0].response.result
    })
    .then(res => {
      Qmessage.success('保存成功')
    })
  }
  useEffect(()=>{ initPage() },[homepageModuleId])

  return (
    <Form form={form}>
      <FormItem label="设置模块背景色号" name="moduleBackColor">
        <Input type='color' style={{ width: "60px" }}/>
      </FormItem>
      <FormItem label="设置模块背景色号" name="titleColor">
        <Radio.Group>
          <Radio value={0}>黑色</Radio>
          <Radio value={1}>白色</Radio>
        </Radio.Group>
      </FormItem>
      <Qbtn onClick={handleSubmit}>
        保存设置
      </Qbtn>
    </Form>
  );
}
export default ModuleSet;
