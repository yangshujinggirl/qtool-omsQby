import {omsAjax} from '../Req'

export function GetListsApi(values){
    return omsAjax.get('stock/searchStock',{
        params:{...values}
    })
}
