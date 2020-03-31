import { appAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return appAjax.get('/homepage/camp/list',{params:{...values}})
}
export function GetSaveApi(values){
    return appAjax.get('/homepage/newVersion',{params:{...values}})
}
export function GetBitApi(homepageId){
    return appAjax.get(`/homepage/prohibit/${homepageId}`)
}
