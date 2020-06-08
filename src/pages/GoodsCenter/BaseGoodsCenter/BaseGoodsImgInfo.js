import {
  Input,Spin,Upload,
  Select,Col,
  Checkbox,Button,Radio,
  AutoComplete,Descriptions,Form
} from 'antd';
import { useState, useEffect } from 'react';
import { GetImgInfoApi, GetEditImgApi } from 'api/home/BaseGoods';
import { QenlargeImg, QreturnBtn, QupLoadImgLimt, Qmessage, QimageTextEdit, Qtable, Qbtn } from 'common';

import { ColumnsEditImgGeneral } from './columns';
import './BaseGoodsImgInfo.less';

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
      productDetailImgList =productDetailImgList?productDetailImgList:[]
      skuList =skuList?skuList:[];
      productDetailImgList.map((el,index)=>el.key = index);
      skuList.map((el,index)=>el.key = index);
      setLoading(false)
      setTotal(pdSpu);
      setFileList(spuImgList);
      setSkuList(skuList);
      setDetailImg(productDetailImgList);
    })
  }

  useEffect(()=>{ getInfo() },[spuCode])


  return <Spin tip="加载中..." spinning={loading}>
    <div className="oms-common-addEdit-pages baseGeneralTrade-imgInfo-pages">
      <Form {...formItemLayout}>
        <Form.Item label="spu编码">
          {totalData.spuCode}
        </Form.Item>
        <Form.Item label="商品名称">
          {totalData.productName}
        </Form.Item>
        <Form.Item label="商品图片">
          {
            fileList.map((el,index) => (
              <QenlargeImg  url={el} key={index} placement="inline"/>
            ))
          }
        </Form.Item>
        <Form.Item label="SKU图片">
          <Qtable
            dataSource={skuList}
            columns={ColumnsEditImgGeneral(null,'info')}/>
        </Form.Item>
        <Form.Item label="商品详情" {...formItemLayoutBig}>
          <div className="detail-list-wrap">
            {
              detailImg.map((el,index) => (
                <div className="info-wrap" key={index}>
                  {
                    el.type == 1?el.content
                    :
                      <QenlargeImg  url={el.content} className="autoWidth"/>
                  }
                </div>
              ))
            }
          </div>
        </Form.Item>
        <div className="handle-operate-save-action">
          <QreturnBtn {...props} />
        </div>
      </Form>
    </div>
  </Spin>
}

export default EditImg;
