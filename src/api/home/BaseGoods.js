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
/**
 * 审核
 * @param {*} values 
 */
export function goAuditApi(values){
    return Req.get('/items/examineSku',{
       params:{...values}
    })
}
/**
 * 后台一级类目列表
 * @param {*} values 
 */
export function getOneCategoryApi(values){
    return Req.get('/category/searchCategoryByLevel',{
       params:{...values}
    })
}
/**
 * 后台二级类目列表
 * @param {*} values 
 */
export function getSubCategoryApi(values){
    return Req.get('/category/findByParentId',{
       params:{...values}
    })
}