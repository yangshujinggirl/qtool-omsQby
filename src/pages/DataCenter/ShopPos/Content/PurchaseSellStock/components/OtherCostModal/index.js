import { Modal, Qtable } from 'antd';
const Columns = [
	{
		title: '退货总成本',
		dataIndex: 'returnSum',
	},
	{
		title: '损益总成本',
		dataIndex: 'adjustSum',
	},
	{
		title: '调出总成本',
		dataIndex: 'pdExchangeSum',
	},
	{
		title: '总计',
		dataIndex: 'otherSum',
	},
];
const OtherCostModal = (props) => {
	const { dataSource, visible } = props;
	const onCancel = () => {
		props.onCancel();
	};
	return (
		<div className="other_cost_modal">
			<Modal title="其他成本明细" visible={visible} footer={null} onCancel={onCancel}>
				<div>
					<Qtable Columns={Columns} dataSource={dataSource} />
					<ul className="intro">
						<li>字段说明：</li>
						<li>退货总成本：所有商品退货成本总和</li>
						<li>损益总成本：所有商品损益成本总和</li>
						<li>调出总成本：所有商品调出成本总和</li>
						<li>总计：退货总成本+损益总成本-调出总成本</li>
					</ul>
				</div>
			</Modal>
		</div>
	);
};
export default OtherCostModal;
