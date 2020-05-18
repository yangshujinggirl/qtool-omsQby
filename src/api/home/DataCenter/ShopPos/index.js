import {erpAjax} from '../../../Req'
//门店列表
export function GetShopListApi(values) {
	return erpAjax.get('/shop/list', {
		params: values,
	});
}
//获取头部详情
export function getHeaderApi(){
    return erpAjax.get('',{
        params:values
    })
}
