import moment from 'moment';
const renderDefault = (record, text, variableName) => {
	return (
		<div>
			{record.skuStatus == 1 || record.skuStatus == 3 ? (//待审核和审核不通过 显示一行值（）
        <span style={{ color: 'red' }}>{
          text == record[variableName]?text:record[variableName]
        }</span>
			) : record[variableName] && record[variableName] == text ? (//审核通过 如果修改前后价格一致显示一行
				text && <span>{text}</span>
			) : (//审核通过 如果修改前后不一致显示两行
				<div>
					<span style={{ color: 'red' }}>{text}</span>
					<br />
					{record[variableName] && <span>({record[variableName]})</span>}
				</div>
			)}
		</div>
	);
};
const Columns = [
	{
		title: 'sku编码',
		dataIndex: 'skuCode',
		key: '1',
		width: 150,
	},
	{
		title: '商品名称',
		dataIndex: 'productName',
		key: '2',
		width: 150,
	},
	{
		title: '规格',
		dataIndex: 'salesAttributeName',
		key: '3',
		width: 150,
	},
	{
		title: '商品类型',
		dataIndex: 'productType',
		key: '4',
		width: 150,
		render: (text, record, index) => <div>{text == 1 ? '普通商品' : '赠品'}</div>,
	},
	{
		title: '审核状态',
		dataIndex: 'status',
		key: '5',
		width: 150,
		render: (text, record, index) => (
			<div>
				{(() => {
					switch (text) {
						case 1:
							return '待审核';
							break;
						case 2:
							return '审核通过';
							break;
						case 3:
							return '审核不通过';
							break;
						default:
							return null;
					}
				})()}
			</div>
		),
	},
	{
		title: '采购价',
		dataIndex: 'purchasePrice',
		key: '6',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exPurchasePrice'),
	},
	{
		title: 'B端售价',
		dataIndex: 'businessPrice',
		key: '7',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exBusinessPrice'),
	},
	{
		title: '公司毛利率',
		dataIndex: 'businessProfit',
		key: '8',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exBusinessProfit'),
	},
	{
		title: 'C端售价',
		dataIndex: 'customerPrice',
		key: '9',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exCustomerPrice'),
	},
	{
		title: '门店毛利率',
		dataIndex: 'customerProfit',
		key: '10',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exCustomerProfit'),
	},
	{
		title: '建议零售价',
		dataIndex: 'proposalPrice',
		key: '11',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exProposalPrice'),
	},
	{
		title: '直邮服务费',
		dataIndex: 'bonusRate',
		key: '12',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exBonusRate'),
	},
	{
		title: '税率',
		dataIndex: 'taxRate',
		key: '13',
		width: 100,
		render: (text, record, index) => renderDefault(record, text, 'exTaxRate'),
	},
	{
		title: '修改说明',
		dataIndex: 'remarks',
		key: '14',
		width: 100,
	},
	{
		title: '提报时间',
		dataIndex: 'createTime',
		key: '15',
		width: 150,
		render: (text, record, index) => (
			<div>
				<span>{record.createBy}</span>
				<br />
				<span>{text && moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
			</div>
		),
	},
	{
		title: '审核时间',
		dataIndex: 'lastUpdateTime',
		key: '16',
		width: 150,
		render: (text, record, index) => (
			<div>
				<span>{record.modifyBy}</span>
				<br />
				<span>{text && moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
			</div>
		),
	},
];
export default Columns;
