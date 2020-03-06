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
