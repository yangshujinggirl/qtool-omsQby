import React from 'react'
import {Modal} from 'antd'
import {QuestionCircleOutlined,} from '@ant-design/icons';
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import {ErpExportApi} from "../../../../api/Export";
import Columns from "./column";
import {
    getUnderBondListApi
} from "../../../../api/home/FinancialCenter/ShareInProfit";

/**
 * 功能作用：保税分润列表页面
 * 初始注释时间： 2020/3/20 11:53
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const UnderBond = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap divide_profit">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <div className="handle-operate-btn-action">
                <Qbtn size="free"
                      onClick={() => new ErpExportApi(_this.state.searchCriteriaList, "/rpshareProfit/directDeveryOrder/export")}>导出数据</Qbtn>
                <div style={{float: 'right'}}>
                    <p onClick={() => Modal.info({
                        width:500,
                        title: '表单说明',
                        content: (
                            <div className='lists'>
                                <p>• 分润收款金额：∑商品售价*数量*分成比例</p>
                                <p>• 分润扣款金额：∑退货商品售价*退货数量*分成比例</p>
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
}, getUnderBondListApi, false,null,null,(_this,params)=>{
    console.log(params)
    return{
        orderType:2,
        ...params
    }
});
export default UnderBond;
