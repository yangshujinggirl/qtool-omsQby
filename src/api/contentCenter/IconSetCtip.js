import { appAjax, omsAjax } from '../Req';

export function GetListApi(values){
    return appAjax.get(`/module/icon/query`,{params:{...values}})
}
//保存banner
export function GetSaveApi(values){
    return appAjax.post(`/module/icon/save`,{...values})
}
//保存设置
export function GetSaveSetApi(values){
    return appAjax.post(`/module/icon/setting`,{...values})
}
//变贴
export function GetChangeApi(values){
    return appAjax.post(`/module/icon/change`,{...values})
}
