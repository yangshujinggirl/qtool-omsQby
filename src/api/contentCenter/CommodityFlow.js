import { appAjax, omsAjax } from '../Req';

export function GetTabListApi(values){
    return appAjax.get(`/content/pdFlowTab`,{params:{...values}})
}
export function GetProListApi(pdFlowTabId){
    return appAjax.get(`/content/pdFlowTab/qerp/${pdFlowTabId}`)
}
// //保存banner
// export function GetSaveApi(values){
//     return appAjax.post(`/module/banner/save`,{...values})
// }
// //查设置详情（通用
// export function GetModalInfoApi(homepageModuleId){
//     return appAjax.get(`/homePageModule/get/${homepageModuleId}`)
// }
// //保存设置
// export function GetSaveSetApi(values){
//     return appAjax.post(`/module/banner/setting`,{...values})
// }
// //变贴
// export function GetChangeApi(values){
//     return appAjax.post(`/module/banner/change`,{...values})
// }
