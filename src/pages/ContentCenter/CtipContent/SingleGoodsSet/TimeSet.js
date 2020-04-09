import { Form, Spin, Radio, DatePicker } from 'antd';
import { useState, useEffect } from 'react';

import TimeTable from './components/TimeTable';
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

const TimeSet=({...props})=> {
  const [form] = Form.useForm();
  let [list,setList]=useState([]);
  //操作区
  const onOperateClick=(record,type)=> {
    switch(type) {
      case 'edit':
        goEdit(record)
        break;
      case 'save':
        goSave(record)
        break;
      case 'goodSet':
        goGoodSet(record)
        break;
      case 'delete':
        goDelete(record)
        break;
    }
  }
  const goEdit=(record)=> {

  }
  const goSave=(record)=> {

  }
  const goGoodSet=(record)=> {

  }
  const goDelete=(record)=> {

  }
  const upDateList=(array)=> {
    setList(array);
  }
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}>
          <Form.Item label="属性商品选择" name="type" rules={[{ required: true, message: "请选择商品属性" }]}>
            <Radio.Group>
              <Radio value={1}>活动商品</Radio>
              <Radio value={2}>上新商品</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="时间列表">
            <TimeTable
              onOperateClick={onOperateClick}
              dataSource={list}
              upDateList={upDateList}/>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  )
}

export default TimeSet;
