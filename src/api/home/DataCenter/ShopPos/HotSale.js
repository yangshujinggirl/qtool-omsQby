import {erpAjax,omsAjax} from '../../../Req'
//获取热销搜索商品分类列表数据
export const getCategoryListApi=(values)=>{
	return omsAjax.get('/category/searchCategoryByPro',{
		params:values
	})
}
//获取热销商品列表数据
export const getHotListApi=(values)=>{
	return erpAjax.get('/hotgood/list',{
		params:values
	})
}