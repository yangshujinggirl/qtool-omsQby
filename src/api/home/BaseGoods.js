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