import Req from '../Req'
/**
 * 获取库存管理列表
 * @param {*} value 
 */
export function GetListsApi(values){
    return Req.get('warehouse/searchWarehouse',{
        params:{...values}
    })
}
/**
 * 获取门店列表
 * @param {\} values 
 */
export function GetShopListApi(values){
    return Req.get('warehouse/getChannel',{
        params:values
    })
}
/**
 * 修改库存
 * @param {*} values 
 */
export function updataStoreApi(values){
    return Req.post('warehouse/modWarehouse',{
        params:{...values}
    });
}
/**
 * 新增库存
 */
export function storeAddApi(values){
    return Req.post('warehouse/addWarehouse',values)
}
/**
 * 详情
 * @param {*} values 
 */
export function storeInfoApi(values){
    return Req.get('warehouse/viewWarehouse',{
        params:values
    })
}