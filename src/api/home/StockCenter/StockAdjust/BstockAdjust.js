import {erpAjax} from '../../../Req'
/**
 *
 * 根据商品名获取库存列表
 */
export function getStockListApi(skuCode){
    return erpAjax.get(`/sku/codeCheck/${skuCode}`)
}
/**
 *
 * 根据修改后的库存
 */
export function getChangedStockApi(values){
    return erpAjax.post('/pdinv/updateQty',values)
}

