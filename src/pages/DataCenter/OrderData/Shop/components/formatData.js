import CommonUtils from 'utils/CommonUtils';
const formatData=(analysis)=>{
    analysis.qtySumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.orderQty,
        analysis.upOrderQty
    ); //总订单数
    analysis.validQtySumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.validOrderQty,
        analysis.upValidOrderQty
    ); //有效订单数
    analysis.preSellQtySumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.preSellQty,
        analysis.upPreSellQty
    ); //预售订单数
    analysis.deQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.deQty, analysis.upDeQty); //直邮订单数
    analysis.cancelQtySumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.cancelQty,
        analysis.upCancelQty
    ); //取消订单数

    analysis.amountSumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.saleAmount,
        analysis.upSaleAmount
    ); //销售额
    analysis.validAmountSumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.validSaleAmount,
        analysis.upValidSaleAmount
    ); //有效销售额
    analysis.preSellAmountSumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.preSellAmount,
        analysis.upPreSellAmount
    ); //预售销售额
    analysis.deAmountSumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.deAmount,
        analysis.upDeAmount
    ); //直邮销售额
    analysis.cancelAmountSumRate = CommonUtils.dataDifferenceValueComparison(
        analysis.cancelAmount,
        analysis.upCancelAmount
    ); //取消销售额
    const datalist1 = [
        {
            title: '总订单数',
            value: analysis.orderQty,
            rate: Math.abs(analysis.qtySumRate),
            text: '同比上周',
            type: analysis.qtySumRate < 0 ? '0' : '1',
        },
        {
            title: '有效订单数',
            value: analysis.validOrderQty,
            rate: Math.abs(analysis.validQtySumRate),
            text: '同比上周',
            type: analysis.validQtySumRate < 0 ? '0' : '1',
        },
        {
            title: '预售订单数',
            value: analysis.preSellQty,
            rate: Math.abs(analysis.preSellQtySumRate),
            text: '同比上周',
            type: analysis.preSellQtySumRate < 0 ? '0' : '1',
        },
        {
            title: '直邮订单数',
            value: analysis.deQty,
            rate: Math.abs(analysis.deQtySumRate),
            text: '同比上周',
            type: analysis.deQtySumRate < 0 ? '0' : '1',
        },
        {
            title: '取消订单数',
            value: analysis.cancelQty,
            rate: Math.abs(analysis.cancelQtySumRate),
            text: '同比上周',
            type: analysis.cancelQtySumRate < 0 ? '0' : '1',
        },
    ];
    const datalist2 = [
        {
            title: '销售额',
            value: analysis.saleAmount,
            rate: Math.abs(analysis.amountSumRate),
            text: '同比上周',
            type: analysis.amountSumRate < 0 ? '0' : '1',
        },
        {
            title: '有效销售额',
            value: analysis.saleAmount,
            rate: Math.abs(analysis.validAmountSumRate),
            text: '同比上周',
            type: analysis.validAmountSumRate < 0 ? '0' : '1',
        },
        {
            title: '预售销售额',
            value: analysis.preSellAmount,
            rate: Math.abs(analysis.preSellAmountSumRate),
            text: '同比上周',
            type: analysis.preSellAmountSumRate < 0 ? '0' : '1',
        },
        {
            title: '直邮销售额',
            value: analysis.deAmount,
            rate: Math.abs(analysis.deAmountSumRate),
            text: '同比上周',
            type: analysis.deAmountSumRate < 0 ? '0' : '1',
        },
        {
            title: '取消销售额',
            value: analysis.cancelAmount,
            rate: Math.abs(analysis.cancelAmountSumRate),
            text: '同比上周',
            type: analysis.cancelAmountSumRate < 0 ? '0' : '1',
        },
    ];
    return {analysis,datalist1,datalist2}
}
export default formatData;