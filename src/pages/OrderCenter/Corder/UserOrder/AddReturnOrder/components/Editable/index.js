import { Table } from "antd";
import { useState, useEffect } from "react";
import {connect} from 'react-redux'
import getColumns from "./columns";
import "./index.less";

const ReturnGoods = props => {
  const {parentId,expressStatus,selectedRowKeys} = props
  // const [parentId, setParentId] = useState(""); //出库单的唯一标识
  // const [expressStatus, setExpressStatus] = useState("");
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // useEffect(()=>{
  //   setParentId('')
  //   setExpressStatus('')
  //   setSelectedRowKeys([])
  //   console.log(111)
  // },[props.deliveryList])

  useEffect(() => {
    const arr = [...props.deliveryList];
    arr.map(item => {
      item.details.map(subItem => {
        subItem.disabled = isDisabled(subItem);
      });
    });
    props.changeDataSource(arr);
  }, [parentId]);
  //rowSelection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // setSelectedRowKeys(selectedRowKeys);
      props.dispatch({
        type:'addReturn/setSelectRowKeys',
        payload:selectedRowKeys
      });
      if (selectedRows && selectedRows[0]) {
        // setParentId(selectedRows[0].parentId);
        // setExpressStatus(selectedRows[0].expressStatus);
        props.dispatch({
          type:'addReturn/setParentId',
          payload:selectedRows[0].parentId
        });
        props.dispatch({
          type:'addReturn/setExpressStatus',
          payload:selectedRows[0].expressStatus
        });
      } else {
        // setParentId("");
        props.dispatch({
          type:'addReturn/setParentId',
          payload:''
        });
      };
      props.dispatch({
        type:'addReturn/setSelectRows',
        payload:selectedRows
      });
    },
    getCheckboxProps: record => ({
      disabled: isDisabled(record)
    }),
    hideDefaultSelections: true,
    columnTitle: "选择"
  };
  //不可勾选的情况
  const isDisabled = record => {
    if (record.canReturn == 0 || record.buyNum == record.alreadyReturnNum) {//退款中,//购买数量=已退数量,不可选
      return true;
    }
    if (record.orderType == 1 && record.isDelivery == 1) {//一般订单并且是已出库的订单
      if (String(parentId)) {//已经勾选过
        if ( record.parentId != parentId ||record.expressStatus != expressStatus) {//跨出库单不可勾选   +   //不可跨发货信息勾选
          return true;
        }
      }
    }
    if (record.orderType == 2) {//保税的
      if (record.needPush == 1) {//需要推送的
        if (record.expressStatus == 0) {//未发货的不可勾选
          return true;
        }
      }
      if (record.needPush == 0) {//无需推送的
        if (String(parentId)) {
          if (record.expressStatus != expressStatus) {//不可跨发货信息勾选
            return true;
          }
        }
      }
    }
    return false;
  };
  const Columns = getColumns(props)
  const list = [...props.deliveryList]
  return (
    <div>
      {list.length > 0 &&
        list.map((item, index) => (
          <Table
            rowClassName={(record, index) =>
              record.disabled ? "return_disabled_row" : ""
            }
            className="return_table"
            bordered={true}
            pagination={false}
            columns={Columns}
            dataSource={[...item.details]}
            rowSelection={rowSelection}
            title={() => <span>{item.deliveryChannelName}</span>}
            key={index}
          />
        ))}
    </div>
  );
};
const mapStateToProps=(state)=>{
  const {AddReturnOrderReducers} = state;
  return AddReturnOrderReducers
}
export default connect(mapStateToProps)(ReturnGoods);
