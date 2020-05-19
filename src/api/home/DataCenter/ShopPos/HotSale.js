import {erpAjax} from '../../../Req'
//获取热销商品列表数据
export const getHotListApi=(values)=>{
	return erpAjax.get('/hotgood/list',{
		params:values
	})
}