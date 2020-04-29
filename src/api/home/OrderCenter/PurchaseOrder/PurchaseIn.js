import { omsAjax } from "../../../Req";

/**
 * 获取采购订单列表
 */
export function GetPurchaseInOrderListApi(values) {
  return omsAjax.get("/thinkStocking/searchByQbc", {
    params: { ...values },
  });
}

/**
 * 推送强制完成数据
 */
export function PushPurchaseInOrderForceComplete(values) {
  return omsAjax.post("/thinkStocking/purchaseComplete", {
    stockingCodeList: values,
  });
}

/**
 * 推送批量审核数据
 */
export function PushPurchaseInOrderBatchReview(values) {
  return omsAjax.post("/thinkStocking/thinkStockingCheck", values);
}
/**
 * 新建、修改
 */
export function addPurchaseinApi(values) {
  return omsAjax.post("/thinkStocking/createAndUpdateThinkStocking", {
    ...values,
  });
}
/**
 * 搜索供应商
 */
export function searchSupplierApi(values) {
  return omsAjax.get("/supplier/rummageSupplierInfo", {
    params: { ...values },
  });
}
/**
 * 搜索仓库  warehouseType  仓库类型 1大仓   2门店仓  3保税仓
 */
export function searchStoreApi(values) {
  return omsAjax.get("/warehouse/usableWarehouse", {
    params: { ...values },
  });
}
/**
 * 查询采购价
 */
export function searchPriceApi(values) {
  return omsAjax.get("/items/skuSimpleInfoByCode", {
    params: { ...values },
  });
}

/**
 * 获取采购订单详情
 * @constructor
 */
export function GetPurchaseInOrderDetailApi(values) {
  return omsAjax.get("/thinkStocking/getThinkStockingDetail", {
    params: {
      ...values,
    },
  });
}

/**
 * 获取采购订单操作日志
 * @constructor
 */
export function GetPurchaseInOrderOptionsLogsApi(stockingCode) {
  return omsAjax.get("/thinkStocking/getStockingLog", {
    params: {
      orderCode: stockingCode,
    },
  });
}
/**
 *
 * @param {获取打印页数} values
 */
export function getPrintPage(values) {
  return omsAjax.get("/thinkStocking/getPrintPage", {
    params: values,
  });
}
/**
 *
 * @param {获取打印的html页面} values
 */
export function getPrintHtml(values) {
  return omsAjax.get("/thinkStocking/printData", {
    params: values,
  });
}
