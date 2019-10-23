import Req from '../Req'

export function GetListsApi(values){
    return Req.get('stock/searchStock',{
        params:{...values}
    })
}
