//商品信息
const GoodColumns = [
	{
		title: '商品名称',
		dataIndex: 'spuName',
	},
	{
		title: '规格',
		dataIndex: 'displayName',
	},
	{
		title: '商品编码',
		dataIndex: 'code',
	},
	{
		title: '商品数量',
		dataIndex: 'qty',
	},
	{
		title: '商品价格',
		dataIndex: 'price',
	},
	{
		title: '应付价格',
		dataIndex: 'payPrice',
	},
	{
		title: '实付价格',
		dataIndex: 'actualAmount',
	},
	{
		title: '已退数量',
		dataIndex: 'returnQty',
	},
	{
		title: '已退金额',
		dataIndex: 'returnAmount',
	},
];
//子单信息

const SubOrderColumns = [
	{
		title: '商品名称',
		dataIndex: 'spuName',
	},
	{
		title: '规格',
		dataIndex: 'displayName',
	},
	{
		title: '商品编码',
		dataIndex: 'code',
	},
	{
		title: '商品数量',
		dataIndex: 'qty',
	},
	{
		title: '商品价格',
		dataIndex: 'price',
	},
	{
		title: '应付价格',
		dataIndex: 'payPrice',
	},
	{
		title: '实付价格',
		dataIndex: 'actualAmount',
	},
];
//物流信息
const ExpressColumns = [
	{
		title: '子单号',
		dataIndex: 'outNo',
	},
	{
		title: '保税仓库',
		dataIndex: 'warehouseName',
	},
	{
		title: '物流公司',
		dataIndex: 'expressCompany',
	},
	{
		title: '物流单号',
		dataIndex: 'expressNo',
	},
	{
		title: '获取物流时间',
		dataIndex: 'acquireExpressTime',
	},
];
//订单日志
const OrderLogsColumns = [
	{
		title: '操作',
		dataIndex: 'qerpAction',
	},
	{
		title: '操作时间',
		dataIndex: 'createTime',
	},
	{
		title: '操作人',
		dataIndex: 'user',
	},
	{
		title: '备注',
		dataIndex: 'remark',
	},
];

//杭州审核，清关日志
const HangzhouClearLogsColumns = [
	{
		title: '操作',
		dataIndex: 'qerpAction',
	},
	{
		title: '操作时间',
		dataIndex: 'createTime',
	},
	{
		title: '操作人',
		dataIndex: 'user',
	},
	{
		title: '备注',
		dataIndex: 'remark',
	},
];
export {
	GoodColumns,
	SubOrderColumns,
	ExpressColumns,
	OrderLogsColumns,
	HangzhouClearLogsColumns,
};
