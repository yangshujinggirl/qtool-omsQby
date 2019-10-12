import Req from "../Req";
/**
 *
 * 获取分类列表
 */
export function GetListsApi(values) {
  return Req.get("category/searchCategory", {
    params:{...values} 
  });
}
/**
 *
 *新增保存接口
 */
export function saveApi(values) {
  return Req.post("category/addCategory", {
    ...values
  });
}
