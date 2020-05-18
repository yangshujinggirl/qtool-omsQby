import {erpAjax} from '../../../Req'
//获取列表数据
export const getTabelListApi=(values)=>{
	return erpAjax.get('/rpdayaccount/list',{
		params:values
	})
}
//获取门店分成对账的列表数据
export const getDivideListApi=(values)=>{
	return erpAjax.get('/pos/rpshareprofit/list',{
		params:values
	})
}

