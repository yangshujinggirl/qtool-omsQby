import Req from '../Req'
/**
 * 
 * 获取品牌列表
 */
export function GetCountryListsApi(values){
    return Req.get('country/getListByName',{
        params:{...values}
    })
}