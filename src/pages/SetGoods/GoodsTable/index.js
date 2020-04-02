import React, { Component } from "react";
import { Table, Modal } from "antd";
import { useEffect, useState } from 'react';
import lodash from 'lodash';
import SetModal from "./components/SetModal";
import "./index.less";
import getColumns from "./columns/index.js";

const index=({...props})=> {
  let newSource = lodash.cloneDeep(props.dataSource);
  let currentdata = props.currentdata;
  let { promotionType } =currentdata;
  let[visible, setVisible] = useState(false);
  let[currentItem, setCurrentItem] = useState({});

  const edit = (index, record) => {
    record = {...record,index};
    setCurrentItem(record);
    setVisible(true);
  };
  //删除
  const delt = (index) => {
    Modal.confirm({
      title: '是否删除此商品?',
      content: '是否删除此商品?',
      okText:"确认删除",
      cancelText:"暂不删除",
      onOk() {
        newSource.splice(deleteIndex, 1);
        props.upDateList(newSource);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const updateList=(newSource)=> {
    props.upDateList(newSource);
  }
  //确认删除
  // onDelOk = () => {
  //   const {deleteIndex} = this.state;
  //   const goodLists = [...this.props.goodLists];
  //   goodLists.splice(deleteIndex, 1);
  //   this.props.dispatch({
  //     type: "ctipActivityAddTwo/refreshLists",
  //     payload: {goodLists}
  //   });
  //   this.setState({
  //     delVisible: false
  //   });
  // };
  const onVisible = () => {
    this.setState({
      visible: false
    });
  };

  const Columns = getColumns(edit, delt);
  let columns = [];
  switch(promotionType) {
    case 10:
     columns = Columns.columns1;
     break;
    case 11:
     columns = Columns.columns2;
     break;
    case 20:
    case 21:
    case 23:
     columns = Columns.columns3;
     break;
    case 22:
     columns = Columns.columns4;
     break;
  };
  return (
    <div className="act_setGoods">
      <div className="batch_set_box">
        共{newSource.length}条数据
      </div>
      <div className="good_table">
        <Table
          pagination={false}
          bordered
          columns={columns}
          scroll={{
            x: (promotionType == 10 || promotionType == 11) ? "140%" : ""
          }}
          dataSource={newSource}
        />
        {visible==true&&
          <SetModal
            updateList={updateList}
            proRules={props.proRules}
            dataSource={newSource}
            form={props.form}
            promotionType={promotionType}
            visible={visible}
            record={currentItem}
            onVisible={onVisible}
          />
        }
      </div>
    </div>
  );
}

export default index;
