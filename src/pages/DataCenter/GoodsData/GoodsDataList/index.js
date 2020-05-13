import React from 'react';
import { QbaseList, Qbtn, Qpagination, Qtable } from 'common/index';
import FilterForm from './components/FilterForm';
import { DataExportApiColumn } from 'api/Export';
import Columns from './column';
import { deBounce } from 'utils/tools';
import { GetGoodsDataList } from 'api/home/DataCenter/BaseData/GoodsData';

/**
 * 功能作用：商品数据列表
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 */
//导出数据
const exportData = deBounce((searchCriteriaList) => {
	DataExportApiColumn(searchCriteriaList,'/goods/goodsDataExport',Columns,'商品数据');
}, 500);

const GoodsDataList = QbaseList(
	(_this) => {
		const { dataList, everyPage, currentPage, total, searchCriteriaList } = _this.state;
		return (
			<div className="oms-common-index-pages-wrap">
				<FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange} />
				<div className="handle-operate-btn-action">
					<Qbtn size="free" onClick={() => exportData(searchCriteriaList)}>
						导出数据
					</Qbtn>
				</div>
				<Qtable columns={Columns} select={true} dataSource={dataList} />
				<Qpagination data={{ everyPage, currentPage, total }} onChange={_this.changePage} />
			</div>
		);
	},
	GetGoodsDataList,
	{
		dataListOptionsKey:'barCode'
	}
);
export default GoodsDataList;
