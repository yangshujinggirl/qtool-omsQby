import React, { Component } from 'react';
import { Table, Button, Form, Input, message } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import DragTableField from '../DragTableField';
import { columnsFun } from '../columns/index';
import { getSearchIdApi } from '../../../../../../services/cConfig/homeConfiguration/commodityFlow';

import './index.less';

//dispatch 更新数据源
const FormItem = Form.Item;
class GoodsTable extends Component {
  updateData(goodsList) {
    this.props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
  }
  //新增
  handleAdd=()=> {
    let { goodsList, gdAddKey } =this.props;
    goodsList.push({ key:gdAddKey, isFixed:0 });
    gdAddKey++
    this.props.dispatch({
      type:'commodityFlow/getGdAddKey',
      payload:gdAddKey
    })
    this.updateData(goodsList);
  }
  //表单事件
  onOperateClick=(record,type)=> {
    switch(type) {
      case 'delete':
        this.handleDelete(record);
        break;
      case 'toggle':
        this.handleToggleStatus(record);
        break;
    }
  }
  handleDelete=(record)=> {
    let { goodsList } =this.props;
    goodsList = goodsList.filter(item => item.key !== record.key)
    this.updateData(goodsList);
  }
  handleToggleStatus=(record)=> {
    let { goodsList } =this.props;
    goodsList.map((el,index) => {
      if(el.pdSpuId == record.pdSpuId) {
        el.fixPosition = null;
        el.fixDay = null;
        el.isFixed = 0;
      }
    })
    this.updateData(goodsList);
  }
  moveRow = (dragIndex, hoverIndex) => {
    let { goodsList } =this.props;
    let tempHover = goodsList[dragIndex];
    let tempDrag = goodsList[hoverIndex];
    goodsList.splice(hoverIndex, 1, tempHover);
    goodsList.splice(dragIndex, 1, tempDrag);
    this.updateData(goodsList);
  };
  //code
  handleBlur=(e,record)=> {
    let value;
    // value = e.target.value;
    value = lodash.trim(e.target.value)
    if(!value) {
      return;
    }
    if(value == record.FixedPdSpuId) {
      return;
    }
    let { goodsList } =this.props;
    getSearchIdApi({pdSpuId:value,type:1})
    .then((res) => {
      const { spuInfo, code }=res;
      if(code == '0') {
        let idx = goodsList.findIndex((el) => el.FixedPdSpuId == spuInfo.pdSpuId);
        if(idx != -1) {
          message.error('商品重复，请重新添加');
        } else {
          goodsList = goodsList.map((el,idx) => {
            if(el.key == record.key) {
              el.FixedPdSpuId = spuInfo.pdSpuId;
              el = {...el,...spuInfo};
            };
            return el
          });
        }
      }
      this.updateData(goodsList);
    });
  }
  handleChange=(name,e,index)=> {
    let value = e.target.value;
    // if(!value) {
    //   return;
    // }
    let { goodsList } =this.props;
    goodsList[index][name] = value;
    this.updateData(goodsList)
  }
  render() {
    const { goodsList, form, gdAddKey } =this.props;
    let columns = columnsFun(form,this.handleBlur,this.handleChange);

    return (
      <div className="commodity-flow-goods-table-component">
        <DragTableField
          columns={columns}
          handleAdd={this.handleAdd}
          goodsList={goodsList}
          onOperateClick={this.onOperateClick}
          moveRow={this.moveRow}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
export default connect(mapStateToProps)(GoodsTable);
