import React from 'react'
import {Popover} from "antd";
import {QuestionCircleOutlined,} from '@ant-design/icons';
import {QbaseList, Qbtn, Qtable} from "common/index";
import Columns from "./column";
import {getListApi} from "api/home/FinancialCenter/SaleInOut";
import FilterForm from "./components/FilterForm";
import {ErpExportApi} from "../../../api/Export";

/**
 * 功能作用：销售收支明细页面
 * 初始注释时间： 2020/3/18 19:09
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const SaleInOut = QbaseList((_this) => {
    const {dataList} = _this.state;
    let content = (
        <div className="sell-manage-tips-modal">
            <p className="label">1、若配送方式为：门店自提<span className="field">销售收款【结算金额】：商品金额*0.994</span>
            </p>
            <p className="label">2、若配送方式为：同城配送<span
                className="field">销售收款【结算金额】：（商品金额+用户支付配送费）*0.994-顺丰返回实际费用</span></p>
            <p className="field" style={{marginTop: '-5px'}}>（ps.骑士接单后门店取消，需要扣除门店9元配送费）</p>
            <p className="label">3、若配送方式为：快递邮寄<span
                className="field">销售收款【结算金额】：（商品金额+用户支付快递费）*0.994</span></p>
            <p className="label">【销售退款】</p>
            <p className="label">1、若配送方式为：门店自提<span
                className="field">销售退款【结算金额】：退款商品金额之和*0.994</span></p>
            <p className="label">2、若配送方式为：同城配送<span
                className="field">销售收款【结算金额】：退款商品金额之和*0.994</span></p>
            <p className="label">3、若配送方式为：快递邮寄<span
                className="field">销售收款【结算金额】：退款商品金额之和*0.994</span></p>
        </div>
    );
    return <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
        <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={() => new ErpExportApi(_this.state.searchCriteriaList, "spIncome/export")}>导出数据</Qbtn>
            <div style={{float: 'right'}}>
                <Popover content={content} title="销售收款计算规则" trigger="hover" placement="leftTop">
                    <div>销售收款计算规则<QuestionCircleOutlined
                        style={{color: "#ED6531", marginLeft: "4px"}}/></div>
                </Popover>
            </div>
        </div>
        <Qtable
            columns={Columns}
            select={true}
            dataSource={dataList}/>
    </div>
}, getListApi);
export default SaleInOut
