import CommonUtils from 'utils/CommonUtils';
const formatData = (analysis) => {
	analysis.orderQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.orderQtySum, analysis.upOrderQtySum); //销售订单数
	analysis.mbCardQtySumRate = CommonUtils.dataDifferenceValueComparison(
		analysis.mbCardQtySum,
		analysis.upMbCardQtySum
	); //会员订单数
	analysis.chargeQtySumRate = CommonUtils.dataDifferenceValueComparison(
		analysis.chargeQtySum,
		analysis.upChargeQtySum
	); //充值订单数
	analysis.returnQtySumRate = CommonUtils.dataDifferenceValueComparison(
		analysis.returnQtySum,
		analysis.upReturnQtySum
	); //退款订单数

	analysis.amountRate = CommonUtils.dataDifferenceValueComparison(analysis.amount, analysis.upAmount); //毛利润额
	analysis.saleAmountRate = CommonUtils.dataDifferenceValueComparison(analysis.saleAmount, analysis.upSaleAmount); //销售额
	analysis.mbCardAmountRate = CommonUtils.dataDifferenceValueComparison(
		analysis.mbCardAmount,
		analysis.upMbCardAmount
	); //会员销售额
	analysis.chargeAmountRate = CommonUtils.dataDifferenceValueComparison(
		analysis.chargeAmount,
		analysis.upChargeAmount
	); //充值金额
	analysis.returnAmountRate = CommonUtils.dataDifferenceValueComparison(
		analysis.returnAmount,
		analysis.upReturnAmount
	); //退款金额
	const datalist1 = [
		{
			title: '销售订单数',
			value: analysis.orderQtySum,
			rate: Math.abs(analysis.orderQtySumRate),
			text: '同比上周',
			type: analysis.orderQtySumRate < 0 ? '0' : '1',
		},
		{
			title: '会员订单数',
			value: analysis.mbCardQtySum,
			rate: Math.abs(analysis.mbCardQtySumRate),
			text: '同比上周',
			type: analysis.mbCardQtySumRate < 0 ? '0' : '1',
		},
		{
			title: '充值订单数',
			value: analysis.chargeQtySum,
			rate: Math.abs(analysis.chargeQtySumRate),
			text: '同比上周',
			type: analysis.chargeQtySumRate < 0 ? '0' : '1',
		},
		{
			title: '退款订单数',
			value: analysis.returnQtySum,
			rate: Math.abs(analysis.returnQtySumRate),
			text: '同比上周',
			type: analysis.returnQtySumRate < 0 ? '0' : '1',
		},
	];
	const datalist2 = [
		{
			title: '毛销售额',
			value: analysis.amount,
			rate: Math.abs(analysis.amountRate),
			text: '同比上周',
			type: analysis.amountRate < 0 ? '0' : '1',
		},
		{
			title: '销售额',
			value: analysis.saleAmount,
			rate: Math.abs(analysis.saleAmountRate),
			text: '同比上周',
			type: analysis.saleAmountRate < 0 ? '0' : '1',
		},
		{
			title: '会员销售额',
			value: analysis.mbCardAmount,
			rate: Math.abs(analysis.mbCardAmountRate),
			text: '同比上周',
			type: analysis.mbCardAmountRate < 0 ? '0' : '1',
		},
		{
			title: '充值金额',
			value: analysis.chargeAmount,
			rate: Math.abs(analysis.chargeAmountRate),
			text: '同比上周',
			type: analysis.chargeAmountRate < 0 ? '0' : '1',
		},
		{
			title: '退款金额',
			value: analysis.returnAmount,
			rate: Math.abs(analysis.returnAmountRate),
			text: '同比上周',
			type: analysis.returnAmountRate < 0 ? '0' : '1',
		},
	];
	return { datalist1, datalist2 };
};
export default formatData;
