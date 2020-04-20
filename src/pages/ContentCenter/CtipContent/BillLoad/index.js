import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,
  Upload,Select,
  Row,Col,
  Checkbox,Button,
  Radio,AutoComplete,
} from 'antd';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Qtable, Qbtn, Qmessage } from 'common';
import { GetSaveApi, GetInfoApi } from 'api/home/SupplierManage';

let FormItem = Form.Item;
let Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };

const BillLoad=({...props})=> {
  const [form] = Form.useForm();
  const [list,setList]=useState([])

  const getInfo=()=> {
    // GetInfoApi()
    // .then((res)=> {
    //   // const { result } =res;
    //   // setTotal(result)
    // })
  }
  const onSubmit = async () => {
    try {
      let  values = await form.validateFields();
      let { fieldList } =values;
      fieldList = fieldList.map((el,index)=> {
        index++;
        el.type =el;
        el.type = index;
        list.map((item,idx) => {
          if(index == idx) {
            el.configureId = item.configureId
          }
        })
        return el;
      })
      console.log(fieldList)
      // GetSaveApi({configurelist:fieldList})
      // .then((res)=> {
      //   Qmessage.success('保存成功')
      // })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  useEffect(()=>{ getInfo() },[])
  useEffect(()=>{ form.setFieldsValue({fieldList:list})},[list])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages supplier-Manage-addEdit-pages">
        <Form className="common-addEdit-form" form={form} {...formItemLayout}>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">基础信息</span></p>
            <Form.Item label="国内仓提单页提示" name={['fieldList',0,'text']}>
              <Input.TextArea rows={3} placeholder="100字以内" autoComplete="off" maxLength={100}/>
            </Form.Item>
            <Form.Item label="保税仓提单页提示" name={['fieldList',1,'text']}>
              <Input.TextArea rows={3} placeholder="100字以内" autoComplete="off"  maxLength={100}/>
            </Form.Item>
            <Form.Item label="品牌直供提单页提示" name={['fieldList',2,'text']}>
              <Input.TextArea rows={3} placeholder="100字以内" autoComplete="off"  maxLength={100}/>
            </Form.Item>
          </div>
          <div className="handle-operate-save-action">
            <Qbtn onClick={onSubmit}> 保存 </Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

export default BillLoad;
