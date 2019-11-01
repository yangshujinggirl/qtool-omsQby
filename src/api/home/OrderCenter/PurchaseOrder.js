import Req from '../../Req'
/**
 *
 * 获取基础商品列表
 */
export function GetOrderListApi(values){
    return Req.get('/thinkStocking/searchByQbc',{
       params:{...values}
    })
}
//备货单详情
export function GetOrderInfoApi(values){
    return Req.get('/thinkStocking/getThinkStockingDetail',{
       params:{...values}
    })
}
//备货单审核
export function GetAuditApi(values){
    return Req.get('/thinkStocking/thinkStockingCheck',{
       params:{...values}
    })
}
//备货单新建
export function GetAddOrderApi(values){
    return Req.post('/thinkStocking/addThinkStocking',values)
}
// export function GetAddApi(values){
//     return Req.post('/items/addSpu',values)
// }
//供应商列表
export function SupplierListApi(values){
    return Req.get('/supplier/rummageSupplier',{
        params:values
    })
}

//根据sku编码搜索商品
export function getGoodsApi(values){
    return Req.post('substitutingSku/getSkuListBySkuCodes',values)
}