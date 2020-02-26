import {omsAjax} from '../Req'
/**
 * 获取库存管理列表
 * @param {*} value 
 */
export function GetListsApi(values){
    return omsAjax.get('warehouse/searchWarehouse',{
        params:{...values}
    })
}
/**
 * 获取门店列表
 * @param {\} values 
 */
export function GetShopListApi(values){
    return omsAjax.get('warehouse/getChannel',{
        params:values
    })
}
/**
 * 修改库存
 * @param {*} values 
 */
export function updataStoreApi(values){
    return omsAjax.post('warehouse/modWarehouse',{
        ...values
    });
}
/**
 * 新增库存
 */
export function storeAddApi(values){
    return omsAjax.post('warehouse/addWarehouse',values)
}
/**
 * 详情
 * @param {*} values 
 */
export function storeInfoApi(values){
    return omsAjax.get('warehouse/viewWarehouse',{
        params:values
    })
}