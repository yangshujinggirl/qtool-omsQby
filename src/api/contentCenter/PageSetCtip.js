import { appAjax, omsAjax } from '../Req';

export function GetListApi(values){
    return appAjax.get(`/pdConfigure`,{params:{...values}})
}
//保存b
export function GetSaveApi(values){
    return appAjax.post(`/pdConfigure`,{...values})
}
//查设置详情（通用
export function GetInfoApi(pdConfigureId){
    return appAjax.get(`/pdConfigure/${pdConfigureId}`)
}

export function GetSearchApi(values){
    return appAjax.post(`/pdConfigure/code`,{...values})
}
