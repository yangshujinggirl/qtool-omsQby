import React, { Component } from "react";
import '@ant-design/compatible/assets/index.css';
import { Modal, Form, Checkbox, Input } from "antd";
import { useState, useEffect } from 'react';

const ResetModal=({...props})=> {
  let { visible, options } =props;
  let [selectVal,setSelectVal] = useState([]);
  const onChange=(checkedValues)=> {
    setSelectVal(checkedValues);
  }
  const onOk=()=> {
    props.onOk(selectVal)
  }
  const onCancel=()=> {
    props.onCancel()
  }
  return (
      <Modal
        title="恢复被删除的SKU"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="确定"
        cancelText="取消">
        <Form.Item label="请选择规格">
          <Checkbox.Group  onChange={onChange}>
            {
              options.map((el) => (
                <Checkbox key={el.key} value={el.name}>{el.name}</Checkbox>
              ))
            }
          </Checkbox.Group>
        </Form.Item>
      </Modal>
  );
}

export default ResetModal;
