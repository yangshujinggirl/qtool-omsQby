import Req from "../../Req";
/**
 * 供应商列表
 * @param {*} values
 */
export function GetListsApi(values) {
  return Req.get("substitutingSku/searchSubstitutingSku", {
    params: values
  });
}
/**
 * 供应商列表
 * @param {*} values
 */
export function SupplierListsApi(values) {
  return Req.get("substitutingSku/getSuppliers", {
    params: values
  });
}
/**
 * 根据sku查商品
 * @param {*} values
 */
export function GetGoodNameApi(values) {
  return Req.get("substitutingSku/getProductNameBySku", {
    params: values
  });
}
/**
 * 新增
 * @param {*} values
 */
export function SupplierAddApi(values) {
  return Req.post("substitutingSku/addSubstitutingSku", values);
}
/**
 * 修改
 * @param {*} values
 */
export function SupplierUpdateApi(values) {
  return Req.post("substitutingSku/modSubstitutingSku", values);
}
/**
 * 查看
 * @param {*} values
 */
export function SupplierInfoApi(values) {
  return Req.get("substitutingSku/viewSubstitutingSku", { 
      params: values
    });
}
