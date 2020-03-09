import {
  Input,Spin,Upload,
  Select,Col,
  Checkbox,Button,Radio,
  AutoComplete,Descriptions,Form
} from 'antd';
import { DownOutlined,UpOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { GetImgInfoApi } from 'api/home/BaseGoods';
import { Qtable, Qbtn, QupLoadImgLimt } from 'common';

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
  const getInfo=()=> {
    GetImgInfoApi({spuCode})
    .then((res) => {
      let { spuImgList, productDetailImgList, skuList,...pdSpu } =res.result;
      spuImgList =spuImgList?spuImgList:[]
      productDetailImgList =productDetailImgList?productDetailImgList:[]
      skuList =skuList?skuList:[]

      setTotal(pdSpu);
      setFileList(spuImgList);
      setSkuList(skuList);
      setDetailImg(productDetailImgList);
    })
  }
  const goReturn=()=> {

  }
  const onSubmit=()=> {

  }
  const upDateList=(list)=> {
    console.log(list)
  }
  useEffect(()=>{ getInfo()},[])

  return <Spin tip="加载中..." spinning={false}>
    <div className="oms-common-addEdit-pages baseGeneralTrade-editImg-pages">
      <Form {...formItemLayout} form={form}>
        <Form.Item label="spu编码">
          {totalData.spuCode}
        </Form.Item>
        <Form.Item label="商品名称">
          {totalData.productName}
        </Form.Item>
        <Form.Item label='商品图片'>
          {totalData.brandAddress}
          <QupLoadImgLimt
            fileList={fileList}
            limit="5"
            upDateList={upDateList}/>
        </Form.Item>
        <Form.Item label="SKU图片">
          <Qtable
            dataSource={skuList}
            columns={columnsEditImg}/>
        </Form.Item>
        <Form.Item label="商品详情" {...formItemLayoutBig}>
          <div className="function-are">
            <div className="left-are">
              <p className="tit-par">功能组件</p>
              <div className="content-par">
                <p className="fuc-btn">新增图片</p>
                <p className="fuc-btn">新增文本</p>
              </div>
            </div>
            <div className="middle-are">
              <p className="tit-par">预览区</p>
              <div className="content-par">
                <div className="par-item img-item">
                  <div className="wrap-item">
                    <QupLoadImgLimt fileList={[]}/>
                    <div className="btns-action">
                      <span className="icon-wrap"><DownOutlined /></span>
                      <span className="icon-wrap"><UpOutlined /></span>
                      <span className="icon-wrap"><CloseOutlined /></span>
                    </div>
                  </div>
                </div>
                <div className="par-item text-item">
                  <div className="wrap-item">
                    <Input.TextArea />
                    <div className="btns-action">
                      <span className="icon-wrap"><DownOutlined /></span>
                      <span className="icon-wrap"><UpOutlined /></span>
                      <span className="icon-wrap"><CloseOutlined /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="right-are">
              <p className="tit-par">配置编辑区</p>
              <p className="content-par">功能组件</p>
            </div>*/}
          </div>
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
