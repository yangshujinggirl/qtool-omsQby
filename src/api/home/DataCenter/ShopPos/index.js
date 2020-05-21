import {erpAjax} from '../../../Req'
//门店列表
export function GetShopListList(values) {
	return erpAjax.get('/shop/list', {
		params: values,
	});
}

