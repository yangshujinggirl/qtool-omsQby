import React from 'react';
import {QbaseList, Qbtn, Qpagination, Qtable} from 'common/index';
import {GetCommodityExpirySateList} from 'api/home/DataCenter/BaseData/GoodsData';
import {DataExportApi} from 'api/Export';
import {deBounce} from 'utils/tools';
import FilterForm from './components/FilterForm';
import Columns from './column';

/**
 * 功能作用：商品效期
 * 初始注释时间： 2020/3/21 18:16
 * 注释创建人：LorenWang（王亮）
 */
const exportData = deBounce(function () {
    DataExportApi(searchDataList, '');
}, 500);
const CommodityExpirySate = QbaseList(
    (_this) => {
        const {everyPage, currentPage, total, searchDataList} = _this.state;
        const dataList = [{
            latestTime: null,
            page: null,
            spuId: "25086",
            skuId: "25849",
            goodsCode: "628619000374",
            barCode: "628619000374",
            goodsName: "baby gourmet贝贝美食家混合泥（128ml果泥）",
            goodsRule: "香草香蕉意式混合泥/7个月及以上",
            firstCategoryId: null,
            firstCategoryName: "奶粉辅食",
            secondCategoryId: null,
            secondCategoryName: "辅食",
            thirdCategoryId: null,
            thirdCategoryName: "蔬果泥肉泥",
            fourthCategoryId: null,
            fourthCategoryName: "蔬果泥肉泥",
            warehouseId: null,
            warehouseName: "华东仓配中心",
            locationCode: "9CP",
            locationGoodsQty: "1",
            expireDate: "2018-06-19 00:00:00",
            expireDates: -674
        }]
        console.log(dataList)
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList}
                            selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
                    <Qbtn onClick={() => exportData(searchDataList)}>导出数据</Qbtn>
                </div>
                <Qtable columns={Columns} dataSource={dataList}/>
                <Qpagination data={{everyPage, currentPage, total}} onChange={_this.changePage}/>
            </div>
        );
    },
    GetCommodityExpirySateList,
    {
        isComponentDidMountRequestData: true,
        formatSearchCriteriaList: (_this, values) => {
            values = values || {};
            const {expireType} = values;
            if (expireType) {
                values.expireType = expireType;
            } else {
                values.expireType = 40;
            }
            return values;
        }
    }
);
export default CommodityExpirySate;
