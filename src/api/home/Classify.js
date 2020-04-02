import {omsAjax} from "../Req";
/**
 *
 * 获取分类列表
 */
export function GetListsApi(values) {
  return omsAjax.get("category/searchCategory", {
    params: { ...values }
  });
}
/**
 *
 *新增保存接口
 */
export function AddApi(values) {
  return omsAjax.post("category/addCategory", {
    ...values
  });
}
/**
 *
 *编辑
 */
export function EditApi(values) {
  return omsAjax.post("category/modCategory", {
    ...values
  });
}
// 根据等级查分类列表
export function getCategoryListApi(values) {
  return omsAjax.get("/category/searchCategoryByPro", {
    ...values
  });
}
//详情
export function getClassInfo(values) {
  return omsAjax.get("/category/detail", { params: { ...values } });
}
