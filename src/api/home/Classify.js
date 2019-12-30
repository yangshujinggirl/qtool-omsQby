import Req from "../Req";
/**
 *
 * 获取分类列表
 */
export function GetListsApi(values) {
  return Req.get("category/searchCategory", {
    params: { ...values }
  });
}
/**
 *
 *新增保存接口
 */
export function AddApi(values) {
  return Req.post("category/addCategory", {
    ...values
  });
}
/**
 *
 *编辑
 */
export function EditApi(values) {
  return Req.post("category/modCategory", {
    ...values
  });
}
// 根据等级查分类列表
export function getCategoryListApi(values) {
  return Req.get("/category/searchCategoryByPro", {
    ...values
  });
}
//详情
export function getClassInfo(values) {
  return Req.get("/category/detail", { params: { ...values } });
}
