import { Form, Input, Table } from "antd";
import { useState, useEffect } from "react";
import { getReturnInfoApi } from "api/home/OrderCenter/Corder/UserOrder";
import getColumns from './columns'
const ReturnGoods = props => {
 
  const [storeId, setStoreId] = useState("");
  const [expressStatus, setExpressStatus] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState("");
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      if (selectedRows && selectedRows[0]) {
        setStoreId(selectedRows[0].deliveryChannelId);
        setExpressStatus(selectedRows[0].expressStatus);
      } else {
        setStoreId("");
      }
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: record => ({
      disabled: isDisabled(record)
    })
    // hideDefaultSelections: true,
    // columnTitle: "选择"
  };
  const isDisabled = record => {
    if (record.canReturn == 0) {
      //退款中不可选
      return true;
    }
    //退款中不可勾选
    if (record.isDelivery == 1) {
      //出库单
      if (record.buyNum == record.alreadyReturnNum) {
        //购买数量=已退数量
        return true;
      }
      if (storeId) {
        //已经勾选过
        if (record.deliveryChannelId != storeId) {
          //跨出库单不可勾选
          return true;
        }
        if (record.expressStatus != expressStatus) {
          //不可跨发货信息勾选
          return true;
        }
      }
    }
    return false;
  };
  const Columns = getColumns(props)
  return (
    <div>
      {props.deliveryList.length > 0 &&
        props.deliveryList.map((item, index) => (
          <Table
            className="return_table"
            bordered={true}
            pagination={false}
            columns={Columns}
            dataSource={item.details}
            rowSelection={rowSelection}
            title={() => <span>{item.deliveryChannelName}</span>}
            key={index}
          />
        ))}
    </div>
  );
};
export default ReturnGoods;
