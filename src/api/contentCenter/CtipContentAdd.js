import { appAjax, omsAjax } from '../Req';
/*编辑详情*/
export function GetEditInfoApi(homepageId){
    return appAjax.get(`/homepage/campContent/${homepageId}`)
}
/**
 *
 * 搜索
 */
export function GetSavePicApi(values){
    return appAjax.get('/homepage/camp/list',{params:{...values}})
}
export function GeSearchPicApi(values){
    return appAjax.get('/homepage/camp/list',{params:{...values}})
}
