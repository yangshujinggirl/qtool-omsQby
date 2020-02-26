import { erpAjax } from '../Req';
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return erpAjax.post('/toC/product',{...values})
}
