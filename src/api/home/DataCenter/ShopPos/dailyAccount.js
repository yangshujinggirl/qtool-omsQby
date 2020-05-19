import {erpAjax} from '../../../Req'
//获取每日对账单列表数据
export const getTabelListApi=(values)=>{
	return erpAjax.get('/rpdayaccount/list',{
		params:values
	})
}
//获取门店分成对账的列表数据
export const getDivideListApi=(values)=>{
	return erpAjax.get('/rpshareProfit/list',{
		params:values
	})
}

