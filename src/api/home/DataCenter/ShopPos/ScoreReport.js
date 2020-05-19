import {erpAjax} from '../../../Req'
//获取进销存报表列表数据
export const getScoreReportListApi=(values)=>{
	return erpAjax.get('/mbcard/list',{
		params:values
	})
}