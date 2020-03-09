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
// import './ShopOrderAdd.less';
import { columnsAdd } from './column';

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

const ShopOrderAdd=({...props})=> {
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
            <Form.Item label="门店单号" name="name" rules={[{ required: true, message: '请输入门店单号'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="退货原因" name="shortName" rules={[{ required: true, message: '请输入退货原因'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="退单类型" name="accountsType" rules={[{ required: true, message: '请选择' }]}>
              <Radio.Group placeholder="请选择" allowClear={true}>
                <Radio value={1} key={1}>现结</Radio>
                <Radio value={2} key={2}>货到</Radio>
                <Radio value={3} key={3}>票到</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="退单类型">
              <Qtable
                dataSource={[]}
                columns={columnsAdd}/>
            </Form.Item>
            <Form.Item label="收货仓库" name="cooperationStatus" rules={[{ required: true, message: '请选择'}]}>
              <Select placeholder="请选择" allowClear={true}>
                <Option value={1} key={1}>合作中</Option>
                <Option value={2} key={2}>待合作</Option>
                <Option value={3} key={3}>停止合作</Option>
              </Select>
            </Form.Item>
            <Form.Item label="发货快递" name="cooperationStatus" rules={[{ required: true, message: '请选择'}]}>
              <Select placeholder="请选择" allowClear={true}>
                <Option value={1} key={1}>合作中</Option>
                <Option value={2} key={2}>待合作</Option>
                <Option value={3} key={3}>停止合作</Option>
              </Select>
            </Form.Item>
            <Form.Item label="快递单号" name="edName" rules={[{ required: true, message: '请输入快递单号'}]}>
              <Input placeholder="请输入联系人" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="快递费用" name="edName" rules={[{ required: true, message: '请输入快递费用'}]}>
              <Input placeholder="请输入联系人" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="订单备注" name="remark">
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

export default ShopOrderAdd;
