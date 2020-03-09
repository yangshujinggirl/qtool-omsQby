import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,
  Upload,Select,
  Row,Col,Cascader,
  Checkbox,Button,
  Radio,AutoComplete,Table,
} from 'antd';
import { useState, useEffect } from 'react';
import { Qtable, Qbtn, Qmessage, CascaderAddressOptions } from 'common';
// import { GetDetailApi,GetAddApi,GetEditApi} from 'api/home/SupplierManage';
import './ShopOrderAdd.less';
import { columnsAdd } from './column';

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
        xs: { span: 24},
        sm: { span: 20 },
      },
    };

const BaseEditTable=({...props})=> {
  let { dataSource, columns } =props;
  let newDataSource = [...dataSource];
  let key = newDataSource.length;
  // let [newDataSource,setDataSource] = useState(dataSource);
  // let [key,setKey] = useState(newDataSource.length);
  const handleAdd=()=> {
    // key++;
    console.log(key)
    // newDataSource.push({ key });
    // props.upDateList(newDataSource)
    // setKey(key)
  }
  //删除
  const handleDelete=(index)=> {
    newDataSource.splice(index,1);
    // setDataSource(newDataSource)
    // props.upDateList(newDataSource)
  }
  //初始化删除columns
  const initColumns=()=> {
    // let columns = columns;
    let index = columns.findIndex((value,index) => {
      return value.key == 'delete';
    })
    if(newDataSource.length>1) {
      if(index == -1) {
        columns.push({
          title:'操作',
          key:'delete',
          width:'10%',
          align:'center',
          render:(text,record,index)=> {
            return <span
                    className="brandColor handle-delete"
                    onClick={()=>handleDelete(index)}>
                      删除
                   </span>
          }
        })
      }
    } else if(index !== -1){
      columns.splice(index,1);
    }
    return columns;
  }
  console.log(newDataSource)
  return <Table
          className="edit-table-component"
          footer={()=><Qbtn type="default" onClick={()=>handleAdd()}>+{props.btnText}</Qbtn>}
          bordered
          pagination={false}
          columns={initColumns()}
          dataSource={newDataSource}/>
}

const ShopOrderAdd=({...props})=> {
  const [form] = Form.useForm();
  const goReturn=()=> {
    props.history.push('/account/supplierManage')
  }
  const [totalData, setTotal] = useState({});
  const [goodsList, setGoodsList] = useState([]);
  const onBlur=(e)=> {
    console.log(e)
  }
  const onSubmit = async () => {
    try {
      let  values = await form.validateFields();
      // reqApi(values)
      // .then((res)=> {
      //   Qmessage.success('保存成功')
      //   goReturn();
      // })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  const upDateList=(arrVal)=> {
    setGoodsList(arrVal)
  }
  useEffect(()=>{
    form.setFieldsValue(totalData);
  },[totalData])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages shopOrder-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}
          initialValues={{...totalData}}>
          <div className="part-wrap">
            <p className="title-wrap"><span className="title-name">基础信息</span></p>
            <Form.Item label="门店名称" name="name" rules={[{ required: true, message: '请输入门店名称'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="下单原因" name="accountsType" rules={[{ required: true, message: '请选择' }]}>
              <Select placeholder="请选择" allowClear={true}>
                <Option value={1} key={1}>合作中</Option>
                <Option value={2} key={2}>待合作</Option>
                <Option value={3} key={3}>停止合作</Option>
              </Select>
            </Form.Item>
            <Form.Item label="收货人" name="shortName" rules={[{ required: true, message: '请输入收货人'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="收货电话" name="phone" rules={[{ required: true, message: '请输入收货电话'}]}>
              <Input placeholder="请输入商品名称，60字以内" autoComplete="off"/>
            </Form.Item>
            <Form.Item label="收货地址" {...formItemLayoutBig}>
              <Form.Item noStyle name="adress" rules={[{ required: true, message: '请输入收货电话'}]}>
                <Cascader
                  options={CascaderAddressOptions}
                  placeholder="请选择省市区" />
              </Form.Item>
              <Form.Item noStyle name="detailAdre" rules={[{ required: true, message: '请输入详细地址'}]}>
                <Input placeholder="请输入详细地址" autoComplete="off"/>
              </Form.Item>
            </Form.Item>
            <Form.Item label="商品信息" {...formItemLayoutBig}>
              <BaseEditTable
                btnText="添加商品"
                upDateList={upDateList}
                dataSource={goodsList}
                columns={columnsAdd(onBlur)}/>
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
