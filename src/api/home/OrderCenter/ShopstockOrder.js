import Req from '../../Req'
/**
 *
 * 获取基础商品列表
 */
export function GetOrderListApi(values){
    return Req.get('/orders/getShortageOrderList',{
       params:{...values}
    })
}
// export function GetAddApi(values){
//     return Req.post('/items/addSpu',values)
// }
