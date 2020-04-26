import { dataAjax } from '../../Req';
/**
 * 获取门店智能检索返回的门店列表
 * @constructor
 */
export function GetStoreIntelligentSearchList(values) {
	return dataAjax.get('/finance/queryPurchaseArrivalGoods', {
		params: values,
	});
}

/**
 * 获取门店成本数据列表
 * @constructor
 */
export function GetCostOfStoreDataList(values) {
	return dataAjax.get('/finance/queryPurchaseArrivalGoods', {
		params: values,
	});
}

/**
 * 获取成本核算数据列表
 * @constructor
 */
export function GetCostAccountingDataList(values) {
	return dataAjax.get('/finance/queryPurchaseArrivalGoods', {
		params: values,
	});
}

/**
 * 获取采购到货数据列表
 * @constructor
 */
export function GetPurchasingTheArrivalOfTheGoodsDataList(values) {
	return dataAjax.get('/finance/queryPurchaseArrivalGoods', {
		params: values,
	});
}

/**
 * 获取门店发票数据列表
 * @constructor
 */
export function GetStoresTheInvoiceList(values) {
	return dataAjax.get('/finance/queryShopBill', {
		params: values,
	});
}
