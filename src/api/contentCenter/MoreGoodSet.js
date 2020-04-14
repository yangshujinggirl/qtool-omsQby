import { appAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetSaveApi(values){
    return appAjax.post('/pdListDisplay/multilineSpu/save',{...values})
}
export function GetInfoApi(homePageModuleId){
    return appAjax.get(`/pdListDisplay/multilineSpu/${homePageModuleId}/query`)
}
export function GetSearchPdspuApi(pdSpuId){
    return appAjax.get(`/pdListDisplay/multilineSpu/${pdSpuId}/queryById`,{params:{type:1}})
}
//保存设置
export function GetSaveSetApi(values){
    return appAjax.post(`/homePageModule/update`,{...values})
}
