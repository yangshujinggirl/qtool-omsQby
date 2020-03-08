import { appAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return appAjax.post('/product/attribute/query',{...values})
}
/*
详情
 */
export function GetDetailApi(attributeId){
    return appAjax.get(`/product/attribute/${attributeId}`)
}
/*
编辑
 */
export function GetEditApi(values){
    return appAjax.post(`/product/attribute/update`,{...values})
}
/*
树形类目
 */
export function GetTreeApi(){
    return appAjax.get(`/product/category/tree`)
}
