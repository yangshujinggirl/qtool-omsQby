import { appAjax, omsAjax } from '../Req';

export function GetListApi(values) {
	return appAjax.get(`/newUserGift/query`, { params: { ...values } });
}
//保存
export function GetSaveApi(values) {
	return appAjax.post(`/newUserGift/save`, { ...values });
}
//商品列表查询
export function GetTableListApi(values) {
	return appAjax.get(`/newUserGift/pdList`, { params: values });
}
//商品列表删除
export function DeleteTableListApi(values) {
	return appAjax.delete(`/newUserGift/pdDel`, { params: values });
}
