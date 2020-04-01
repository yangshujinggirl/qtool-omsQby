import { appAjax, omsAjax } from '../Req';

export function GetListApi(values){
    return appAjax.get(`/module/banner/query/`,{params:{...values}})
}
//保存banner
export function GetSaveApi(values){
    return appAjax.post(`/module/banner/save`,{...values})
}
//banner详情
export function GetEditInfoApi(values){
    return appAjax.post(`/module/banner/{frameDetailId}`,{...values})
}
//保存设置
export function GetSaveSetApi(values){
    return appAjax.post(`/module/banner/setting`,{...values})
}
//变贴
export function GetChangeApi(values){
    return appAjax.post(`/module/banner/change`,{...values})
}
