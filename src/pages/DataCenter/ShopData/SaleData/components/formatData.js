import CommonUtils from 'utils/CommonUtils';
const formatData = (shopSaleData) => {
	shopSaleData.posAmountBi = CommonUtils.dataDifferenceValueComparison(
		shopSaleData.grossSaleAmount,
		shopSaleData.upGrossSaleAmount
	); //毛销售额
	shopSaleData.possaleAmountBi = CommonUtils.dataDifferenceValueComparison(
		shopSaleData.saleAmount,
		shopSaleData.upSaleAmount
	); //销售额
	shopSaleData.poscleanAmountBi = CommonUtils.dataDifferenceValueComparison(
		shopSaleData.cleanAmount,
		shopSaleData.upCleanAmount
	); //净收款
	shopSaleData.yesterdaysellRateBi = CommonUtils.dataDifferenceValueComparison(
		shopSaleData.yesterdayGrossMargin,
		shopSaleData.upYesterdayGrossMargin
	); //昨日毛利率

	const data = [
		{
			title: '毛销售额',
			value: shopSaleData.posAmount,
			rate: Math.abs(shopSaleData.posAmountBi),
			text: '同比上周',
			type: shopSaleData.posAmountBi < 0 ? '0' : '1',
		},
		{
			title: '销售额',
			value: shopSaleData.saleAmount,
			rate: Math.abs(shopSaleData.possaleAmountBi),
			text: '同比上周',
			type: shopSaleData.possaleAmountBi < 0 ? '0' : '1',
		},
		{
			title: '净收款',
			value: shopSaleData.cleanAmount,
			rate: Math.abs(shopSaleData.poscleanAmountBi),
			text: '同比上周',
			type: shopSaleData.poscleanAmountBi < 0 ? '0' : '1',
		},
		{
			title: '昨日毛利率',
			value: shopSaleData.yesterdaysellRates,
			rate: Math.abs(shopSaleData.yesterdaysellRateBi),
			text: '同比上周',
			type: shopSaleData.yesterdaysellRateBi < 0 ? '0' : '1',
		},
	];
	const listData = [
		{
			title: '门店排行榜',
			value: shopSaleData.shopRank,
			type: '1',
			bg: '#949494',
		},
		{
			title: '学习门店',
			value: shopSaleData.studyShop,
			type: '2',
			bg: '#ABDB7D',
		},
		{
			title: '指导门店',
			value: shopSaleData.guidanceShop,
			type: '3',
			bg: '#71A6F1',
		},
		{
			title: '注意门店',
			value: shopSaleData.carefulShop,
			type: '4',
			bg: '#BC2739',
		},
	];
	return { data, listData };
};
export default formatData;
