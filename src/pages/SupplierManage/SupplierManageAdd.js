import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,
  Upload,Select,
  Row,Col,
  Checkbox,Button,
  Radio,AutoComplete,
} from 'antd';
import { connect } from 'react-redux';
import { Qtable, Qbtn, QupLoadImgLimt } from 'common';
import { columnsAdd } from './column';
import { GetEditInfoApi, GetAddApi } from '../../api/home/BaseGoods';

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
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };

const SupplierManageAdd=({...props})=> {
  const [form] = Form.useForm();
  const goReturn=()=> {
    props.history.push('/account/items_list')
  }
  const goReset=()=> {

  }
  const submit=()=> {

  }
  const onFinish = values => {
     console.log(values);
   };
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">基础信息</span></p>
            <Form.Item
              label="供应商名称"
              name="name"
              rules={[{ required: true, message: '请输入商品名称'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <Form.Item
              label="供应商简称"
              name="shortName"
              rules={[{ required: true, message: '请输入供应商简称'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <Form.Item
              label="联系人"
              name="edName"
              rules={[{ required: true, message: '请输入联系人'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <Form.Item
              label="联系电话"
              name="tel"
              rules={[{ required: true, message: '请输入联系电话'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <Form.Item
              label="开户银行"
              name="bank"
              rules={[{ required: true, message: '请输入开户银行'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <Form.Item
              label="银行卡号"
              name="bankCard"
              rules={[{ required: true, message: '请输入银行卡号'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <Form.Item
              label="开户名"
              name="bankUserName"
              rules={[{ required: true, message: '请输入供应商简称'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
            <Form.Item label="账期类型" name="accountsType" rules={[{ required: true, message: '请选择' }]}>
              <Select placeholder="请选择" allowClear={true}>
                <Option value={1} key={1}>现结</Option>
                <Option value={2} key={2}>货到</Option>
                <Option value={3} key={3}>票到</Option>
              </Select>
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
              <Input placeholder="请输入供应商备注，60字以内" autoComplete="off" maxLength={60}/>
            </Form.Item>
          </div>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}>
              返回
            </Qbtn>
            <Qbtn onClick={onFinish}>
              保存
            </Qbtn>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

export default SupplierManageAdd;
