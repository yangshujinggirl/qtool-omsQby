import { Form, message, Button } from "antd";
import { useState, useEffect } from 'react';
import { QupLoadImgLimt, Qbtn, Qmessage } from 'common';
import { GetModalInfoApi, GetSaveSetApi } from 'api/contentCenter/BannerSetCtip';
const FormItem = Form.Item;

const ModuleSet=({...props})=> {
  const [form] = Form.useForm();
  let [list,setList]=useState([]);
  let homepageModuleId = props.match.params.id;
  const initPage = () => {
    GetModalInfoApi(homepageModuleId)
    .then(res => {
      console.log(res)
      // if (res.code == "0") {
      //   const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
      //   const { backgroundPicUrl } = res.homepageModuleVo;
      //   let fileList = [];
      //   if (backgroundPicUrl) {
      //     fileList = [
      //       {
      //         uid: "-1",
      //         status: "done",
      //         url: fileDomain + backgroundPicUrl
      //       }
      //     ];
      //   }
      //   this.setState({ fileList,imageUrl:backgroundPicUrl });
      //   this.props.dispatch({type: 'tab/loding',payload:false})
      // }else{
      //   this.props.dispatch({type: 'tab/loding',payload:false})
      // }
    });
  };
  const upDateList=(array)=> {
    setList(array)
  }
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
        <Qbtn onClick={handleSubmit}>
          保存设置
        </Qbtn>
      </FormItem>
    </Form>
  );
}
export default ModuleSet;
