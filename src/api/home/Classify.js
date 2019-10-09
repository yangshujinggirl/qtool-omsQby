import Req from '../Req'
/**
 * 
 * 获取分类列表
 */
export function GetCategoryListApi(values){
    return Req.get('items/searchProductBListByQbc',{
        params:{...values}
    })
}