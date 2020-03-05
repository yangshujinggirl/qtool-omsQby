import {erpAjax} from '../../../Req'
/**
 * 
 * 获取B商品列表
 */
export function GetListsApi(values){
    return erpAjax.get('spu/spus',{
        params:{...values}
    })
}
/**
 * 
 * 获取B商品详情
 */
export function GetGoodDetailApi(values){
    return erpAjax.get(`spu/${values.id}`)
}
/**
 * B端商品保存
 */
export function saveGoodApi(values){
    return erpAjax.post('spu/update',{
        ...values
    })
}
/**
 * 立即上下架
 */
export function changeStatusApi(values){
    return erpAjax.post('sku/update',{
        ...values
    })
}
/**
 * 批量上新/上畅销操作
 */
export function upStatusApi(values){
    const {type,..._values} = values;
    return erpAjax.post(`event/${type}/modify`,{
        ..._values
    })
}
/**
 * 批量下新/上畅销操作
 */
export function downStatusApi(values){
    const {type,..._values} = values;
    return erpAjax.post(`event/${type}/delete`,{
        ..._values
    })
}
