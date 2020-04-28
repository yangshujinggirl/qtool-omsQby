import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Table,Upload,Card, DatePicker
} from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { QupLoadAndDownLoad, Qtable, Qbtn, BaseEditTable, Qmessage, CascaderAddressOptions } from 'common';
import { GetInfoApi, GetSpuCodeApi, GetSaveApi } from 'api/marketCenter/BossActivity';
import { ColumnsAdd } from './columns';

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


const ActivityAdd=({...props})=> {
  const [form] = Form.useForm();
  const activityId = props.match.params.id;
  let [totalData, setDataInfo] = useState({});
  let [goodsList, setGoodsList] = useState([{key:0}]);
  const initPage=()=> {
    if(activityId) {
      GetInfoApi(activityId)
      .then((res)=> {
        let { activityInfo, goodsInfos } =res.result;
        activityInfo.time=[moment(activityInfo.beginTime),moment(activityInfo.endTime)];
        goodsInfos = goodsInfos?goodsInfos:[];
        goodsInfos.map((el,index)=>el.key=index);
        setDataInfo(activityInfo)
        setGoodsList(goodsInfos)
      })
    }
  }
  const handleBlur=(event,index)=> {
    let value = event.target.value;
    onBlurCode(value,index)
  }
  //查询商品
  const onBlurCode=(value,index)=> {
    if(!value) {
      return;
    }
    GetSpuCodeApi(value)
    .then((res)=> {
      let { result } =res;
      goodsList[index] = {...goodsList[index],...result, key:result.pdSkuId };
      goodsList=[...goodsList]
      setGoodsList(goodsList)
    })
  }
  const upDateList=(arrVal)=> { setGoodsList(arrVal) };
  //上传更新
  const upDateFileList=(response)=> {
    let { pdSpuAsnLists } = response.result;
    pdSpuAsnLists=pdSpuAsnLists?pdSpuAsnLists:[]
    pdSpuAsnLists.map((el,index)=>el.key=index)
    setGoodsList(pdSpuAsnLists)
  }
  const goReturn=()=> {
    props.history.push('/account/b_limited_promotion')
  }
  const onSubmit = async () => {
    try {
      let  values = await form.validateFields();
      let { time,productList,...params } =values;
      if(time) {
        params.beginTime = moment(time[0]).format('YYYY-MM-DD hh:mm:ss');
        params.endTime = moment(time[1]).format('YYYY-MM-DD hh:mm:ss');
      }
      params = { ...params, type:2, productList:goodsList }
      if(activityId) { params= {...params, params }};
      GetSaveApi(params)
      .then((res)=> {
        Qmessage.success('保存成功')
        goReturn();
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  //表单change事件
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    if(currentKey == 'productList') {
      let newArray = [...allValues['productList']];
      setGoodsList(newArray);
    }
  }
  useEffect(()=>{ initPage()},[activityId]);
  useEffect(()=>{ form.setFieldsValue(totalData) },[totalData])
  useEffect(()=>{ form.setFieldsValue({productList:goodsList })},[goodsList])
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages shopOrder-addEdit-pages">
        <Form onValuesChange={onValuesChange} className="common-addEdit-form" form={form} {...formItemLayout}>
          <Card title="基础信息">
            <Form.Item label="活动名称" name="name" rules={[{ required: true, message: '请输入活动名称'}]}>
              <Input placeholder="请输入活动名称" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="活动时间" name="time" rules={[{ required: true, message: '请输入活动时间'}]}>
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"/>
            </Form.Item>
            <QupLoadAndDownLoad
              label="商品信息"
              fileName="activityBoss"
              data={{type: 11}}
              action="/qtoolsErp/import/excel"
              upDateList={upDateFileList}>
              <BaseEditTable
                btnText="添加商品"
                upDateList={upDateList}
                dataSource={goodsList}
                columns={ColumnsAdd(handleBlur)}/>
            </QupLoadAndDownLoad>
            <Form.Item label="活动备注" name="remark">
              <Input.TextArea placeholder='请输入备注，50字以内' maxLength='50' rows={4} autoComplete="off"/>
            </Form.Item>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}>
              返回
            </Qbtn>
            <Qbtn onClick={()=>onSubmit()}>
              保存
            </Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

export default ActivityAdd;
