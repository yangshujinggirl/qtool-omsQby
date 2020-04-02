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
import { GetDetailApi,GetAddApi,GetEditApi} from 'api/home/SupplierManage';
import './SupplierManageAdd.less';

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

const SupplierManageAdd=({...props})=> {
  const [form] = Form.useForm();
  const supplierId = props.match.params.id;
  const goReturn=()=> {
    props.history.push('/account/supplierManage')
  }
  const [totalData, setTotal] = useState({cooperationStatus:1});
  const onSubmit = async () => {
    try {
      let  values = await form.validateFields();
      let reqApi=GetAddApi;
      if(supplierId) {
        reqApi = GetEditApi;
        values = {...values,id:supplierId};
      }
      reqApi(values)
      .then((res)=> {
        Qmessage.success('保存成功')
        goReturn();
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  useEffect(()=>{
    GetDetailApi({supplierId})
    .then((res)=> {
      const { result } =res;
      setTotal(result)
    })
  },[])
  useEffect(()=>{
    form.setFieldsValue(totalData);
  },[totalData])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages supplier-Manage-addEdit-pages">
        <Form className="common-addEdit-form" form={form} {...formItemLayout} initialValues={{...totalData}}>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">基础信息</span></p>
            <Form.Item
              label="供应商名称"
              name="name"
              rules={[{ required: true, message: '请输入商品名称'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item
              label="供应商简称"
              name="shortName"
              rules={[{ required: true, message: '请输入供应商简称'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item
              label="联系人"
              name="edName">
              <Input placeholder="请输入联系人" autoComplete="off"/>
            </Form.Item>
            <Form.Item
              label="联系电话"
              name="tel">
              <Input placeholder="请输入联系电话" autoComplete="off"/>
            </Form.Item>
            <Form.Item
              label="开户银行"
              name="bank"
              rules={[{ required: true, message: '请输入开户银行'}]}>
              <Input placeholder="请输入开户银行" autoComplete="off"/>
            </Form.Item>
            <Form.Item
              label="银行卡号"
              name="bankCard"
              rules={[{ required: true, message: '请输入银行卡号'}]}>
              <Input placeholder="请输入银行卡号" autoComplete="off" />
            </Form.Item>
            <Form.Item
              label="开户名"
              name="bankUserName"
              rules={[{ required: true, message: '请输入供应商简称'}]}>
              <Input placeholder="请输入开户名" autoComplete="off" />
            </Form.Item>
            <Form.Item label="账期类型">
              <Form.Item name="accountsType" rules={[{ required: true, message: '请选择' }]}>
                <Radio.Group placeholder="请选择" allowClear={true}>
                  <Radio value={1} key={1}>现结</Radio>
                  <Radio value={2} key={2}>货到</Radio>
                  <Radio value={3} key={3}>票到</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.accountsType !== currentValues.accountsType}>
                {({ getFieldValue }) => {
                  return getFieldValue('accountsType') !== 1&&
                  <Form.Item>
                    <Form.Item name="accountsDay" noStyle rules={[{ required: true, message: '请输入' }]}>
                      <Input autoComplete="off" className="short-input"/>
                    </Form.Item>
                    <span>个自然日</span>
                  </Form.Item>
                }}
              </Form.Item>
            </Form.Item>
            <Form.Item label="合作状态" name="cooperationStatus" rules={[{ required: true, message: '请选择'}]}>
              <Select placeholder="请选择" allowClear={true}>
                <Option value={1} key={1}>合作中</Option>
                <Option value={2} key={2}>待合作</Option>
                <Option value={3} key={3}>停止合作</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="供应商备注"
              name="remark">
              <Input.TextArea placeholder="请输入供应商备注" rows={4} autoComplete="off"/>
            </Form.Item>
          </div>
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
  );
}

export default SupplierManageAdd;
