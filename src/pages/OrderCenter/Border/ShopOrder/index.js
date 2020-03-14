import React from "react";
import {Link} from "react-router-dom";
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import {Columns} from "./column";
import {GetShopOrderListApi} from "../../../../api/home/OrderCenter/Border/ShopOrder";
import {ErpExportApi} from "../../../../api/Export";

/**
 * 功能作用：门店订单列表页面
 * 初始注释时间： 2020/3/9 12:13
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const ShopOrderList = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, totalCount, searchCriteriaList
        } = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
                    <Link to='/account/add_purchasein'><Qbtn size="free">新建门店订单</Qbtn></Link>
                    <Link to='/account/add_purchasein'><Qbtn size="free">新建赠品单</Qbtn></Link>
                    <Qbtn size="free"
                          onClick={() => new ErpExportApi(searchCriteriaList, "/export/spOrders")}>导出数据</Qbtn>
                </div>
                <Qtable
                    columns={Columns}
                    select={true}
                    dataSource={dataList}/>
                <Qpagination
                    data={{everyPage, currentPage, totalCount}}
                    onChange={_this.changePage}/>
            </div>
        );
    }, GetShopOrderListApi,
    false, null, null,
    null, null);
export default ShopOrderList
