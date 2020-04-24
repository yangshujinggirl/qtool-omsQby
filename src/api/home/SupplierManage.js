import {omsAjax} from '../Req';
/**
 *
 * 获取商品列表
 */
export function GetListApi(values){
    return omsAjax.get('/supplier/searchByQbc',{
       params:{...values}
    })
}
/**
 *
 * 获取商品详情
 */
export function GetDetailApi(values){
    return omsAjax.get('/supplier/supplierDetail',{
       params:{...values}
    })
}
/**
 *
 * 新增
 */
export function GetAddApi(values){
    return omsAjax.post('/supplier/addSupplier',{...values})
}
/**
 *
 * 编辑
 */
export function GetEditApi(values){
    return omsAjax.post('/supplier/updateSupplierInfo',{...values})
}
/**
 *
 * 审核
 */
export function GeAuditApi(values){
    return omsAjax.post('/supplier/bachUpdateStatus',{...values})
}
