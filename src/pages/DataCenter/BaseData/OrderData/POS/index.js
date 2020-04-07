import React, {useState} from 'react'
import {Modal} from "antd";
import moment from "moment";
import TopTitleDesHeader from "../../../components/TopTitleDesHeader";
import {
    GetPosOrderData,
    GetPosChartsData,
    GetPosTableDataList
} from "../../../../../api/home/DataCenter/BaseData/OrderData";
import CommonUtils from "utils/CommonUtils";
import {TableDataListUtil} from "utils/index";
import {QbaseDetail, Qbtn, Qcards, Qcharts, Qtable} from "common/index";
import {CHARTS_TYPE_LINEAR} from "common/Qcharts";
import {FilterSearchRangeTime} from "common/QdisabledDateTime";
import Columns from "./column";

/**
 * 功能作用：POS订单数据列表页面
 * 初始注释时间： 2020/3/20 19:07
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const POS = (props) => {
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
     * 图表数据设置
     */
    const [chartsData, setChartsData] = useState({
        xdata: [],
        chartsDataList: {},
        searchFilterList: {}
    });
    /**
     * 表格数据
     */
    const [tableList, setTableList] = useState([]);

    /**
     * 初始化完成回调
     * @param _this
     */
    const baseDetailComponentCallback = (_this) => {
        _this.showLoading();
        const analysis = new GetPosOrderData().posOrderData;
        const updateTime = analysis.updateTime;
        analysis.orderQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.orderQtySum, analysis.upOrderQtySum); //销售订单数
        analysis.mbCardQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.mbCardQtySum, analysis.upMbCardQtySum); //会员订单数
        analysis.chargeQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.chargeQtySum, analysis.upChargeQtySum); //充值订单数
        analysis.returnQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.returnQtySum, analysis.upReturnQtySum);//退款订单数

        analysis.amountRate = CommonUtils.dataDifferenceValueComparison(analysis.amount, analysis.upAmount);//毛利润额
        analysis.saleAmountRate = CommonUtils.dataDifferenceValueComparison(analysis.saleAmount, analysis.upSaleAmount); //销售额
        analysis.mbCardAmountRate = CommonUtils.dataDifferenceValueComparison(analysis.mbCardAmount, analysis.upMbCardAmount);//会员销售额
        analysis.chargeAmountRate = CommonUtils.dataDifferenceValueComparison(analysis.chargeAmount, analysis.upChargeAmount);//充值金额
        analysis.returnAmountRate = CommonUtils.dataDifferenceValueComparison(analysis.returnAmount, analysis.upReturnAmount);//退款金额
        const datalist1 = [{
            title: '销售订单数',
            value: analysis.orderQtySum,
            rate: Math.abs(analysis.orderQtySumRate),
            text: '同比上周',
            type: (analysis.orderQtySumRate < 0) ? '0' : '1'
        }, {
            title: '会员订单数',
            value: analysis.mbCardQtySum,
            rate: Math.abs(analysis.mbCardQtySumRate),
            text: '同比上周',
            type: (analysis.mbCardQtySumRate < 0) ? '0' : '1'
        }, {
            title: '充值订单数',
            value: analysis.chargeQtySum,
            rate: Math.abs(analysis.chargeQtySumRate),
            text: '同比上周',
            type: (analysis.chargeQtySumRate < 0) ? '0' : '1'
        }, {
            title: '退款订单数',
            value: analysis.returnQtySum,
            rate: Math.abs(analysis.returnQtySumRate),
            text: '同比上周',
            type: (analysis.returnQtySumRate < 0) ? '0' : '1'
        }];
        const datalist2 = [{
            title: '毛销售额',
            value: analysis.amount,
            rate: Math.abs(analysis.amountRate),
            text: '同比上周',
            type: (analysis.amountRate < 0) ? '0' : '1'
        }, {
            title: '销售额',
            value: analysis.saleAmount,
            rate: Math.abs(analysis.saleAmountRate),
            text: '同比上周',
            type: (analysis.saleAmountRate < 0) ? '0' : '1'
        }, {
            title: '会员销售额',
            value: analysis.mbCardAmount,
            rate: Math.abs(analysis.mbCardAmountRate),
            text: '同比上周',
            type: (analysis.mbCardAmountRate < 0) ? '0' : '1'
        }, {
            title: '充值金额',
            value: analysis.chargeAmount,
            rate: Math.abs(analysis.chargeAmountRate),
            text: '同比上周',
            type: (analysis.chargeAmountRate < 0) ? '0' : '1'
        }, {
            title: '退款金额',
            value: analysis.returnAmount,
            rate: Math.abs(analysis.returnAmountRate),
            text: '同比上周',
            type: (analysis.returnAmountRate < 0) ? '0' : '1'
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
                    <p>【销售订单数】：POS中产生的销售订单数量</p>
                    <p>【会员订单数】：POS中产生会员积分的销售订单数量</p>
                    <p>【充值订单数】：POS中产生的充值订单数量</p>
                    <p>【退款订单数】：POS中产生的退款订单数量</p>
                    <p>【毛销售额】：POS中产生的所有销售订单的订单金额总和</p>
                    <p>【销售额】：POS中产生的所有销售订单的订单金额-POS中产生的退货订单的退款金额</p>
                    <p>【会员销售额】：POS中所有产生会员积分的销售订单订单金额总和</p>
                    <p>【充值金额】：POS中所产生的充值订单的充值总金额</p>
                    <p>【退款金额】：POS中所产生的退货订单的退款总金额</p>
                    <p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    /**
     * 获取表格数据
     */
    const getTableList = (values) => {
        setTableList(TableDataListUtil.addKeyAndResultList(new GetPosTableDataList(values).posOrderDatas))
    };

    /**
     * 获取图表数据列表
     * @param params
     */
    const getChartDataList = (params) => {
        const posOrderDatas = new GetPosChartsData().posOrderDatas;
        const xdata = [];
        const data1 = [];
        const data2 = [];
        for (var i = 0; i < posOrderDatas.length; i++) {
            if (params.startDate === params.endDate) {
                xdata.push(posOrderDatas[i].rpDateTimeStr)
            } else {
                xdata.push(posOrderDatas[i].rpDateStr)
            }

            data1.push(posOrderDatas[i].orderQtySum);//订单数
            data2.push(posOrderDatas[i].amount); //销售额
        }
        const chartsDataList = {};
        chartsDataList['订单数量'] = data1;
        chartsDataList['订单金额'] = data2;
        setChartsData({
            ...chartsData,
            chartsDataList: chartsDataList,
            xdata: xdata
        });
    };

    /**
     * 刷新图表数据
     * @param values
     */
    const refreshDataList = (values) => {
        const params = {...chartsData.searchFilterList, ...values};
        //设置数据
        setChartsData({...chartsData, searchFilterList: {...params}});
        //请求数据
        getChartDataList(params);
    };

    return <QbaseDetail childComponent={<div>
        <TopTitleDesHeader updateTime={dataInfo.updateTime}
                           desInfoClick={desInfo}/>
        <Qcards data={dataInfo.datalist1}/>
        <Qcards data={dataInfo.datalist2}/>
        <Qecharts chartsType={CHARTS_TYPE_LINEAR}
                 chartsTitle='订单变化趋势图'
                 chartsLevel={1}
                 chartXData={chartsData.xdata}
                 nowSelectFirstType='订单数量'
                 chartsData={chartsData.chartsDataList}
                 refreshDataList={refreshDataList}
                 selectTimeProps={{startTimeName: "startDate", endDate: "endRpDate"}}/>
        <div>订单变化数据</div>
        <div className="oms-common-index-pages-wrap">
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <FilterSearchRangeTime
                    style={{marginRight: '10px', width: '290px'}}
                    selectTimeChange={getTableList}
                    defaultValue={[moment(moment().subtract(29, 'days').format("YYYY-MM-DD 00:00:00")),
                        moment(moment().format("YYYY-MM-DD 23:59:59"))]}
                    startTimeName="startDate" endTimeName="endDate"
                    allowClear={false}/>
                <Qbtn type="primary">导出数据</Qbtn>
            </div>
            <Qtable
                columns={Columns}
                select={true}
                dataSource={tableList}/>
        </div>
    </div>} baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default POS;
