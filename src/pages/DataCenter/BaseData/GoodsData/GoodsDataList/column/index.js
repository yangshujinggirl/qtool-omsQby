import React from "react";

const Columns = [
    {title: 'SPU ID', dataIndex: 'pdSpuId'},
    {title: '商品编码', dataIndex: 'code'},
    {title: '商品条码', dataIndex: 'barcode'},
    {title: '商品名称', dataIndex: 'name'},
    {title: '商品规格', dataIndex: 'displayName'},
    {title: '分类', dataIndex: 'pdCategory1'},
    {title: '类别', dataIndex: 'pdCategory2'},
    {title: '掌柜销售数量', dataIndex: 'qbyQty'},
    {title: '掌柜销售金额', dataIndex: 'qbyAmount'},
    {title: 'POS销售数量', dataIndex: 'posQty'},
    {title: 'POS销售金额', dataIndex: 'posAmount'}];
export default Columns;
