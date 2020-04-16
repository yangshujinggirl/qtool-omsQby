import { Tabs, Button, Form, Input, Icon, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import lodash from 'lodash';
import DragTabCard from '../DragTabCard';
import './index.less';



const Field=({...props})=> {
  let { tabs, selectkey } = props;
  let newTabs = lodash.cloneDeep(tabs);
  let [addKey,setAddKey] = useState(newTabs.length);
  //切换查详情
  const handleToggle =(e,record,index)=> {
    e.stopPropagation()
    if(e.target.tagName=='INPUT') {
      return;
    }
    if(selectkey==record.key) {
      return;
    }
    Modal.confirm({
      title: '温馨提示',
      content: '切换页面请确认保存',
      okText:'保存',
      onOk:()=>{
        props.onOk(record,index);
      },
      onCancel:()=> {
        props.onCancel(record,index);
      },
    });
  }
  //新增
  const handleAdd=()=> {
    addKey++;
    setAddKey(addKey)
    newTabs.push({ key:addKey, tabId:"-1" });
    props.upDateList(newTabs)
  }
  //删除
  const handleDelete=(e,record)=> {
    e.stopPropagation()
    newTabs = newTabs.filter(item => item.key !== record.key);
    if(selectkey==record.key&&newTabs.length>0) {
      selectkey = newTabs[0].key
      props.onCancel({tabId:tabs[0].tabId,key:selectkey})
    }
    props.upDateList(newTabs)
  }
  const handleBlur = (e,currentIndex) => {
    let value = e.target.value;
    let idx = newTabs.findIndex((el) => {
      return el.tabName == value
    })
    if (idx!='-1'&&currentIndex!=idx) {
      newTabs.map((el,index) => {
        if(index==currentIndex) {
          el.tabName = null;
        }
      })
      props.upDateList(newTabs)
      message.error('Tab名称不可重复')
    }
  }
  const moveRow = (dragIndex, hoverIndex) => {
    let tempHover = newTabs[dragIndex];
    let tempDrag = newTabs[hoverIndex];
    newTabs.splice(hoverIndex, 1, tempHover);
    newTabs.splice(dragIndex, 1, tempDrag);
    props.upDateList(newTabs)
  };
  useEffect(()=>{ props.form.current.setFieldsValue({tabsField:newTabs}) },[newTabs])
  return (
    <div className="part-same tabs-mod-wrap">
      <p className="part-head">设置商品流tab</p>
      <DndProvider backend={HTML5Backend}>
        {
          newTabs.map((el,index)=> (
            <DragTabCard
              tabs={newTabs}
              selectkey={selectkey}
              key={index}
              item={el}
              index={index}
              form={props.form}
              handleBlur={(e)=>handleBlur(e,index)}
              handleToggle={(e)=>handleToggle(e,el,index)}
              handleDelete={(e)=>handleDelete(e,el,index)}
              moveRow={moveRow}/>
          ))
        }
      </DndProvider>
      <Button
        disabled={newTabs.length>=10?true:false}
        onClick={handleAdd}
        size="large"
        type="primary">
          新增Tab({newTabs.length}/10)
      </Button>
    </div>
  );
}

export default Field;
