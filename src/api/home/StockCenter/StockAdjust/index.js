import {omsAjax} from '../../../Req'
/**
 *
 * 根据商品名获取库存列表
 */
export function getStockListApi(values){
    return omsAjax.get('/stock/getSkuStock',{
       params:{...values}
    })
}
/**
 *
 * 根据修改后的库存
 */
export function getChangedStockApi(values){
    return omsAjax.post('/stock/updateBorderStock',values)
}

