import Req from '../Req'
/**
 * 
 * 获取规格列表
 */
export function GetListsApi(values){
    return Req.get('attribute/searchByQbc',{
        params:{...values}
    })
}
/**
 * 修改
 * @param {*} values 
 */
export function UpdataAtrApi(values){
    return Req.post('attribute/updateAttribute',{
        ...values
    })
}
/**
 * 规格详情
 * @param {*} values 
 */
export function GetInfoApi(values){
    return Req.get('attribute/detail',{
        params:{...values}
    })
}
/**
 * 新增
 * @param {*} values 
 */
export function AddAtrApi(values){
    return Req.post('/attribute/addAttribute',{
        ...values
    })
}
/**
 * 绑定分类
 * @param {*} values 
 */
export function AtrBindApi(values){
    return Req.post('/attribute/relation',{
        ...values
    })
}