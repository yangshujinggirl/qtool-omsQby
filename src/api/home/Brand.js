import Req from '../Req'
/**
 * 
 * 获取品牌列表
 */
export function GetListsApi(values){
    return Req.get('/brand/searchBrand',{
        params:{...values}
    })
}
/**
 * 获取品牌详情
 * @param {*} values 
 */
export function GetInfoApi(values){
    return Req.get('/brand/viewBrand',{
        params:{...values}
    })
}
/**
 * 新增品牌
 * @param {*} values 
 */
export function saveBrandApi(values){
    return Req.get('/brand/addBrand',{
        params:{...values}
    })
}