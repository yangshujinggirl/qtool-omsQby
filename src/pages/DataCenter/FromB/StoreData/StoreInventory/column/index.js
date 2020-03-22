import React from "react";
import {Link} from "react-router-dom";

const Columns = [
    {
        title: '序号', dataIndex: 'key', key: '1',
        render: (text, record) => <span>{Number(text) + 1}</span>
    },
    {title: '商品编码', dataIndex: 'code', key: '2'},
    {title: '商品条码', dataIndex: 'barcode', key: '3'},
    {title: '商品名称', dataIndex: 'pdSpuName', key: '4'},
    {title: '商品分类', dataIndex: 'pdCategoryName', key: '5'},
    {title: '规格', dataIndex: 'displayName', key: '6'},
    {title: '数量', dataIndex: 'qty', key: '7'},
    {title: '预定未发货数量', dataIndex: 'waitDeliveryQty', key: '8'},
    {title: '发货未收货数量', dataIndex: 'receivingQty', key: '9'},
    {title: '预定未收货数量', dataIndex: 'waitReceiveQty', key: '10'},
    {title: '调出待收货数量', dataIndex: 'allocateOutWaitingQty', key: '11'},
    {title: '调入待收货数量', dataIndex: 'allocateInWaitingQty', key: '12'},
    {title: '价格', dataIndex: 'toBPrice', key: '13'},
    {
        title: '库存分布', dataIndex: 'name', key: '14',
        render: (text, record) => {
            return <Link className="link-color"
                         to={`/account/channel_data/StoreInventory/Distribution/${record.pdSpuId}_${record.pdSkuId}`}>
                查看
            </Link>
        }
    },
];
export default Columns;
