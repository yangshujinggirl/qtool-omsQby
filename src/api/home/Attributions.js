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
 * 规格修改
 * @param {*} values 
 */
export function saveAtrApi(values){
    return Req.get('attribute/updateAttribute',{
        params:{...values}
    })
}
/**
 * 规格编辑
 * @param {*} values 
 */
export function GetInfoApi(values){
    return Req.get('attribute/detail',{
        params:{...values}
    })
}