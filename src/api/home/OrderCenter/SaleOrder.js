import Req from '../../Req'

export function GetListsApi(values){
    return Req.get('orders/searchByQbc',{
        params:values
    })
}