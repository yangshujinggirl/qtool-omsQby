import { omsAjax } from "../../../Req";

/**
 * 网络请求成功code
 * @type {number}
 */
export const NET_REQUEST_SUCCESS_CODE = 200;

/**
 * 获取采购订单列表
 */
export function GetPurchaseInOrderListApi(values) {
  return omsAjax.get("/thinkStocking/searchByQbc", {
    params: { ...values }
  });
}

/**
 * 推送强制完成数据
 */
export function PushPurchaseInOrderForceComplete(values) {
  return omsAjax.post("/thinkStocking/purchaseComplete", {
    stockingCodeList: values
  });
}

/**
 * 推送批量审核数据
 */
export function PushPurchaseInOrderBatchReview(values, status) {
  return omsAjax.post("/thinkStocking/thinkStockingCheck", {
    stockingCodeList: values,
    status: status
  });
}
/**
 * 新建、修改
 */
export function addPurchasein(values) {
  return omsAjax.post("/thinkStocking/createAndUpdateThinkStockingRe", {
    ...values
  });
}
/**
 * 搜索供应商
 */
export function searchSupplier(values) {
  return omsAjax.get("/supplier/rummageSupplier", {
    params: { ...values }
  });
}
/**
 * 搜索供应商
 */
export function searchStore(values) {
  return omsAjax.get("/warehouse/usableWarehouse", {
    params: { ...values }
  });
}
/**
 * 查询采购价
 */
export function searchPrice(values) {
    return omsAjax.get("/items/skuSimpleInfoByCode", {
      params: { ...values }
    });
  }
