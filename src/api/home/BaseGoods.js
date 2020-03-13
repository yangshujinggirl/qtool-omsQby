import {omsAjax} from '../Req'
/**
 *
 * 获取基础商品列表
 */
export function GetGoodsApi(values){
    return omsAjax.get('/items/searchSpuList',{
       params:{...values}
    })
}
/**
 * 后台一级类目列表
 * @param {*} values
 */
export function GetCategoryApi(values){
    return omsAjax.get('/category/searchCategoryByPro',{
       params:{...values}
    })
}
/**
 * 规格
 * @param {*} values
 */
export function GetAttributeApi(values){
    return omsAjax.get('/attribute/getAttributeList',{
       params:{...values}
    })
}
/**
 * 查询编辑详情
 * @param {*} values
 */
export function GetEditInfoApi(values){
    return omsAjax.get('/items/searchItemsBySpuCode',{params:{...values}})
}
/**
 * 查询品牌
 * @param {*} values
 */
export function GetBrandApi(values){
    return omsAjax.get('/brand/searchByName',{params:{...values}})
}
/**
 * 编辑新增商品
 * @param {*} values
 */
export function GetEditApi(values){
    return omsAjax.post('/items/addAndAppendSku',values)
}
/**
 * 货主
 * @param {*} values
 */
export function GetSupplierApi(values){
    return omsAjax.get('/supplier/supplierNames')
}
/**
 * 图文信息
 * @param {*} values
 */
export function GetImgInfoApi(values){
    return omsAjax.get('/items/viewProductImageText',{params:{...values}})
}
export function GetEditImgApi(values){
    return omsAjax.post('/items/saveProductImageText',{...values})
}
