const Columns = [
	{
		title: '订单号',
		dataIndex: 'orderNo',
	},
	{
		title: '业务类型',
		dataIndex: 'orderType',
		render: (text, record, index) => <span>{text == 4 ? '仓库直邮订单' : '保税订单'}</span>,
	},
	{
		title: '订单分类',
		dataIndex: 'shareType',
		render: (text, record, index) => <span>{text == 1 ? '销售订单' : '退货订单'}</span>,
	},
	{
		title: '分成金额',
		dataIndex: 'shareProfitAmount',
	},
	{
		title: '订单完成时间',
		dataIndex: 'createTime',
	},
];
export default Columns;
