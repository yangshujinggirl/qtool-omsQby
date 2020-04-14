import { appAjax, omsAjax } from '../Req';

export function GetListApi(values){
    return appAjax.get(`/newUserGift/query`,{params:{...values}})
}
//保存
export function GetSaveApi(values){
    return appAjax.post(`/newUserGift/save`,{...values})
}
