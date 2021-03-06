import React from 'react'
import {Modal} from 'antd'
import {QuestionCircleOutlined,} from '@ant-design/icons';
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import {ErpExportApi} from "../../../../api/Export";
import Columns from "./column";
import {
    getTotalListApi
} from "../../../../api/home/FinancialCenter/ShareInProfit";

/**
 * 功能作用：分润合计列表页面
 * 初始注释时间： 2020/3/20 11:52
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const Total = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <div className="handle-operate-btn-action">
                <Qbtn size="free"
                      onClick={() => new ErpExportApi(_this.state.searchCriteriaList, "/rpshareProfit/sumProfits/export")}>导出数据</Qbtn>
                <div style={{float: 'right'}}>
                    <p onClick={() => Modal.info({
                        width:600,
                        title: '表单说明',
                        content: (
                            <div className='lists'>
                                <p>• 直邮分润收款：该门店在查询时间范围内的，直邮分润中，类型为分润收款的总和</p>
                                <p>• 直邮分润扣款：该门店在查询时间范围内的，直邮分润中，类型为分润退款的总和</p>
                                <p>• 保税分润收款：该门店在查询时间范围内的，保税分润中，类型为分润收款的总和</p>
                                <p>• 保税分润扣款：该门店在查询时间范围内的，保税分润中，类型为分润退款的总和</p>
                                <p>• 总分润=直邮分润收款+直邮分润扣款+保税分润收款+保税分润扣款</p>
                            </div>
                        ),
                        onOk() {
                        },
                    })}>计算规则<QuestionCircleOutlined
                        style={{color: "#ED6531", marginLeft: "4px"}}/></p>
                </div>
            </div>
            <Qtable
                columns={Columns}
                select={true}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={_this.changePage}/>
        </div>
    )
}, getTotalListApi);
export default Total;
