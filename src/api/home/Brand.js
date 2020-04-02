import {omsAjax} from '../Req'
/**
 * 
 * 获取品牌列表
 */
export function GetListsApi(values){
    return omsAjax.get('/brand/searchBrand',{
        params:{...values}
    })
}
/**
 * 获取品牌详情
 * @param {*} values 
 */
export function GetInfoApi(values){
    return omsAjax.get('/brand/viewBrand',{
        params:{...values}
    })
}
/**
 * 新增品牌
 * @param {*} values 
 */
export function AddBrandApi(values){
    return omsAjax.post('/brand/addBrand',{
        ...values
    })
}
/**
 * 修改品牌
 * @param {*} values 
 */
export function UpdataBrandApi(values){
    return omsAjax.post('/brand/editBrand',{
        ...values
    })
}
//品牌归属地查询
export function BrandAddressApi(values){
    return omsAjax.get('/brand/brandCountry',{
        params:{...values}
    })
}