import React from 'react';
import { QbaseList, Qbtn, Qpagination, Qtable } from 'common/index';
import FilterForm from './components/FilterForm';
import Columns from './column';
import { GetDivideCostList } from 'api/home/DataCenter/ShopData';
import {DataExportApi} from 'api/Export'
import moment from 'moment'

/**
 * 功能作用：联营分成页面
 * 初始注释时间： 2020/3/22 21:03
 * 注释创建人：LorenWang（王亮）
 */
//导出数据
const exportData=(_this)=>{
    DataExportApi('shop/queryConsortiumDivideIntoExport',_this.state.searchCriteriaList)
}
const handleOperateClick=(_this,record)=>{
    console.log(_this)
    console.log(record)
}

const JointOperationShareProportion = QbaseList(
	(_this) => {
		const { dataList, everyPage, currentPage, total } = _this.state;
		return (
			<div className="oms-common-index-pages-wrap">
				<FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange} />
				<div className="handle-operate-btn-action">
					<Qbtn onClick={()=>exportData(_this)}>导出数据</Qbtn>
				</div>
				<Qtable columns={Columns} dataSource={dataList} onOperateClick={(record)=>handleOperateClick(_this,record)}/>
				<Qpagination
					data={{ everyPage, currentPage,total}}
					onChange={_this.changePage}
				/>
			</div>
		);
	},
	GetDivideCostList,
	{
		isComponentDidMountRequestData:true,
		formatSearchCriteriaList:(_this,values)=>{
			const params = values?values:{};
			params.startDate = (!values||!values.time)?moment().format('YYYY-MM-DD'):values.time.format('YYYY-MM-DD')
			const {time,..._values} = params;
			return _values;
		}
	}
);
export default JointOperationShareProportion;
