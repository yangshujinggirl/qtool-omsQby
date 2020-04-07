import { appAjax, omsAjax } from '../Req';

/*编辑详情*/
export function GetEditInfoApi(homepageId){
    return appAjax.get(`/homepage/campContent/${homepageId}`)
}
//查询商品流商品
export function GetSearchFlowPdApi(pdFlowTabId){
    return appAjax.get(`/content/pdFlowTab/campFlowProduct/${pdFlowTabId}`)
}
// export function GetSavePicApi(values){
//     return appAjax.get('/homepage/camp/list',{params:{...values}})
// }
// export function GeSearchPicApi(values){
//     return appAjax.get('/homepage/camp/list',{params:{...values}})
// }
