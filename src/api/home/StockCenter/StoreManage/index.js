import { omsAjax } from "../../../Req";
/**
 *
 * 获取列表
 */
export function getListApi(values) {
  return omsAjax.get("/warehouse/searchWarehouse", {
    params: { ...values }
  });
}
/**
 *
 * 新建
 */
export function saveStoreApi(values) {
  return omsAjax.post("/warehouse/saveAndUpdateWarehouse", values);
}
/**
 * 
 *详情
 */
export function getInfoApi(values) {
  return omsAjax.get("/warehouse/viewWarehouse", {
    params: values
  });
}
