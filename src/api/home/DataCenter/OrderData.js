import { dataAjax } from '../../Req';

/**
 * 获取门店订单头部数据基础数据
 * @constructor
 */
export function GetSpHeaderData(values) {
	return dataAjax.get('/order/queryShopOrderDataHead', {
		params: values,
	});
}

/**
 * 获取门店订单图表表格数据
 * @param values 请求参数
 * @constructor
 */
export function GetSpData(values) {
	return dataAjax.get('/order/shopOrderDataTendencyChart', {
		params: values,
	});
}

/**
 * 获取Pos订单数据基础数据
 * @constructor
 */
export function GetPosHeaderData() {
	return dataAjax.get('order/queryPosOrderDataHead', {
		params: values,
	});
}

/**
 * 获取Pos订单图表数据
 * @param values 请求参数
 * @constructor
 */
export function GetPosData(values) {
	return dataAjax.get('order/posOrderDataTendencyChart', {
		params: values,
	});
}

