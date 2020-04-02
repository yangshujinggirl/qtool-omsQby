import { appAjax, omsAjax } from '../Req';

export function GetListApi(values){
    return appAjax.get(`/module/theme/query`,{params:{...values}})
}
//保存banner
export function GetSaveApi(values){
    return appAjax.post(`/module/theme/save`,{...values})
}

//保存设置
export function GetSaveSetApi(values){
    return appAjax.post(`/module/theme/setting`,{...values})
}
