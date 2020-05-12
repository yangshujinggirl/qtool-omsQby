import React from "react";

const Columns = [
    {title: '门店名称', dataIndex: 'shopName', key: '1'},
    {title: '食品类数量', dataIndex: 'posQty', key: '2'},
    {title: '食品类金额', dataIndex: 'posAmount', key: '3'},
    {title: '分成金额', dataIndex: 'intoAmount', key: '4'},
    {title: '非食品数量', dataIndex: 'notPosQty', key: '5'},
    {title: '非食品金额', dataIndex: 'notPosAmount', key: '5'},
    {title: '分成金额', dataIndex: 'notIntoAmount', key: '6'},
    {
        title: '下载', dataIndex: 'notIntoAmountsss', key: '7',
        render: (text, record) => {
            return (
                <span className="link-color" onClick={record.onOperateClick}>下载</span>
            );
        }
    }];
export default Columns;
