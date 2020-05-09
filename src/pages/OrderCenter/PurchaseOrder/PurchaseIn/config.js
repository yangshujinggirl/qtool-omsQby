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

//单据类型1新品首单、2正常品单、3缺货压货单、4样品订单
/**
 * 新品首单
 * @type {number}
 */
export const DOCUMENT_TYPE_NEW = 1;
/**
 * 正常品单
 * @type {number}
 */
export const DOCUMENT_TYPE_NORMAL = 2;
/**
 * 缺货压货单
 * @type {number}
 */
export const DOCUMENT_TYPE_GOODS_OUT_OF_STOCK_PRESSURE = 3;
/**
 * 样品订单
 * @type {number}
 */
export const DOCUMENT_TYPE_SPECIMEN = 4;
/**
 * 代发采购单
 * @type {number}
 */
export const DOCUMENT_TYPE_REPLACE = 5;
//物流费用方式
/**
 * 包邮
 * @type {number}
 */
export const LOGISTICS_EXPENSE_MODE_ZERO = 1;
/**
 * 到付
 * @type {number}
 */
export const LOGISTICS_EXPENSE_MODE_RECIPIENT_PAY = 2;


//采购主体 1淮安 2qtools
/**
 * 采购主体 淮安
 * @type {number}
 */
export const PROCUREMENT_TARGET_HUAIAN = 1
/**
 * 采购主体 qtools
 * @type {number}
 */
export const PROCUREMENT_TARGET_QTOOLS = 2
