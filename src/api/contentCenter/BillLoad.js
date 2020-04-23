import { appAjax, omsAjax } from '../Req';
//保存b
export function GetSaveApi(values){
    return appAjax.post(`/toCconfiguration`,{...values})
}
//查设置详情（通用
export function GetInfoApi(){
    return appAjax.get(`/toCconfiguration`)
}
