import Req from '../Req'
/**
 * 
 * 获取分类列表
 */
export function GetListsApi(values){
    return Req.get('category/searchCategory',{
        params:{...values}
    })
}
