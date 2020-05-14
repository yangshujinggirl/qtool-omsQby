import React from 'react';
import { QbaseList, Qbtn, Qpagination, Qtable } from 'common/index';
import FilterForm from './components/FilterForm';
import Columns from './column';
import { GetDivideCostList } from 'api/home/DataCenter/ShopData';
import { DataExportApiColumn, DataExportApi } from 'api/Export';
import { ExportExcelInfo } from './ExportExcelInfo';
import moment from 'moment';

/**
 * 功能作用：联营分成页面
 * 初始注释时间： 2020/3/22 21:03
 * 注释创建人：LorenWang（王亮）
 */
//导出数据
const exportData = (_this) => {
	DataExportApiColumn(_this.state.searchCriteriaList, 'shop/queryConsortiumDivideIntoExport', Columns, '联营分成');
};
const handleOperateClick = (_this, record) => {
	DataExportApi({shopId:record.shopId,..._this.state.searchCriteriaList}, '/shop/queryDivideIntoDownloadExport', ExportExcelInfo);
};

const JointOperationShareProportion = QbaseList(
	(_this) => {
		const { dataList, everyPage, currentPage, total } = _this.state;
		return (
			<div className="oms-common-index-pages-wrap">
				<FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange} />
				<div className="handle-operate-btn-action">
					<Qbtn onClick={() => exportData(_this)}>导出数据</Qbtn>
				</div>
				<Qtable
					columns={Columns}
					dataSource={dataList}
					onOperateClick={(record) => handleOperateClick(_this, record)}
				/>
				<Qpagination data={{ everyPage, currentPage, total }} onChange={_this.changePage} />
			</div>
		);
	},
	GetDivideCostList,
	{
		isComponentDidMountRequestData: true,
		formatSearchCriteriaList: (_this, values) => {
			const params = values ? values : {};
			const {time,..._values} = params;
			if(time&&time[0]){
				_values.startDate = moment(time[0]).format('YYYY-MM-DD')
				_values.endDate = moment(time[1]).format('YYYY-MM-DD')
			}else{
				_values.startDate = moment().format('YYYY-MM-DD')
				_values.endDate = moment().format('YYYY-MM-DD')
			}
			return _values;
		},
	}
);
export default JointOperationShareProportion;
