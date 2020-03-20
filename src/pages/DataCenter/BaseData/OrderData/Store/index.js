import React, {useState} from 'react'
import {Card, Modal} from "antd";
import TopTitleDesHeader from "../../../components/TopTitleDesHeader";
import {QbaseDetail, Qbtn, Qcards, QdetailBaseInfo} from "common/index";
import {GetStoreOrderData} from "../../../../../api/home/DataCenter/BaseData/OrderData";
import CommonUtils from "utils/CommonUtils";
import {GetOfflineStoreLevelTwoChannelInfo} from "../../../../../api/home/ChannelManage/Manager/OfflineStore";
import {AppExportApi} from "../../../../../api/Export";

/**
 * 功能作用：门店订单数据列表页面
 * 初始注释时间： 2020/3/20 19:07
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const Store = (props) => {
    const [dataInfo, setDataInfo] = useState({
        updateTime: "",
        /**
         * 基础信息
         */
        data: [],
        /**
         * 列表数据
         */
        datalist1: [],
        datalist2: [],
    });
    /**
     * 初始化完成回调
     * @param _this
     */
    const baseDetailComponentCallback = (_this) => {
        _this.showLoading();
        const analysis = new GetStoreOrderData().shopOrderData;
        const updateTime = analysis.updateTime;
        analysis.qtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.qtySum, analysis.upQtySum); //总订单数
        analysis.validQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.validQtySum, analysis.upValidQtySum); //有效订单数
        analysis.preSellQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.preSellQtySum, analysis.upPreSellQtySum); //预售订单数
        analysis.deQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.deQtySum, analysis.upDeQtySum);//直邮订单数
        analysis.cancelQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.cancelQtySum, analysis.upCancelQtySum);//取消订单数

        analysis.amountSumRate = CommonUtils.dataDifferenceValueComparison(analysis.amountSum, analysis.upAmountSum); //销售额
        analysis.validAmountSumRate = CommonUtils.dataDifferenceValueComparison(analysis.validAmountSum, analysis.upValidAmountSum);//有效销售额
        analysis.preSellAmountSumRate = CommonUtils.dataDifferenceValueComparison(analysis.preSellAmountSum, analysis.upPreSellAmountSum);//预售销售额
        analysis.deAmountSumRate = CommonUtils.dataDifferenceValueComparison(analysis.deAmountSum, analysis.upDeAmountSum);//直邮销售额
        analysis.cancelAmountSumRate = CommonUtils.dataDifferenceValueComparison(analysis.cancelAmountSum, analysis.upCancelAmountSum);//取消销售额
        const datalist1 = [{
            title: '总订单数',
            value: analysis.qtySum,
            rate: Math.abs(analysis.qtySumRate),
            text: '同比上周',
            type: (analysis.qtySumRate < 0) ? '0' : '1'
        }, {
            title: '有效订单数',
            value: analysis.validQtySum,
            rate: Math.abs(analysis.validQtySumRate),
            text: '同比上周',
            type: (analysis.validQtySumRate < 0) ? '0' : '1'
        }, {
            title: '预售订单数',
            value: analysis.preSellQtySum,
            rate: Math.abs(analysis.preSellQtySumRate),
            text: '同比上周',
            type: (analysis.preSellQtySumRate < 0) ? '0' : '1'
        }, {
            title: '直邮订单数',
            value: analysis.deQtySum,
            rate: Math.abs(analysis.deQtySumRate),
            text: '同比上周',
            type: (analysis.deQtySumRate < 0) ? '0' : '1'
        }, {
            title: '取消订单数',
            value: analysis.cancelQtySum,
            rate: Math.abs(analysis.cancelQtySumRate),
            text: '同比上周',
            type: (analysis.cancelQtySumRate < 0) ? '0' : '1'
        }];
        const datalist2 = [{
            title: '销售额',
            value: analysis.amountSum,
            rate: Math.abs(analysis.amountSumRate),
            text: '同比上周',
            type: (analysis.amountSumRate < 0) ? '0' : '1'
        }, {
            title: '有效销售额',
            value: analysis.validAmountSum,
            rate: Math.abs(analysis.validAmountSumRate),
            text: '同比上周',
            type: (analysis.validAmountSumRate < 0) ? '0' : '1'
        }, {
            title: '预售销售额',
            value: analysis.preSellAmountSum,
            rate: Math.abs(analysis.preSellAmountSumRate),
            text: '同比上周',
            type: (analysis.preSellAmountSumRate < 0) ? '0' : '1'
        }, {
            title: '直邮销售额',
            value: analysis.deAmountSum,
            rate: Math.abs(analysis.deAmountSumRate),
            text: '同比上周',
            type: (analysis.deAmountSumRate < 0) ? '0' : '1'
        }, {
            title: '取消销售额',
            value: analysis.cancelAmountSum,
            rate: Math.abs(analysis.cancelAmountSumRate),
            text: '同比上周',
            type: (analysis.cancelAmountSumRate < 0) ? '0' : '1'
        }];
        setDataInfo({
            updateTime: updateTime,
            /**
             * 基础信息
             */
            data: analysis,
            /**
             * 列表数据
             */
            datalist1: datalist1,
            datalist2: datalist2,
        });
        _this.hideLoading()
    };

    /**
     * 数据定义说明
     */
    const desInfo = () => {
        Modal.info({
            title: '字段解释',
            content: (
                <div className='lists'>
                    <p>【总订单数】：总体门店订单数（包含取消订单）</p>
                    <p>【有效订单数】：未取消的门店订单数量 </p>
                    <p>【预售订单数】：预售订单的数量</p>
                    <p>【直邮订单数】：直邮订单的数量</p>
                    <p>【取消订单数】：已经取消的门店订单数量</p>
                    <p>【销售额】：全部门店订单销售总额</p>
                    <p>【有效销售额】：未取消的门店订单的销售总额</p>
                    <p>【预售销售额】：预售订单的订单金额总和</p>
                    <p>【直邮销售额】：直邮订单的订单金额总和</p>
                    <p>【取消订单额】：取消订单的订单金额总和</p>
                    <p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    return <QbaseDetail childComponent={<div>
        <TopTitleDesHeader updateTime={dataInfo.updateTime}
                           desInfoClick={desInfo}/>
        <Qcards data={dataInfo.datalist1}/>
        <Qcards data={dataInfo.datalist2}/>
    </div>} baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default Store;
