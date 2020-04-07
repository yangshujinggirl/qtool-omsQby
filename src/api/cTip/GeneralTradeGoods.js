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
/*标签*/
export function GetLabelApi(spuCode){
    return appAjax.get(`/toC/product/tabList`)
}
/*日志*/
export function GetLogApi(spuCode){
    return appAjax.get(`/toC/product/log/${spuCode}`)
}
/*
上下架
 */
export function GetUpDownApi(values,spuCode){
    return appAjax.put(`/toC/product/${spuCode}`,{...values})
}
