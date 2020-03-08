//1待审核 2审核通过 3审核不通过
/**
 * 待审核
 * @type {number}
 */
export const AUDIT_STATUS_WAIT = 1;
/**
 * 审核通过
 * @type {number}
 */
export const AUDIT_STATUS_PASS = 2;
/**
 * 审核不通过
 * @type {number}
 */
export const AUDIT_STATUS_NO_PASS = 3;

// 发货状态 0全部 1待收货 2收货中(部分收货) 3已收货
/**
 * 订单状态全部
 * @type {number}
 */
export const ORDER_STATUS_ALL = 0;
/**
 * 待收货
 * @type {number}
 */
export const ORDER_STATUS_WAIT = 1;
/**
 * 收货中(部分收货)
 * @type {number}
 */
export const ORDER_STATUS_LOADING = 2;
/**
 * 已收货
 * @type {number}
 */
export const ORDER_STATUS_RECEIVED = 3;

