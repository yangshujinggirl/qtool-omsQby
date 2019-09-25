import Req from '../Req'
/**
 * 
 * 获取基础商品列表
 */
export function GetGoodsApi(values){
    return Req.post('/items/searchItems',{
       ...values
    })
}
/**
 * 审核
 * @param {*} values 
 */
export function goAuditApi(values){
    return Req.get('/items/examineSku',{
       params:{...values}
    })
}