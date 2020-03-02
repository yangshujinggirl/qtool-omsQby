import {erpAjax} from '../../../Req'
/**
 * 
 * 获取B商品列表
 */
export function GetListsApi(values){
    return erpAjax.get('spu/spus',{
        params:{...values}
    })
}
/**
 * 
 * 获取B商品详情
 */
export function GetGoodDetailApi(values){
    return erpAjax.get('spu',{
        params:{...values}
    })
}
/**
 * B端商品保存
 */
export function saveGoodApi(values){
    return erpAjax.post('spu/update',{
        ...values
    })
}