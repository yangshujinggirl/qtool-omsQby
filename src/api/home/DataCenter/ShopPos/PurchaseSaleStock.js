import {erpAjax} from '../../../Req'
//获取进销存报表列表数据
export const getPurchaseListApi=(values)=>{
	return erpAjax.get('/purchase/list',{
		params:values
	})
}