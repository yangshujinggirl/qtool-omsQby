import {omsAjax} from '../../Req'
//门店列表
export function GetShopListList(values) {
	return omsAjax.get('channel/findChannelByName', {
		params: values,
	});
}
