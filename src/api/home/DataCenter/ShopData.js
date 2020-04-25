import { dataAjax } from "../../Req"

/**
 * 获取门店销售头部基础数据
 * @constructor
 */
export function GetStoreSaleBaseData(values) {
    return dataAjax.get('shop/querySaleDataHead',{
        params:values
    })
}

/**
 * 获取门店销售图表数据
 * @constructor
 */
export function GetSpChartsData(values) {
    return dataAjax.get('/shop/saleDataTendencyChart',{
        params:values
    })
}

/**
 * 获取门店销售表格数据
 * @constructor
 */
export function GetSpTableData(values) {
    return dataAjax.get('/shop/querySaleData',{
        params:values
    })
}

/**
 * 获取门店库存列表数据
 * @constructor
 */
export function GetStoreInventoryList(values) {
   
}

/**
 * 获取门店库存分布列表数据
 * @constructor
 */
export function GetStoreInventoryDistributionList(values) {
  
}

/**
 * 获取历史库存列表数据
 * @constructor
 */
export function GetHistoryOfInventoryList(values) {
    
}

/**
 * 获取联营分成数据
 * @constructor
 */
export function GetDivideCostList(values) {
   return dataAjax.get('shop/queryConsortiumDivideInto',{
       params:values
   })
}
/**
 * 获取门店排行
 * @constructor
 */
export function GetSpRankingList(values) {
    return dataAjax.get('/shop/queryShopRank',{
        params:values
    })
 }
 /**
 * 获取门店学习与指导列表
 * @constructor
 */
export function GetSpLearningList(values) {
    return dataAjax.get('/shop/queryStudyAndGuideShop',{
        params:values
    })
 }
  /**
 * 获取注意门店列表
 * @constructor
 */
export function GetSpNoticeList(values) {
    return dataAjax.get('/shop/queryBecarfulShop',{
        params:values
    })
 }
