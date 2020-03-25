import React, { Component } from "react";
import { Table, Modal } from "antd";
import { useEffect, useState } from 'react';
import lodash from 'lodash';
import SetModal from "./components/SetModal";
import "./index.less";
import columnsMaps from "./columns";

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
  const onVisible = () => {
    this.setState({
      visible: false
    });
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
          columns={columnsMaps(edit, delt)}
          scroll={{
            x: (promotionType == 10 || promotionType == 11) ? "140%" : ""
          }}
          dataSource={newSource}
        />
        {visible==true&&
          <SetModal
            updateList={updateList}
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
