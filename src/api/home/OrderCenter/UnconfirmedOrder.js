import Req from '../../Req'
/**
 *
 * 获取列表
 */
export function GetOrderListApi(values){
    return Req.get('/orders/getErrorOrderList',{
       params:{...values}
    })
}
//审核通过
export function GetAuditApi(values){
    return Req.post('/orders/updateOrderAndOrderDetailStatus',values)
}
//修改金额
export function GetEditAmoutLimitApi(values){
    return Req.post('/orderLimit/updateAmountLimit',values)
}
//查询金额
export function GetAmoutLimitApi(values){
    return Req.post('/orderLimit/getAmountLimit',values)
}
