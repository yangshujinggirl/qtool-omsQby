import React from 'react';
import { QbaseList, Qpagination, Qbtn, Qtable } from 'common/index';
import FilterForm from './components/FilterForm';
import Columns from './column';
import { GetPurchasingTheArrivalOfTheGoodsDataList } from 'api/home/DataCenter/FinancialData';
import { DataExportApiColumn } from 'api/Export';
import { deBounce } from 'utils/tools';

/**
 * 功能作用：财务中心采购到货页面
 * 初始注释时间： 2020/3/22 16:57
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const exportData = deBounce((_this) => {
	DataExportApiColumn(_this.state.searchCriteriaList,'/finance/queryPurchaseArrivalGoodsExport',Columns,'采购到货');
},500);
const PurchasingTheArrivalOfTheGoods = QbaseList(
	(_this) => {
		const { dataList, everyPage, currentPage, total } = _this.state;
		return (
			<div className="oms-common-index-pages-wrap">
				<FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange} />
				<div className="handle-operate-btn-action">
					<Qbtn size="free" onClick={() => exportData(_this)}>
						导出数据
					</Qbtn>
				</div>
				<Qtable columns={Columns} select={true} dataSource={dataList} />
				<Qpagination data={{ everyPage, currentPage, total }} onChange={_this.changePage} />
			</div>
		);
	},
	GetPurchasingTheArrivalOfTheGoodsDataList,
	{
		isComponentDidMountRequestData: true,
	}
);
export default PurchasingTheArrivalOfTheGoods;
