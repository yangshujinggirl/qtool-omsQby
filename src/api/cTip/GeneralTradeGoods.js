import { appAjax } from '../Req';
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return appAjax.get('/toC/product',{params:{...values}})
}
/*
编辑
 */
export function GetEditApi(values){
    return appAjax.post('/toC/product',{...values})
}
/**
 *
 * 获取列表
 */
export function GetDetailApi(spuCode){
    return appAjax.get(`/toC/product/${spuCode}`)
}
