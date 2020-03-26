import React, { useState } from 'react';
import { Tree, Button, Modal, Form, Input, Radio } from 'antd';
const { TreeNode } = Tree;

const CollectionCreateForm = ({ treeData, visible, onCreate, onCancel,defaultSelectedKeys }) => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  let [selectedKeys, setSelectedKeys] = useState([]);
  
  const onCheck = (checkedKeys, info) => {
    let checkedNodes = info.checkedNodes.filter((value)=> !value.children);
    setSelectedKeys(checkedNodes)
  };
  const onOk=()=> {
    onCreate(selectedKeys);
  }
  return (
    <Modal
      destroyOnClose
      visible={visible}
      title="选择后台类目"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={onOk}>
      {
        treeData.length>0&&
        <Tree
          checkable
          defaultExpandedKeys={defaultSelectedKeys}
          defaultCheckedKeys={defaultSelectedKeys}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
        />
      }
    </Modal>
  );
};

export default CollectionCreateForm;
