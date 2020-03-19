// 配送方式：'1':'门店自提', '2':'同城配送', '3':'快递邮寄',
/**
 * 配送方式 门店自提
 * @type {number}
 */
export const SALE_IN_OUT_DELIVERY_TYPE_STORES_TO_THE = 1;
/**
 * 配送方式 同城配送
 * @type {number}
 */
export const SALE_IN_OUT_DELIVERY_TYPE_INTRA_CITY_SERVICE = 2;
/**
 * 配送方式 快递邮寄
 * @type {number}
 */
export const SALE_IN_OUT_DELIVERY_TYPE_EXPRESS_MAIL = 3;

// 订单状态：'1':'已完成', '2':'已取消', '3':'已退款',
/**
 * 订单状态 已完成
 * @type {number}
 */
export const SALE_IN_OUT_ORDER_STATE_OFF_THE_STOCKS = 1;
/**
 * 订单状态 已取消
 * @type {number}
 */
export const SALE_IN_OUT_ORDER_STATE_CANCELED = 2;
/**
 * 订单状态 已退款
 * @type {number}
 */
export const SALE_IN_OUT_ORDER_STATE_REFUNDED = 3;

// 费用类型：'1':'销售收款', '2':'销售退款'
/**
 * 费用类型 销售收款
 * @type {number}
 */
export const SALE_IN_OUT_COST_TYPE_SALES_RECEIPTS = 1;
/**
 * 费用类型 销售退款
 * @type {number}
 */
export const SALE_IN_OUT_COST_TYPE_SALES_OF_THE_REFUND = 2;
