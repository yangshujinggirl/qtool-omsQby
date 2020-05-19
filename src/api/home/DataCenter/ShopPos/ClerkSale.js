import {erpAjax} from '../../../Req'
//获取店员销售列表数据
export const getClerkListApi=(values)=>{
	return erpAjax.get('/shopsales/list',{
		params:values
	})
}
