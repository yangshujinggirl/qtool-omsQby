import Req from '../Req'
/**
 *
 * 获取基础商品列表
 */
export function GetGoodsApi(values){
    return Req.get('/items/searchSpuList',{
       params:{...values}
    })
}
/**
 * 审核
 * @param {*} values
 */
export function GoAuditApi(values){
    return Req.get('/items/examineSku',{
       params:{...values}
    })
}
/**
 * 后台一级类目列表
 * @param {*} values
 */
export function GetCategoryApi(values){
    return Req.get('/category/searchCategoryByPro',{
       params:{...values}
    })
}
/**
 * 规格
 * @param {*} values
 */
export function GetAttributeApi(values){
    return Req.get('/attribute/getAttributeList',{
       params:{...values}
    })
}
// /**
//  * 规格
//  * @param {*} values
//  */
// export function GetAttributeApi(values){
//     return Req.get('/attribute/searchAttributeByCategoryId',{
//        params:{...values}
//     })
// }
/**
 * 查询编辑详情
 * @param {*} values
 */
export function GetEditInfoApi(values){
    return Req.get('/items/searchItemsBySpuCode',{params:{...values}})
}
/**
 * 查询品牌
 * @param {*} values
 */
export function GetBrandApi(values){
    return Req.get('/brand/searchByName',{params:{...values}})
}
/**
 * 新建商品
 * @param {*} values
 */
export function GetAddApi(values){
  console.log(values)
    return Req.post('/items/addSpu',values)
}
/**
 * 修改商品
 * @param {*} values
 */
export function GetEditApi(values){
    return Req.post('/items/modSpu',{...values})
}
/**
 * 新增sku
 * @param {*} values
 */
export function GetAddSkuApi(values){
    return Req.post('/items/addSpuSku',{...values})
}
/**
 * 修改sku
 * @param {*} values
 */
export function GetEditSkuApi(values){
    return Req.post('/items/modSku',{...values})
}
/**
 * 货主
 * @param {*} values
 */
export function GetSupplierApi(values){
    return Req.post('/supplier/supplierNames',{...values})
}
