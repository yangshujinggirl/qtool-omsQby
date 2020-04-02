import {omsAjax} from '../Req'
/**
 * 
 * 获取B商品列表
 */
export function GetListsApi(values){
    return omsAjax.get('items/searchProductListByQbc',{
        params:{...values}
    })
}
/**
 * 
 * 获取B商品详情
 */
export function GetGoodDetailApi(values){
    return omsAjax.get('items/searchSkuDetail',{
        params:{...values}
    })
}
/**
 * B端商品保存
 */
export function saveGoodApi(values){
    return omsAjax.post('/items/updateSkuBC',{
        ...values
    })
}