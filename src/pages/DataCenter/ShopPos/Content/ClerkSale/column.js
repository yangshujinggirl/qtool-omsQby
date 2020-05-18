import { Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const amount = (
	<Tooltip placement="top" title="销售订单金额-退款订单金额">
		净销售额&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const icAmount = (
	<Tooltip placement="top" title="微信转账+微信扫码+支付宝转账+支付宝扫码+现金+银联+App支付">
		净收款&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const wechatAmount = (
	<Tooltip placement="top" title="微信转账消费+微信转账充值-微信转账退款">
		微信转账&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const wechatAmounts = (
	<Tooltip placement="top" title="微信扫码消费+微信扫码充值">
		微信扫码&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const alipayAmount = (
	<Tooltip placement="top" title="支付宝转账消费+支付宝转账充值-支付宝转账退款">
		支付宝转账&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const alipayAmounts = (
	<Tooltip placement="top" title="支付宝扫码消费+支付宝扫码充值">
		支付宝扫码&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const appPayAmounts = (
	<Tooltip placement="top" title="APP支付">
		APP支付&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const cashAmount = (
	<Tooltip placement="top" title="现金消费+现金充值-现金退款">
		现金&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const unionpayAmount = (
	<Tooltip placement="top" title="银联消费+银联充值-银联退款">
		银联&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const refundAmount = (
	<Tooltip placement="top" title="所有订单总退款">
		退款&nbsp;
		<ExclamationCircleOutlined />
	</Tooltip>
);
const Columns = [
	{
		title: '姓名',
		dataIndex: 'name',
	},
	{
		title: amount,
		dataIndex: 'saleAmount',
	},
	{
		title: icAmount,
		dataIndex: 'cleanAmount',
	},
	{
		title: '订单数',
		dataIndex: 'orderSum',
	},
	{
		title: wechatAmount,
		dataIndex: 'wechatAmount',
	},
	{
		title: wechatAmounts,
		dataIndex: 'scanWechatAmount',
	},
	{
		title: alipayAmount,
		dataIndex: 'alipayAmount',
	},
	{
		title: alipayAmounts,
		dataIndex: 'scanAlipayAmount',
	},
	{
		title: appPayAmounts,
		dataIndex: 'appPay',
	},
	{
		title: unionpayAmount,
		dataIndex: 'unionpayAmount',
	},
	{
		title: cashAmount,
		dataIndex: 'cashAmount',
	},
	{
		title: '会员消费',
		dataIndex: 'cardConsumeAmount',
	},
	{
		title: '积分抵扣',
		dataIndex: 'pointAmount',
	},
	{
		title: refundAmount,
		dataIndex: 'returnAmount',
	},
];
export default Columns
