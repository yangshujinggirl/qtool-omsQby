import { dataAjax,omsAjax } from '../../Req';
/**
 * 获取门店智能检索返回的门店列表
 * @constructor
 */
export function GetStoreIntelligentSearchList(values) {
	return omsAjax.get('channel/findChannelByName', {
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
