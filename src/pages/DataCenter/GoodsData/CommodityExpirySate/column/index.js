import React from "react";

const Columns = [
    {title: "SPU ID", dataIndex: "pdSpuId", key: '1'},
    {title: "商品编码", dataIndex: "pdCode", key: '2'},
    {title: "商品条码", dataIndex: "pdBarcode", key: '3'},
    {title: "商品名称", dataIndex: "pdSpuName", key: '4'},
    {title: "商品规格", dataIndex: "pdSkuType", key: '5'},
    {title: "所属仓库", dataIndex: "wsWarehouseName", key: '6'},
    {title: "库位", dataIndex: "wsBin", key: '7'},
    {title: "商品数量", dataIndex: "wsBinLotQty", key: '8'},
    {title: "到期时间", dataIndex: "expireDateStr", key: '9'},
    {title: "到期天数", dataIndex: "expireDays", key: '10'}
];
export default Columns;
