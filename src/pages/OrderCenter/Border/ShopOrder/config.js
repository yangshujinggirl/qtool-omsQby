//待处理、待合单、待发货、已发货、已取消
/**
 * 订单状态待处理
 * @type {number}
 */
export const AUDIT_STATUS_WAIT_PENDING = 1;
/**
 * 订单状态待合单
 * @type {number}
 */
export const AUDIT_STATUS_STAY_IN_A_SINGLE = 2;
/**
 * 订单状态待发货
 * @type {number}
 */
export const AUDIT_STATUS_WAIT_SEND = 3;
/**
 * 订单状态已发货
 * @type {number}
 */
export const AUDIT_STATUS_SENT = 4;
/**
 * 订单状态已取消
 * @type {number}
 */
export const AUDIT_STATUS_CANCEL = 5;


/**
 * 订单来源-本营
 * @type {number}
 */
export const ORDER_FROM_Q_TOY_STORY_LAND = 1;
/**
 * 订单来源-掌柜
 * @type {number}
 */
export const ORDER_FROM_Q_SHOPKEEPER = 2;

/**
 * 预售状态-是
 * @type {number}
 */
export const PRE_SELL_STATUS_YES = 1;
/**
 * 预售状态-否
 * @type {number}
 */
export const PRE_SELL_STATUS_NO = 2;

/**
 * 直邮状态-是
 * @type {number}
 */
export const DIRECT_MAIL_STATUS_YES = 1;
/**
 * 直邮状态-否
 * @type {number}
 */
export const DIRECT_MAIL_STATUS_NO = 2;

/**
 * 代发状态-是
 * @type {number}
 */
export const AGENCY_SEND_STATUS_YES = 1;
/**
 * 代发状态-否
 * @type {number}
 */
export const AGENCY_SEND_STATUS_NO = 2;
