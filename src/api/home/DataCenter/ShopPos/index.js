import {erpAjax} from '../../../Req'
//门店列表
export function GetShopListApi(values) {
	return erpAjax.get('/category/searchCategoryByPro', {
		params: values,
	});
}

