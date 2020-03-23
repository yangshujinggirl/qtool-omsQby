const Columns = [
    {
        title: '序号', dataIndex: 'key', key: '1',
        render: (text, record) => <span>{Number(text) + 1}</span>
    },
    {title: '门店名称', dataIndex: 'shopName', key: '2',},
    {title: '门店类型', dataIndex: 'typeStr', key: '3'},
    {title: '所在城市', dataIndex: 'addressCity', key: '4'},
    {title: '库存数', dataIndex: 'invQty', key: '5'}];
export default Columns
