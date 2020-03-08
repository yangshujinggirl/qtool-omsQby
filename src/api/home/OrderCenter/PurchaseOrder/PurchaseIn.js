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
export function addPurchaseinApi(values) {
  return omsAjax.post("/thinkStocking/createAndUpdateThinkStockingRe", {
    ...values
  });
}
/**
 * 搜索供应商
 */
export function searchSupplierApi(values) {
  return omsAjax.get("/supplier/rummageSupplier", {
    params: { ...values }
  });
}
/**
 * 供应商名搜索账期
 */
export function getPayTypeApi(values) {
  return omsAjax.get("/items/skuSimpleInfoByCode", {
    params: { ...values }
  });
}
/**
 * 搜索仓库
 */
export function searchStoreApi(values) {
  return omsAjax.get("/warehouse/usableWarehouse", {
    params: { ...values }
  });
}
/**
 * 查询采购价
 */
export function searchPriceApi(values) {
  return omsAjax.get("/items/skuSimpleInfoByCode", {
    params: { ...values }
  });
}

/**
 * 获取采购订单详情
 * @constructor
 */
export function GetPurchaseInOrderDetailApi(stockingCode) {
  return omsAjax.get("/thinkStocking/getThinkStockingDetail", {
    params: {
      stockingCode: stockingCode
    }
  });
}

/**
 * 获取采购订单操作日志
 * @constructor
 */
export function GetPurchaseInOrderOptionsLogsApi(stockingCode) {
  return omsAjax.get("/thinkStocking/getStockingLog", {
    params: {
      stockingCode: stockingCode
    }
  });
}
