
import {
  Input,Spin,Form,Select,Table,Card,
  Row,Col,Checkbox,Button,DatePicker
} from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { BaseEditTable, QupLoadImgLimt, Qbtn } from 'common';
import { GetListApi, GetSaveApi } from 'api/contentCenter/NewUserSetCtip';
import ColumnsAdd from './columns';
const { RangePicker } = DatePicker;
let FormItem = Form.Item;

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

const NewUserGift=({...props})=> {
  const [form] = Form.useForm();
  let [totalData,setTotalData]=useState({newComerPicUrl:[],couponPopUpPicUrl:[]});
  let [list,setList]=useState([]);
  let [couponList,setCouponList]=useState([]);
  let homepageModuleId = props.match.params.id;
  const getInfo=()=> {
    GetListApi({homepageModuleId})
    .then((res)=> {
      let { couponList, couponSourceList,...totalData } = res.result;
      totalData.newComerPicUrl=totalData.newComerPicUrl?totalData.newComerPicUrl:[]
      totalData.couponPopUpPicUrl=totalData.couponPopUpPicUrl?totalData.couponPopUpPicUrl:[]
      couponList=couponList?couponList:[]
      couponSourceList=couponSourceList?couponSourceList:[]
      setTotalData(totalData);
      setList(couponList);
      setCouponList(couponSourceList);
    })
  }
  const submit=async()=> {
    try {
      let  values = await form.validateFields();
      let { newComerPicUrl, couponPopUpPicUrl, time, ...params } =values;
      newComerPicUrl = formatVal(newComerPicUrl);
      couponPopUpPicUrl = formatVal(couponPopUpPicUrl);
      params.beginTime = moment(time[0]).format('YYYY-MM-DD hh:mm:ss')
      params.endTime = moment(time[1]).format('YYYY-MM-DD hh:mm:ss');
      params = {...params, newComerPicUrl, couponPopUpPicUrl, homepageModuleId };
      GetSaveApi(params)
      .then((res)=> {
        Qmessage.success('保存成功');
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
  const onSelect=(value,index)=> {
    let currentItem=couponList.find((el)=>el.couponId == value);
    list[index] = {
      ...list[index],
      ...currentItem
    };
    list=[...list]
    setList(list)
  }
  const upDateList=(array)=> {
    setList(array)
  }
  const upDateListComer=(array)=> {
    totalData={...totalData,newComerPicUrl:array}
    setTotalData(totalData)
  }
  const upDateListPop=(array)=> {
    totalData={...totalData,couponPopUpPicUrl:array}
    setTotalData(totalData)
  }
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=> {getInfo()},[homepageModuleId]);

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <Card title="新人礼设置">
            <QupLoadImgLimt
              label="新人礼图片"
              rules={[{ required: true, message: '请上传图片' } ]}
              name="newComerPicUrl"
              fileList={totalData.newComerPicUrl}
              width={343}
              height={71}
              limit="1"
              upDateList={upDateListComer}>
              <span>图片宽高比为343:71，支持png格式，大小在2m以内</span>
            </QupLoadImgLimt>
            <QupLoadImgLimt
              label="优惠券弹窗背景图"
              rules={[{ required: true, message: '请上传图片' } ]}
              name="couponPopUpPicUrl"
              fileList={totalData.couponPopUpPicUrl}
              width={69}
              height={70}
              limit="1"
              upDateList={upDateListPop}>
              <span>图片宽高比为69:70，支持png格式，大小在2m以内</span>
            </QupLoadImgLimt>
            <FormItem label="模块展示时间" name="time">
              <RangePicker format="YYYY-MM-DD HH:mm"/>
            </FormItem>
            <FormItem label="选择优惠券">
              <BaseEditTable
                btnText="新增"
                dataSource={list}
                upDateList={upDateList}
                columns={ColumnsAdd(couponList, onSelect)}/>
            </FormItem>
          </Card>
          <Card title="模块设置">
            <FormItem label="设置模块背景色号" name="moduleBackColor">
              <Input type='color' style={{ width: "60px",height:"32px" }}/>
            </FormItem>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={submit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  )
}

export default NewUserGift;
