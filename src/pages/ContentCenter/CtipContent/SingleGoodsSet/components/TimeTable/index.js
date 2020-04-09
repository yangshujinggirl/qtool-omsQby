import { Table, Button, Form, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { Qbtn } from 'common';
import { disabledDate, disabledDateTimeRange, } from '../dateSet';

const { RangePicker } = DatePicker;
//绑定方法
const processData=(props,data)=> {
  if(!props.onOperateClick) {
    return data;
  }
  data && data.map((item, i) => {
      item.onOperateClick = (type) => { props.onOperateClick(item, type) };
  })
  return data;
}
const BaseEditTable=({...props})=> {
  let { dataSource } =props;
  let newDataSource = lodash.cloneDeep(dataSource);
  newDataSource= processData(props,newDataSource);
  let [key,setKey] = useState(newDataSource.length);
  const handleAdd=()=> {
    key++;
    setKey(key)
    newDataSource.push({ key, isEdit:false });
    props.upDateList(newDataSource)
  }
  const renderHandle=(text,record,index)=> {
    return <div>
            { record.isEdit?
              <Button onClick={()=>record.onOperateClick('edit')}>编辑时间</Button>
              :
              <Button disabled={!record.time} onClick={()=>record.onOperateClick('save')}>确认</Button>
            }
            &nbsp;&nbsp;
            <Button disabled={!record.time} onClick={()=>record.onOperateClick('goodSet')}>配置商品</Button>
            &nbsp;&nbsp;
            <Button onClick={()=>record.onOperateClick('delete')}>删除</Button>
          </div>
  }
  const renderTime=(text,record,index)=> {
    return <div>
          {
            record.isEdit?
            <span></span>
            :
            <Form.Item name="time" rules={[{required:true,message:'请选择时间'}]}>
              <RangePicker
                format={"YYYY-MM-DD HH:mm:ss"}
                disabledDate={disabledDate}
                disabledTime={disabledDateTimeRange}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: moment('00:00', 'HH:mm'),
                }}/>
            </Form.Item>
          }
          </div>
  }

  return <Table
          className="edit-table-component"
          footer={()=><Qbtn type="default" onClick={()=>handleAdd()}>+{props.btnText?props.btnText:'新增'}</Qbtn>}
          bordered
          pagination={false}
          dataSource={newDataSource}>
          <Table.Column title="序号" dataIndex="key"/>
          <Table.Column title="展示时间段" dataIndex="key" render={renderTime}/>
          <Table.Column title="操作" dataIndex="key" render={renderHandle}/>
        </Table>

}

export default BaseEditTable;
