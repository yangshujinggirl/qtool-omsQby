import React from "react";
import {QbaseList, Qpagination, Qbtn, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import {GetStoresTheInvoiceList} from "api/home/DataCenter/FinancialData";

/**
 * 功能作用：财务中心门店发票页面
 * 初始注释时间： 2020/3/22 16:57
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const StoresTheInvoice = QbaseList((_this) => {
        const {
            dataList, everyPage, currentPage, total
        } = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
                <div className="handle-operate-btn-action">
                    <Qbtn size="free">导出数据</Qbtn>
                </div>
                <Qtable
                    columns={_this.state.tableShowColumns}
                    select={true}
                    dataSource={dataList}/>
                <Qpagination
                    data={{everyPage, currentPage, total}}
                    onChange={_this.changePage}/>
            </div>
        );
    }, GetStoresTheInvoiceList, false, null, {tableShowColumns: []}
    , null, null, (_this, rep) => {
    debugger
        //默认表格字段
        const defaultTableColumns = [
            {title: '门店名称', dataIndex: 'name', width: 300},
            {title: '销售总金额', dataIndex: 'amount', width: 120},
            {title: '销售数量', dataIndex: 'salesSumQty', width: 120},
            {title: '退货总金额', dataIndex: 'returnAmount', width: 120},
            {title: '退货数量', dataIndex: 'refundSumQty', width: 120}]
        //插入特殊字段
        rep.result.result.categoryNames.forEach((item, index) => {
            defaultTableColumns.push({
                title: item,
                dataIndex: ['changeName' + index],
                width: 120
            })
        });
        defaultTableColumns.push({
            title: "详细信息",
            dataIndex: "detailInfo",
            width: 120,
            render: (text, record, index) => {
                return <a className={record.url ? 'theme-color pointer' : 'placehold-color'}
                          onClick={() => {
                              if (record.url) {
                                  window.open(record.url)
                              }
                          }}>下载</a>
            },
        });
        let dataList = rep.result.result.shopdatas;
        if (dataList.length) {
            for (let i = 0; i < dataList.length; i++) {
                dataList[i].key = i + 1;
                if (dataList[i].categoryAmounts != null) {
                    for (let j = 0; j < dataList[i].categoryAmounts.length; j++) {
                        dataList[i]['changeName' + j] = dataList[i].categoryAmounts[j];
                    }
                }
            }
        }
        _this.setState({
            tableShowColumns: defaultTableColumns,
            dataList: dataList
        })
    });
export default StoresTheInvoice;
