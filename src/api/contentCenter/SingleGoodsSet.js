import { appAjax, omsAjax } from '../Req';

export function GetSaveTimeApi(values){
    return appAjax.post(`/pdListDisplay/timeSlot/modify`,{...values})
}

export function GetTimeInfoApi(homepageModuleId,values){
    return appAjax.get(`/pdListDisplay/timeSlot/${homepageModuleId}/query`,{params:{...values}})
}
export function GetDeleteTimeApi(pdListDisplayCfgId,values){
    return appAjax.delete(`/pdListDisplay/timeSlot/${pdListDisplayCfgId}/remove`,{params:{...values}})
}
//活动列表
export function GetActivityListApi(pdDisplayCfgId){
    return appAjax.get(`/pdListDisplay/timeSlot/activity/${pdDisplayCfgId}/query`)
}
//商品信息
export function GetActivityInfoApi(pdListDisplayCfgId){
    return appAjax.get(`/pdListDisplay/newActivitySpu/${pdListDisplayCfgId}/query`)
}
//商品信息保存
export function GetSaveGoodsApi(values){
    return appAjax.post(`/pdListDisplay/newActivitySpu/save`,{...values})
}
//商品信查询
export function GetSearCodeApi(values){
    return appAjax.get(`/pdListDisplay/singleline/query`,{params:{...values}})
}


//设置查询
export function GetModalInfoApi(homepageModuleId){
    return appAjax.get(`/homePageModule/get/${homepageModuleId}`)
}
//设置保存
export function GetSaveSetApi(values){
    return appAjax.post(`/homePageModule/update`,{...values})
}
