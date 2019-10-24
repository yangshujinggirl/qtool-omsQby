import Req from '../../Req'
/**
 * 订单列表
 * @param {*} values 
 */
export function GetListsApi(values){
    return Req.get('orders/searchBondedOrderByQbc',{
        params:values
    })
}