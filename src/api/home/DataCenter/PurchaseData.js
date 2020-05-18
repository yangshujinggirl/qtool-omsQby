import {dataAjax} from '../../Req'
/**
 * 获取采购头部数据
 * @constructor
 */
export function GetPurchaseHeaderData(values) {
    return dataAjax.get('/purchase/queryPurchaseHeadData')
}
//获取采购列表数据
export function GetPurchaseTableData(values) {
    return dataAjax.get('/purchase/queryPurchaseList',{
        params:values
    })
}

