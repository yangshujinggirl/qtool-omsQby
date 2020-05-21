import { Modal } from 'antd';
import {Qtable} from 'common'
import CommonUtils  from 'utils/CommonUtils'
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
	const dataList = CommonUtils.addKey(dataSource);
	const onCancel = () => {
		props.onCancel();
	};
	return (
		<div className="other_cost_modal">
			<Modal title="其他成本明细" visible={visible} footer={null} onCancel={onCancel}>
				<div>
					<Qtable columns={Columns} dataSource={dataList} />
					<ul className="intro">
						<li><strong>字段说明：</strong></li>
						<li>退货总成本：所有商品退货成本总和</li>
						<li>损益总成本：所有商品损益成本总和</li>
						<li>调出总成本：所有商品调出成本总和</li>
						<li><strong>总计：退货总成本+损益总成本-调出总成本</strong></li>
					</ul>
				</div>
			</Modal>
		</div>
	);
};
export default OtherCostModal;
