import React from "react";

const Columns = [
    {title: '门店名称', dataIndex: 'shopName', key: '1'},
    {title: '食品类数量', dataIndex: 'foodQty', key: '2'},
    {title: '食品类金额', dataIndex: 'foodAmount', key: '3'},
    {title: '分成金额', dataIndex: 'divideIntoAmount', key: '4'},
    {title: '非食品数量', dataIndex: 'nonFoodQty', key: '5'},
    {title: '非食品金额', dataIndex: 'nonFoodAmount', key: '5'},
    {title: '非分成金额', dataIndex: 'nonDivideIntoAmount', key: '6'},
    {
        title: '下载', dataIndex: 'notIntoAmountsss', key: '7',
        render: (text, record) => {
            return (
                <a className="theme-color" onClick={record.onOperateClick}>下载</a>
            );
        }
    }];
export default Columns;
