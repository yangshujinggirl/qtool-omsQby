import { appAjax, omsAjax } from '../Req';

/*编辑详情*/
export function GetEditInfoApi(homepageId){
    return appAjax.get(`/homepage/campContent/${homepageId}`)
}
//查询商品流商品
export function GetSearchFlowPdApi(pdFlowTabId){
    return appAjax.get(`/content/pdFlowTab/campFlowProduct/${pdFlowTabId}`)
}
export function GetChangeStatusApi(values){
    return appAjax.post('/homePageModule/update',{...values})
}
//发布
export function GetPushApi(values){
    return appAjax.post('/homepage/releaseVersion',{...values})
}
