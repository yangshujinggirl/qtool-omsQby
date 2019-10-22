import Req from '../Req'
/**
 * 
 * 获取B商品列表
 */
export function GetListsApi(values){
    return Req.get('items/searchProductListByQbc',{
        params:{...values}
    })
}
/**
 * 
 * 获取B商品详情
 */
export function GetGoodDetailApi(values){
    return Req.get('items/searchSkuDetail',{
        params:{...values}
    })
}
/**
 * B端商品保存
 */
export function saveGoodApi(values){
    return Req.post('/items/updateSkuBC',{
        ...values
    })
}