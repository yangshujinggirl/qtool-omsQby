import { appAjax, omsAjax } from '../Req';

//查询tab
export function GetTabListApi(values){
    return appAjax.get(`/content/pdFlowTab`,{params:{...values}})
}
//查询信息
export function GetProListApi(pdFlowTabId){
    return appAjax.get(`/content/pdFlowTab/pdFlowTabSpu?pdFlowTabId=${pdFlowTabId}`)
}
//分类添加
export function GetAddClassProApi(values){
    return appAjax.get(`/content/pdFlowTab/spuCategoryAdd`,{params:{...values}})
}
//code查询商品信息
export function GetSearchSpuidApi(pdSpuId){
    return appAjax.get(`/pdListDisplay/multilineSpu/${pdSpuId}/queryById`,{params:{type:1}})
}
// //保存
export function GetSaveApi(values){
    return appAjax.post(`/content/pdFlowTab`,{...values})
}
