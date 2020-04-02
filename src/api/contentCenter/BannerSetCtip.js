import { appAjax, omsAjax } from '../Req';

export function GetListApi(values){
    return appAjax.get(`/module/banner/query/`,{params:{...values}})
}
//保存banner
export function GetSaveApi(values){
    return appAjax.post(`/module/banner/save`,{...values})
}
//查设置详情（通用
export function GetModalInfoApi(homepageModuleId){
    return appAjax.post(`/homePageModule/get/${homepageModuleId}`)
}
//保存设置
export function GetSaveSetApi(values){
    return appAjax.post(`/module/banner/setting`,{...values})
}
//变贴
export function GetChangeApi(values){
    return appAjax.post(`/module/banner/change`,{...values})
}
