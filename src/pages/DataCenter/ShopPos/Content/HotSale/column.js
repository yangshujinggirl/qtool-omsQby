const Columns = [
	{
		title: '排名',
		dataIndex: 'index',
		render: (text, record, index) => {
			return <span>{index + 1}</span>;
		},
	},
	{
		title: '商品条码',
		dataIndex: 'barcode',
	},
	{
		title: '商品名称',
		dataIndex: 'name',
	},
	{
		title: '一级分类',
		dataIndex: 'pdCategory1Name',
	},
	{
		title: '二级分类',
		dataIndex: 'pdCategory2Name',
	},
	{
		title: '规格',
		dataIndex: 'displayName',
	},
	{
		title: '门店在售',
		dataIndex: 'onSale',
		render: (text, record, index) => <span>{text == 1 ? '是' : '否'}</span>,
	},
	{
		title: '销售数量',
		dataIndex: 'qty',
	},
	{
		title: '销售金额',
		dataIndex: 'amount',
	},
	{
		title: '商品剩余库存',
		dataIndex: 'invQty',
	},
];
export default Columns;
