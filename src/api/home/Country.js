import {omsAjax} from '../Req'
/**
 *
 * 获取品牌列表
 */
export function GetCountryListsApi(values){
    return omsAjax.get('country/getListByName',{
        params:{...values}
    })
}
