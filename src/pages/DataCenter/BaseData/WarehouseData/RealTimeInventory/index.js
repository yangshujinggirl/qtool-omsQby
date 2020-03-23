import React from "react";
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import {GetRealTimeInventoryList} from "../../../../../api/home/DataCenter/BaseData/WarehouseData";
import FilterForm from "./components/FilterForm";
import TableDataListUtil from "utils/TableDataListUtil";

/**
 * 功能作用：实时库存页面
 * 初始注释时间： 2020/3/21 18:16
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const RealTimeInventory = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, total
        } = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
                    <Qbtn>导出数据</Qbtn>
                </div>
                <Qtable
                    columns={_this.state.tableColumn}
                    dataSource={dataList}/>
                <Qpagination
                    data={{everyPage: everyPage, currentPage: currentPage, total: total}}
                    onChange={_this.changePage}/>
            </div>
        )
    }, GetRealTimeInventoryList, true, null,
    {
        /**
         * 表格字段
         */
        tableColumn: []
    }, null, null,
    (_this, rep) => {
        //额外数据处理
        const tableColumn = [];
        rep.headArr && rep.headArr.forEach((item, index) => {
            tableColumn.push({
                title: item.headName,
                dataIndex: item.infoStr,
                key: index
            })
        });
        _this.setState({
            dataList: TableDataListUtil.addKeyAndResultList(rep.invdatas),
            tableColumn: tableColumn,
            everyPage: 15,
            total: 25,
            currentPage: 1,
        })
    });
export default RealTimeInventory;
