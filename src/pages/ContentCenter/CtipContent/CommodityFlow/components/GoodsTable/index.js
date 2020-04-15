import { useState, useEffect } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import lodash from 'lodash';
import DragableBodyRow from '../DragTableField';
import { columnsFun } from '../../columns/index';
import { GetSearchSpuidApi } from 'api/contentCenter/CommodityFlow';

import './index.less';

const FormItem = Form.Item;
const GoodsTable=({...props})=>{
  let { goodsList } = props;
  let newList = lodash.cloneDeep(goodsList);
  let [addKey,setAddKey] = useState(newList.length);

  //绑定方法
  const processData=(data)=> {
    data && data.map((item, i) => {
        item.onOperateClick = (type) => { onOperateClick(item, type) };
    })
    return data;
  }
  //新增
  const handleAdd=()=> {
    addKey++;
    newList.push({ key:addKey, isFixed:0 });
    setAddKey(addKey)
    props.upDateList(newList);
  }
  //删除
  const handleDelete=(record)=> {
    newList = newList.filter(item => item.key !== record.key)
    props.upDateList(newList);
  }
  //表单事件
  const onOperateClick=(record,type)=> {
    switch(type) {
      case 'delete':
        handleDelete(record);
        break;
      case 'toggle':
        handleToggleStatus(record);
        break;
    }
  }
  //切换状态
  const handleToggleStatus=(record)=> {
    newList.map((el,index) => {
      if(el.pdSpuId == record.pdSpuId) {
        el.fixPosition = null;
        el.fixDay = null;
        el.isFixed = 0;
      }
    })
    props.upDateList(newList);
  }
  const moveRow = (dragIndex, hoverIndex) => {
    let tempHover = newList[dragIndex];
    let tempDrag = newList[hoverIndex];
    newList.splice(hoverIndex, 1, tempHover);
    newList.splice(dragIndex, 1, tempDrag);
    props.upDateList(newList);
  };
  //code查询商品
  const handleBlur=(e,record)=> {
    let value;
    value = lodash.trim(e.target.value)
    if(!value) {
      return;
    }
    if(value == record.FixedPdSpuId) {
      return;
    }
    GetSearchSpuidApi(value)
    .then((res) => {
      const { result }=res;
      let idx = newList.findIndex((el) => el.FixedPdSpuId == result.pdSpuId);
      if(idx != -1) {
        message.error('商品重复，请重新添加');
        return;
      } else {
        newList = newList.map((el,idx) => {
          if(el.key == record.key) {
            el.FixedPdSpuId = result.pdSpuId;
            el = {...el,...result};
          };
          return el
        });
      }
      props.upDateList(newList);
    });
  }
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };
  const columns = columnsFun(handleBlur);
  newList  = processData(newList);
  useEffect(()=>{ props.form.current.setFieldsValue({spuList:newList}) },[newList])
  return (
    <div className="commodity-flow-goods-table-component">
      <DndProvider backend={HTML5Backend}>
        <Table
          bordered
          pagination={false}
          columns={columns}
          dataSource={newList}
          rowClassName={(record,index)=>(
            !!record.isPresell||!record.shelfStatus||record.pdInvQty=='0'?'haveBackColor':null
          )}
          components={components}
          footer={()=><Button type="default" disabled={newList.length>=100?true:false} onClick={handleAdd}>+新增</Button>}
          onRow={(record, index) => ({
            'data-row-key':record.key,
            'data-row-index':index,
            moveRow: moveRow,
          })}/>
      </DndProvider>
    </div>
  );
}

export default GoodsTable;
