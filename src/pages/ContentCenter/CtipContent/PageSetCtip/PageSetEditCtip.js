import { Input,Spin,Upload, Select,Col,Checkbox,Button,Radio,AutoComplete,Form } from 'antd';
import { useState, useEffect } from 'react';
import { Sessions, CommonUtils } from 'utils';
import { GetInfoApi, GetSaveApi } from 'api/contentCenter/PageSetCtip';
import { QupLoadImgLimt, Qmessage, Qtable, Qbtn } from 'common';
import ImageTextEdit from './components/ImageTextEdit';

import { ColumnsEditImgGeneral } from './columns';
import './PageSetEditCtip.less';

let FormItem = Form.Item;
let Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
const formItemLayoutBig = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

function EditImg({...props}) {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);
  let [totalData, setTotal] = useState({});
  let [imgList, setImgList] = useState([]);
  let [imgCircleList, setImgCircleList] = useState([]);
  let [detailImg, setDetailImg] = useState([]);
  let pdConfigureId = props.match.params.id;
  let fileDomain=Sessions.get("fileDomain");
  const getInfo=()=> {
    if(!pdConfigureId) {
      return;
    }
    // setLoading(true)
    GetInfoApi(pdConfigureId)
    .then((res) => {
      let { pdConfigureConfigList,...val } =res.result;
      pdConfigureConfigList = pdConfigureConfigList.map((el,index)=> {
        if(el.type == 1) {
          el.text =CommonUtils.formatToFilelist(el.text)
        }
        return el;
      })
      setTotal(val);
      setDetailImg(pdConfigureConfigList)
    })
  }
  const goReturn=()=> {
    props.history.push('/account/items_list')
  }
  const formatList=(arr)=> {
    arr = arr.map((el,index) => {
      if(el.status=='done') {
        if(el.response&&el.response.httpCode=='200') {
          return el.response.result;
        } else {
          return el.path;
        }
      }
    })
    return arr;
  }
  const onSubmit=async()=> {
    try {
      const values = await form.validateFields();
      let { shareFriendImg, shareFriendCircleImg, productDetailImgList, ..._val } =values;
      let params={ ..._val, pdConfigureConfigList:detailImg };
      if(_val.isShare==1) {
        shareFriendImg = CommonUtils.formatToUrlPath(shareFriendImg);
        shareFriendCircleImg = CommonUtils.formatToUrlPath(shareFriendCircleImg);
        params={ ...params, shareFriendImg, shareFriendCircleImg }
      }
      if(pdConfigureId) {
        params={...params, pdConfigureId }
      }
      GetSaveApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
        goReturn()
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const upDateImgList=(array)=> {
    setImgList(array)
  }
  const upDateImgCircleList=(array)=> {
    setImgCircleList(array)
  }
  const upDateDetailImg=(list)=> {
    setDetailImg(list);
    form.setFieldsValue({productDetailImgList:list})
  }

  useEffect(()=>{ getInfo() },[pdConfigureId])
  useEffect(()=>{ form.setFieldsValue({shareFriendImg:imgList}) },[imgList])
  useEffect(()=>{ form.setFieldsValue({shareFriendCircleImg:imgCircleList}) },[imgCircleList])
  // useEffect(()=>{ form.setFieldsValue({productDetailImgList:detailImg}) },[detailImg]);
  console.log(detailImg);
  return <Spin tip="加载中..." spinning={loading}>
    <div className="oms-common-addEdit-pages baseGeneralTrade-editImg-pages">
      <Form {...formItemLayout} form={form}>
        <Form.Item label="页面名称" name="pageName" rules={[{ required: true, message: '请输入页面名称,15字符以内'}]}>
          <Input autoComplete="off" placeholder='请输入页面名称,15字符以内' maxLength='15' />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <Input autoComplete="off" placeholder='请输入页面名称,15字符以内' maxLength='15' />
        </Form.Item>
        <Form.Item label="c端是否可分享" name="isShare" rules={[{ required: true, message: '请选择c端是否可分享'}]}>
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.isShare !== currentValues.isShare}>
          {({ getFieldValue }) => {
            return getFieldValue('isShare') == 1 ? (
              <Form.Item noStyle>
                <Form.Item label="分享微信好友标题" name="shareTitle" rules={[{ required: true, message: '请输入分享标题，30字以内'}]}>
                  <Input autoComplete="off" placeholder='请输入分享标题，30字以内' maxLength='30' />
                </Form.Item>
                <QupLoadImgLimt
                  label="分享微信好友图片"
                  rules={[{ required: true, message: '请上传图片' } ]}
                  name="shareFriendImg"
                  fileList={imgList}
                  limit="1"
                  upDateList={upDateImgList}/>
                <QupLoadImgLimt
                  label="朋友圈分享图片"
                  rules={[{ required: true, message: '请上传图片' } ]}
                  name="shareFriendCircleImg"
                  fileList={imgCircleList}
                  limit="1"
                  upDateList={upDateImgCircleList}/>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item label="页面配置" {...formItemLayoutBig}>
          <ImageTextEdit detailImg={detailImg} upDateList={upDateDetailImg} form={form}/>
        </Form.Item>
        <div className="handle-operate-save-action">
          <Qbtn onClick={goReturn}>
            返回
          </Qbtn>
          <Qbtn onClick={onSubmit}>
            保存
          </Qbtn>
        </div>
      </Form>
    </div>
  </Spin>
}

export default EditImg;
