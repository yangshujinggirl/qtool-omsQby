import {
  Input,Spin,Upload,
  Select,Col,
  Checkbox,Button,Radio,
  AutoComplete,Descriptions,Form
} from 'antd';
import { useState, useEffect } from 'react';
import { GetImgInfoApi, GetEditImgApi } from 'api/home/BaseGoods';
import { QreturnBtn, QupLoadImgLimt, Qmessage, QimageTextEdit, Qtable, Qbtn } from 'common';
import { CommonUtils } from 'utils';

import { ColumnsEditImgGeneral } from './columns';
import './BaseGoodsEditImg.less';

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
  let [fileList, setFileList] = useState([]);
  let [skuList, setSkuList] = useState([]);
  let [detailImg, setDetailImg] = useState([]);
  let spuCode = props.match.params.id;
  const getInfo=()=> {
    setLoading(true)
    GetImgInfoApi({spuCode})
    .then((res) => {
      let { spuImgList, productDetailImgList, skuList,...pdSpu } =res.result;
      spuImgList =spuImgList?spuImgList:[]
      productDetailImgList =productDetailImgList?productDetailImgList:[{key:0,type:2}]
      skuList =skuList?skuList:[];

      spuImgList = spuImgList.map((el,index)=> {
        el = CommonUtils.formatToFilelist(el,index);
        el = el[0]?el[0]:[]
        return el;
      })
      skuList = skuList.map((el,index)=> {
        el.skuImg = CommonUtils.formatToFilelist(el.skuImg);
        el.key = index;
        return el;
      })
      productDetailImgList = productDetailImgList.map((el,index)=> {
        if(el.type==2) {
          el.content = CommonUtils.formatToFilelist(el.content);
        }
        return el;
      })
      setLoading(false)
      setTotal(pdSpu);
      setFileList(spuImgList);
      setSkuList(skuList);
      setDetailImg(productDetailImgList);
    })
  }
  const goReturn=()=> {
    props.history.push('/account/items_list')
  }
  const onSubmit=async()=> {
    try {
      const values = await form.validateFields();
      let { spuImgList, skuImgList, textImgField } =values;
      spuImgList =spuImgList.map((el)=> {
        el = CommonUtils.formatToUrlPath(el);
        return el;
      })
      skuImgList = skuImgList.map((el,index) => {
        el.skuImg = CommonUtils.formatToUrlPath(el.skuImg);
        skuList.map((item,idx)=> {
          if(index==idx) {
            el = {skuCode:item.skuCode,...el }
          }
        })
        return el;
      })
      textImgField = textImgField&&textImgField.map((el,index) => {
        detailImg.map((item,idx)=> {
          if(index==idx) {
            el.type = item.type;
            if(el.type==2) {
              el.content = CommonUtils.formatToUrlPath(el.content);
            }
          }
        })
        return el;
      })
      let params={ spuCode, spuImgList, skuImgList, productDetailImgList:textImgField}
      GetEditImgApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
        goReturn()
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const upDateSkuList=(imageUrl,index)=> {
    skuList[index] = {...skuList[index],skuImg:imageUrl };
    skuList=[...skuList];
    setSkuList(skuList);
  }
  const upDateDetailImg=(list)=> {
    setDetailImg(list);
    // form.setFieldsValue({productDetailImgList:list})
  }
  const upDateGoodsList=(list)=> {
    setFileList(list);
  }
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    let { textImgField } = changedValues;

    if(currentKey=='textImgField') {
      detailImg = detailImg.map((el,index) => {
        textImgField.map((item,idx) => {
          if(index == idx) {
            el = {...el, ...item }
          }
        })
        return el;
      })
      setDetailImg(detailImg)
    }
  }

  useEffect(()=>{ getInfo() },[spuCode])
  useEffect(()=>{ form.setFieldsValue({spuImgList:fileList}) },[fileList])
  useEffect(()=>{ form.setFieldsValue({skuImgList:skuList}) },[skuList])


  return <Spin tip="加载中..." spinning={loading}>
    <div className="oms-common-addEdit-pages baseGeneralTrade-editImg-pages">
      <Form {...formItemLayout} form={form} onValuesChange={onValuesChange}>
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
            columns={ColumnsEditImgGeneral(upDateSkuList)}/>
        </Form.Item>
        <Form.Item label="商品详情" {...formItemLayoutBig}>
          <QimageTextEdit
            form={form}
            detailImg={detailImg}
            upDateList={upDateDetailImg}
            name="textImgField"/>
        </Form.Item>
        <div className="handle-operate-save-action">
          <QreturnBtn {...props} />
          <Qbtn onClick={onSubmit}>
            保存
          </Qbtn>
        </div>
      </Form>
    </div>
  </Spin>
}

export default EditImg;
