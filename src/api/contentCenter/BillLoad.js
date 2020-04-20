import { appAjax, omsAjax } from '../Req';
//保存b
export function GetSaveApi(values){
    return appAjax.post(`/pdConfigure`,{...values})
}
//查设置详情（通用
export function GetInfoApi(pdConfigureId){
    return appAjax.get(`/pdConfigure/${pdConfigureId}`)
}
