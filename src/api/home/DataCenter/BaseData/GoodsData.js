import {dataAjax} from '../../../Req'
/**
 *
 * 获取商品分析数据
 */
export function GetGoodsAnalysis(values) {
    return dataAjax.get('/goods/queryGoodsAnalysisHead', {
        params:values
    })
}

/**
 * 获取商品分析曲线图表数据
 * @constructor
 */
export function GetGoodsAnalysisChartData(values) {
    return dataAjax.get('/goods/shopSellTendencyChart',{
        params:values
    })
}

/**
 * 获取分类分析图表数据
 * @constructor
 */
export function GetClassifyAnalysis(values) {
    return dataAjax.get('/goods/shopSellTendencyChart',{
        params:values
    })
}

/**
 * 获取商品数据列表
 * @constructor
 */
export function GetGoodsDataList(values) {
    return dataAjax.get('/goods/goodsData',{
        params:values
    })
}
//pos热销商品和掌柜热销商品列表
export function getHotSaleList(values){
    return dataAjax.get('/goods/hotSellGoods',{
        params:values
    })
}
//建议采购和掌柜滞销商品列表
export function getColdSaleList(values){
    return dataAjax.get('/goods/queryProposalAndUnsaleGoodsList',{
        params:values
    })
}

