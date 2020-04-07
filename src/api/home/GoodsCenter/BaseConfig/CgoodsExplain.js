import {appAjax} from '../../../Req'
/**
 * 
 * 获商品说明列表
 */
export function GetListsApi(values){
    return appAjax.get('product/pdExplain/query',{
        params:{...values}
    })
}
/**
 * 
 * 获商品说明详情
 */
export function GetInfoApi(values){
    return appAjax.get(`product/pdExplain/${values.id}`)
}
/**
 * 商品说明保存
 */
export function saveExplainApi(values){
    return appAjax.post('product/pdExplain/update',{
        ...values
    })
}
