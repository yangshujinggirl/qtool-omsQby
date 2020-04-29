import { erpAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return erpAjax.get('/spActivity',{params:{...values}})
}
export function GetInfoApi(activityId){
    return erpAjax.get(`/spActivity/${activityId}`)
}
export function GetLoseApi(values){
    return erpAjax.put(`/spActivity/status`,{...values})
}
export function GetSaveApi(values){
    return erpAjax.put(`/spActivity`,{...values})
}
export function GetSpuCodeApi(skuCode){
    return erpAjax.get(`/product/sku/${skuCode}`)
}
