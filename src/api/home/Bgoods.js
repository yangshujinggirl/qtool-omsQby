import Req from '../Req'
/**
 * 
 * 获取B商品列表
 */
export function GetGoodsApi(values){
    return Req.post('items/searchProductBListByQbc',{
       ...values
    })
}