const Columns = [
	{
		title: '序号',
		render: (text, record, index) => <span>{index + 1}</span>,
	},
	{
		title: '商品条码',
		dataIndex: 'barcode',
	},
	{
		title: '商品名称',
		dataIndex: 'pdSpuName',
	},
	{
		title: '商品分类',
		dataIndex: 'pdCategory1',
	},
	{
		title: '规格',
		dataIndex: 'displayName',
	},
	{
		title: '期初库存数量',
		dataIndex: 'qty',
	},
	{
		title: '期初库存成本',
		dataIndex: 'invAmount',
	},
	{
		title: '收货数量',
		dataIndex: 'recQty',
	},
	{
		title: '收货成本',
		dataIndex: 'recAmount',
	},
	{
		title: '销售数量',
		dataIndex: 'posQty',
	},
	{
		title: '销售成本',
		dataIndex: 'sumCostAmount',
	},
	{
		title: '退货数量',
		dataIndex: 'returnQty',
	},
	{
		title: '退货成本',
		dataIndex: 'returnSumAmount',
	},
	{
		title: '损益数量',
		dataIndex: 'adjustQty',
	},
	{
		title: '损益成本',
		dataIndex: 'adjustCostAmount',
	},
	{
		title: '调出数量',
		dataIndex: 'pdExchangeQty',
	},
	{
		title: '调出成本',
		dataIndex: 'pdExchangeAmount',
	},
	{
		title: '期末库存数量',
		dataIndex: 'finalQty',
	},
	{
		title: '期末库存成本',
		dataIndex: 'finalInvAmount',
	},
];
export default Columns;
