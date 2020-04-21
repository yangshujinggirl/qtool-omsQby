import { Modal, Tag, Form, Checkbox } from 'antd';
import { useState } from 'react';
import { normalOptions, crossPlainOptions, defautOptions  } from './options';
import './index.less';


const ExportModal =({...props})=> {
  const plainOptions = props.productNature==1?normalOptions:crossPlainOptions;
  const [checkedList,setCheckedList] =useState(defautOptions);
  const [indeterminate,setIndeterminate] =useState(true);
  const [checkAll,setCheckAll] =useState(false);

  const resetPsge=()=> {
    setCheckedList(defautOptions);
    setCheckAll(false);
    setIndeterminate(true)
  }
  const handleOk=()=> {
    props.onOk(checkedList);
    resetPsge()
  }
  const handleCancel=()=> {
    props.onCancel();
    resetPsge()
  }
  const onChange = selectList => {
    let inde = !!selectList.length && selectList.length < plainOptions.length;
    let isAll = selectList.length === plainOptions.length;
    setCheckedList(selectList);
    setIndeterminate(inde)
    setCheckAll(isAll)
  };
  const onCheckAllChange = e => {
    let checkedVal = plainOptions.map((el)=>{
      return el.label
    })
    let val =e.target.checked ? checkedVal : defautOptions;
    setCheckedList(val);
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  };
  const handleClose = removedTag => {
    const tags = checkedList.filter(tag => tag !== removedTag.label);
    setCheckedList(tags)
  };
  const  getTags=()=> {
    return plainOptions.map((el)=> {
      return checkedList.map((item) => {
        if(el.label == item) {
          return <Tag
                  key={el.label}
                  closable={el.closable}
                  onClose={() => handleClose(el)}>
                  {el.value}
                </Tag>
        }
      })
    })
  }

  return (
    <Modal
      destroyOnClose
      className="export-modal-wrap"
      title="商品信息导出"
      visible={props.visible}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div>
        <div className="row-wrap">
          <p className="title">选择导出字段（建议选择需要的字段，导出字段越多，速度越慢）</p>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}>
              Check all
          </Checkbox>
          <br />
          <Checkbox.Group
            value={checkedList}
            onChange={onChange}>
            {
              plainOptions.map((el) => (
                <Checkbox value={el.label} key={el.label}>{el.value}</Checkbox>
              ))
            }
          </Checkbox.Group>
        </div>
        <div className="row-wrap">
          <p className="title">已选字段</p>
          {getTags()}
        </div>
      </div>
    </Modal>
  )
}

export default ExportModal;
