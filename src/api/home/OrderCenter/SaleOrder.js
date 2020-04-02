import Req from '../../Req'
/**
 * 销售订单列表
 * @param {*} values 
 */
export function GetListsApi(values){
    return Req.get('orders/searchByQbc',{
        params:values
    })
}
/**
 * 区域列表
 * @param {*} values 
 */
export function AreaListsApi(values){
    return Req.get('channel/getProvinceInfo',{
        params:values
    })
}
/**
 * 门店列表搜索
 * @param {*} values 
 */
export function ShopListsApi(values){
    return Req.get('channel/getChannelByQbc',{
        params:values
    })
}