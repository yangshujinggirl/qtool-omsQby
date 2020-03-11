import {
  Input,Spin,Upload,
  Select,Col,
  Checkbox,Button,Radio,
  AutoComplete,Descriptions,Form
} from 'antd';
// import { DownOutlined,UpOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { GetImgInfoApi, GetEditImgApi } from 'api/home/BaseGoods';
import { Qtable, Qbtn } from 'common';
import ImageTextEdit from './components/ImageTextEdit';
import QupLoadImgLimt from './components/QupLoadImgLimt';

import { columnsEditImg } from './column';
import './BaseGeneralTradeEditImg.less';

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
  let [totalData, setTotal] = useState({});
  let [fileList, setFileList] = useState([]);
  let [skuList, setSkuList] = useState([]);
  let [detailImg, setDetailImg] = useState([]);
  let spuCode = props.match.params.id;
  let fileDomain="https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/";
  const getInfo=()=> {
    GetImgInfoApi({spuCode})
    .then((res) => {
      let { spuImgList, productDetailImgList, skuList,...pdSpu } =res.result;
      spuImgList =spuImgList?spuImgList:[]
      productDetailImgList =productDetailImgList?productDetailImgList:[{key:0,type:2}]
      skuList =skuList?skuList:[];
      spuImgList = spuImgList.map((el,index)=> {
        let item = {
              uid: index,
              name: 'image.png',
              status: 'done',
              url:`${fileDomain}${el}`
            }
        return item;
      })
      skuList = skuList.map((el,index)=> {
        let item = {
              uid: index,
              name: 'image.png',
              status: 'done',
              url:`${fileDomain}${el.skuImg}`
            }
        el.skuImg = el.skuImg?[item]:[];
        el.key = index;
        return el;
      })
      productDetailImgList = productDetailImgList.map((el,index)=> {
        if(el.type==2) {
          let item = {
                uid: index,
                name: 'image.png',
                status: 'done',
                url:`${fileDomain}${el.content}`
              }
          el.content = el.content?[item]:[];
        }
        return el;
      })
      setTotal(pdSpu);
      setFileList(spuImgList);
      setSkuList(skuList);
      setDetailImg(productDetailImgList);
    })
  }
  const goReturn=()=> {

  }
  const formatList=(arr)=> {
    arr = arr.map((el,index) => {
      if(el.response.httpCode=='200') {
        return el.response.result;
      }
    })
    return arr;
  }
  const onSubmit=async()=> {
    try {
      const values = await form.validateFields();
      let { spuImgList, skuImgList, productDetailImgList } =values;
      spuImgList = formatList(spuImgList);
      skuImgList = skuImgList.map((el,index) => {
        el.skuImg = formatList(el.skuImg);
        skuList.map((item,idx)=> {
          if(index==idx) {
            el = {...item,...el }
          }
        })
        return el;
      })
      productDetailImgList = productDetailImgList.map((el,index) => {
        detailImg.map((item,idx)=> {
          if(index==idx) {
            el.type = item.type;
            el.content = el.type==2&&formatList(el.content);
          }
        })
        return el;
      })
      console.log(values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    // let spuImgList=fileList.map((el)=> {
    //   if(el.response.httpCode=='200') {
    //     return el.response.result;
    //   }
    // })
    // let params={
    //   spuCode,
    //   spuImgList,
    //   skuImgList:skuList,
    //   productDetailImgList:detailImg
    // }
    // GetEditImgApi(params)
    // .then((res)=> {
    //   console.log(res);
    // })
  }
  const upDateSkuList=(imageUrl,index)=> {
    skuList[index] = {...skuList[index],skuImg:imageUrl };
    skuList=[...skuList];
    setSkuList(skuList);
  }
  const upDateDetailImg=(list)=> {
    setDetailImg(list)
  }
  const upDateGoodsList=(list)=> {
    setFileList(list);
  }

  useEffect(()=>{ getInfo()},[])
  useEffect(()=>{ form.setFieldsValue(spuImgList) },[fileList])
  useEffect(()=>{ form.setFieldsValue({skuImgList:skuList}) },[skuList])
  useEffect(()=>{ form.setFieldsValue({productDetailImgList:detailImg}) },[detailImg])
  console.log(skuList)
  return <Spin tip="加载中..." spinning={false}>
    <div className="oms-common-addEdit-pages baseGeneralTrade-editImg-pages">
      <Form {...formItemLayout} form={form}>
        <Form.Item label="spu编码">
          {totalData.spuCode}
        </Form.Item>
        <Form.Item label="商品名称">
          {totalData.productName}
        </Form.Item>
        <QupLoadImgLimt
          label="商品图片"
          rules={[{ required: true, message: '请上传图片' } ]}
          name="spuImgList"
          fileList={fileList}
          limit="5"
          upDateList={upDateGoodsList}/>
        <Form.Item label="SKU图片">
          <Qtable
            dataSource={skuList}
            columns={columnsEditImg(upDateSkuList)}/>
        </Form.Item>
        <Form.Item label="商品详情" {...formItemLayoutBig}>
          <ImageTextEdit detailImg={detailImg} upDateList={upDateDetailImg}/>
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
