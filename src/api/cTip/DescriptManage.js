import Req from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return Req.post('/product/attribute/query',{...values})
}
