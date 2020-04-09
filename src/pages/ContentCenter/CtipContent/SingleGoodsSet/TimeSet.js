import { Form, Modal, Spin, Radio, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Qmessage } from 'common';
import TimeTable from './components/TimeTable';
import { GetDeleteTimeApi, GetTimeInfoApi, GetSaveTimeApi } from 'api/contentCenter/SingleGoodsSet';

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
  const homepageModuleId = props.match.params.id;
  let [list,setList]=useState([]);
  let [totalData,setTotalData]=useState({type:1});

  const getInfo=(type)=> {
    type=type?type:1;
    setTotalData({...totalData,type});
    GetTimeInfoApi(homepageModuleId,{type})
    .then((res)=> {
      let { timeSlots } =res.result;
      timeSlots =timeSlots?timeSlots:[];
      timeSlots.map((el,index)=>{
        el.key=index;
        el.isEdit=true;
        el.time=[moment(el.beginTime),moment(el.endTime)];
      });
      setList(timeSlots)
    })
  }
  const onChangeType=(e)=> {
    let value = e.target.value;
    getInfo(value)
  }
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
    let key = list.findIndex((el)=>el.pdListDisplayCfgId==record.pdListDisplayCfgId);
    list[key]={...list[key],isEdit:false};
    setList([...list])
  }
  const goSave=(record)=> {
    let params={
      homepageModuleId,
      type:totalData.type,
      beginTime:moment(record.time[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:moment(record.time[1]).format('YYYY-MM-DD HH:mm:ss'),
    }
    GetSaveTimeApi(params)
    .then((res)=> {
      Qmessage.success('保存成功');
      getInfo()
    })
  }
  const goGoodSet=(record)=> {
    let params = {
      pdListDisplayCfgId:record.pdListDisplayCfgId,
      activeKey:"3",
      type
    }
    props.upDateKey(params)
  }
  const goDelete=(record)=> {
    if(record.pdListDisplayCfgId) {
      Modal.confirm({
        content: '确认删除该时间段么?',
        onOk() {
          GetDeleteTimeApi(record.pdListDisplayCfgId,{homepageModuleId})
          .then((res)=> {
            Qmessage.success('删除成功');
            getInfo()
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      list = list.filter((el)=>el.key != record.key );
      setList([...list])
    }
  }
  const upDateList=(array)=> {
    setList(array);
  }
  const onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    let { fields } =allValues;
    if(currentKey == 'fields') {
      list = list.map((el,index)=> {
        fields.map((item,idx)=> {
          if(index == idx) {
            el ={...el,...item}
          }
        })
        return el;
      })
      list=[...list]
      setList(list);
      return;
    }
  }

  useEffect(()=>{ getInfo() },[])
  useEffect(()=>{form.setFieldsValue({fields:list})},[list])
  useEffect(()=>{form.setFieldsValue(totalData)},[totalData])

  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
        <Form
          className="common-addEdit-form"
          form={form}
          {...formItemLayout}
          onValuesChange={onValuesChange}>
          <Form.Item label="属性商品选择" name="type" rules={[{ required: true, message: "请选择商品属性" }]}>
            <Radio.Group onChange={onChangeType}>
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
