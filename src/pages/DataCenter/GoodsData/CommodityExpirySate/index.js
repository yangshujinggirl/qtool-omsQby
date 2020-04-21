import React from 'react';
import { QbaseList, Qbtn, Qpagination, Qtable } from 'common/index';
import { GetCommodityExpirySateList } from 'api/home/DataCenter/BaseData/WarehouseData';
import { dataEmptyInterceptorsAjax } from 'api/Export';
import { deBounce } from 'utils/tools';
import FilterForm from './components/FilterForm';
import Columns from './column';

/**
 * 功能作用：商品效期
 * 初始注释时间： 2020/3/21 18:16
 * 注释创建人：LorenWang（王亮）
 */
const exportData = deBounce(function () {
	dataEmptyInterceptorsAjax(searchDataList, '');
}, 500);
const CommodityExpirySate = QbaseList(
	(_this) => {
		const { dataList, everyPage, currentPage, total, searchDataList } = _this.state;
		return (
			<div className="oms-common-index-pages-wrap">
				<FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange} />
				<div className="handle-operate-btn-action">
					<Qbtn onClick={() => exportData(searchDataList)}>导出数据</Qbtn>
				</div>
				<Qtable columns={Columns} dataSource={dataList} />
				<Qpagination
					data={{ everyPage, currentPage, total}}
					onChange={_this.changePage}
				/>
			</div>
		);
	},
	GetCommodityExpirySateList,
	true
);
export default CommodityExpirySate;
