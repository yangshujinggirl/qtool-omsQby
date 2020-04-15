import {omsAjax} from "../../../Req";

/**
 * 获取采退订单列表
 */
export function GetPurchaseOutOrderListApi(values) {
    return omsAjax.get('/thinkStockingRefund/getStockRefundList', {
        params: {...values}
    })
}

/**
 * 推送批量审核数据
 */
export function PushPurchaseOutOrderBatchReview(values, status) {
    return omsAjax.post('/thinkStockingRefund/thinkStockingReCheck', {
        stockingReCodeList: values,
        status: status
    })
}

/**
 * 获取采退订单详情
 * @constructor
 */
export function GetPurchaseOutOrderDetailApi(stockingReCode) {
    return omsAjax.get('/thinkStockingRefund/getStockRefundDetail', {
        params: {
            stockingReCode
        }
    })
}

/**
 * 获取采退订单操作日志
 * @constructor
 */
export function GetPurchaseOutOrderOptionsLogsApi(stockingCode) {
    return omsAjax.get('/thinkStockingRefund/getStockingReLog', {
        params: {
            orderCode: stockingCode
        }
    })
}
/**
 * 新建、修改
 */
export function addPurchaseOutApi(values) {
    return omsAjax.post("thinkStockingRefund/createAndUpdateThinkStockingRe", {
      ...values
    });
  }
  /**
   * 采购单搜索详情
   */
  export function getOrderInfoApi(values) {
    return omsAjax.get("thinkStocking/gainStockingDetail", {
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
   * 搜索仓库
   */
  export function getProvinceListApi(values) {
    return omsAjax.get("city/find");
  }
     /**
   * 搜索仓库
   */
  export function getPurchaseOutAudtiApi(values) {
    return omsAjax.post("/thinkStockingRefund/thinkStockingReCheck",values);
  }



