import React from 'react'
import {Modal} from "antd";
import moment from "moment";
import CommonUtils from "utils/CommonUtils";
import {Qbtn, QcardList, Qcards, Qcharts, Qtable} from "common/index";
import TopTitleDesHeader from "../../components/TopTitleDesHeader";
import {
    GetStoreSaleBaseData,
    GetStoreSaleChartsData, GetStoreSaleTableData
} from "api/home/DataCenter/ShopData";
import {CHARTS_TYPE_LINEAR} from "common/Qcharts";
import Columns from "./column";

/**
 * 功能作用：商品分析
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class SaleData extends React.Component {
    state = {
        updateTime: "",
        /**
         * 基础信息
         */
        data: [],
        /**
         * 列表数据
         */
        listData: [],
        /**
         * 表格数据
         */
        tableDataList: [],
        /**
         * 以下为图表数据
         */
        chartsXData: [],
        chartsData1: [],
        chartsData2: [],
        chartsData3: [],
        chartsData4: [],
        searchChartsFilterList: {}
    };

    /**
     * 第一次渲染结束操作
     */
    componentDidMount() {
        new GetStoreSaleBaseData().then(rep => {
            const shopSaleData = rep.result;
            const updateTime = shopSaleData.updateTime;
            const dsa = !shopSaleData.yesterdayCostAmount ? 0 : shopSaleData.yesterdayCostAmount;
            const dsb = !shopSaleData.upYesterdayCostAmount ? 0 : shopSaleData.upYesterdayCostAmount;
            shopSaleData.yesterdaysellRate = CommonUtils.dataDifferenceValueComparison(shopSaleData.yesterdayAmount, dsa) / 100;//昨日毛利率（要小数形式，所以除100）
            shopSaleData.yesterdaysellRates = CommonUtils.dataDifferenceValueComparison(shopSaleData.yesterdayAmount, dsa) + '%';//昨日毛利率展示
            shopSaleData.upyesterdaysellRate = CommonUtils.dataDifferenceValueComparison(shopSaleData.upYesterdayAmount, dsb) / 100;//上期昨日毛利率（要小数形式，所以除100）
            shopSaleData.posAmountBi = CommonUtils.dataDifferenceValueComparison(shopSaleData.posAmount, shopSaleData.upPosAmount);//毛销售额
            shopSaleData.possaleAmountBi = CommonUtils.dataDifferenceValueComparison(shopSaleData.saleAmount, shopSaleData.upSaleAmount);  //销售额
            shopSaleData.poscleanAmountBi = CommonUtils.dataDifferenceValueComparison(shopSaleData.cleanAmount, shopSaleData.upCleanAmount); //净收款
            shopSaleData.yesterdaysellRateBi = CommonUtils.dataDifferenceValueComparison(shopSaleData.yesterdaysellRate, shopSaleData.upyesterdaysellRate);  //昨日毛利率

            const data = [{
                title: '毛销售额',
                value: shopSaleData.posAmount,
                rate: Math.abs(shopSaleData.posAmountBi),
                text: '同比上周',
                type: (shopSaleData.posAmountBi < 0) ? '0' : '1'
            }, {
                title: '销售额',
                value: shopSaleData.saleAmount,
                rate: Math.abs(shopSaleData.possaleAmountBi),
                text: '同比上周',
                type: (shopSaleData.possaleAmountBi < 0) ? '0' : '1'
            }, {
                title: '净收款',
                value: shopSaleData.cleanAmount,
                rate: Math.abs(shopSaleData.poscleanAmountBi),
                text: '同比上周',
                type: (shopSaleData.poscleanAmountBi < 0) ? '0' : '1'
            }, {
                title: '昨日毛利率',
                value: shopSaleData.yesterdaysellRates,
                rate: Math.abs(shopSaleData.yesterdaysellRateBi),
                text: '同比上周',
                type: (shopSaleData.yesterdaysellRateBi < 0) ? '0' : '1'
            }];
            const listData = [{
                title: '门店排行榜',
                value: shopSaleData.shopRank,
                type: '1',
                bg: '#949494'

            }, {
                title: '学习门店',
                value: shopSaleData.studyShop,
                type: '2',
                bg: "#ABDB7D"

            }, {
                title: '指导门店',
                value: shopSaleData.guidanceShop,
                type: '3',
                bg: '#71A6F1'

            }, {
                title: '注意门店',
                value: shopSaleData.carefulShop,
                type: '4',
                bg: '#BC2739'
            }];
            this.setState({
                updateTime: updateTime,
                data: data,
                listData: listData
            })
        });
        new GetStoreSaleTableData().then(rep => {
            this.setState({
                tableDataList: rep.result.result
            })
        });
    }

    /**
     * 数据定义说明
     */
    desInfo = () => {
        Modal.info({
            title: '字段解释',
            content: (
                <div className='lists'>
                    <p>【毛销售额】：POS产生的所有订单的订单金额总和 </p>
                    <p>【销售额】：POS毛销售额-POS退款金额</p>
                    <p>【净收款】：微信+支付宝+现金+银联</p>
                    <p>【昨日毛利率】：（昨日销售额-昨日总销售成本）/昨日销售额</p>
                    <p>【销售成本】：数据跟随POS数据销售成本定义</p>
                    <p>【门店排行榜】：门店按照POS销售额进行排序</p>
                    <p>【学习门店】：明星门店，建议学习。历史7天销售金额/历史7天进货金额大约等于30%，且历史7天POS销售金额大于15000的门店</p>
                    <p>【指导门店】：门店销售情况较差的门店。历史7天销售金额/历史7天进货金额小于等于100%，且历史7天POS销售金额小于5000的门店</p>
                    <p>【注意门店】：门店持续不进货，需要注意门店。历史3天门店无门店订单产生，且门店状态为开业中状态</p>
                    <p>【掌柜销售额】：门店生成的门店订单订单金额总和（去除取消订单）</p>
                    <p>【掌柜销售数量】：门店生成的门店订单商品数量总和（去除取消订单）</p>
                    <p>【POS销售额】：门店POS销售订单订单金额总和-门店POS退货订单订单金额总和</p>
                    <p>【POS净收款】：门店实际发生的金钱流变化</p>
                    <p>【POS销售数量】：门店POS销售订单商品数量总和-门店POS退货订单商品数量总和</p>
                    <p>【历史7天】：如果今日为2017年11月10日，历史7日为2017年11月4日-2017年11月10日</p>
                    <p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    /**
     * 获取数据列表
     * @param values 搜索条件
     */
    getChartsDataList(values) {
        new GetStoreSaleChartsData().then(rep => {
            const analysis = rep.result.result;
            const chartsXData = [];
            const chartsData1 = [];
            const chartsData2 = [];
            const chartsData3 = [];
            const chartsData4 = [];
            for (let i = 0; i < analysis.length; i++) {
                if (values.startRpDate === values.endRpDate) {
                    chartsXData.push(analysis[i].rpDateTime)
                } else {
                    chartsXData.push(analysis[i].rpDate)
                }
                chartsData1.push(analysis[i].qbyQty); //掌柜数量
                chartsData2.push(analysis[i].posQty); //pos数量
                chartsData3.push(analysis[i].qbyAmount);//掌柜金额
                chartsData4.push(analysis[i].posAmount); //pos金额
            }
            this.setState({
                chartsXData: chartsXData,
                type: '1',
                chartsData1: chartsData1,
                chartsData2: chartsData2,
                chartsData3: chartsData3,
                chartsData4: chartsData4
            })
        });
    }

    /**
     * 刷新图表数据
     * @param values
     */
    refreshChartsDataList(values) {
        const params = {...this.state.searchFilterList, ...values};
        //设置数据
        this.setState({searchFilterList: {...params}});
        //请求数据
        this.getChartsDataList(params);
    }

    render() {
        const chartsData = {};
        chartsData['销售数量_-_掌柜销售'] = this.state.chartsData1;
        chartsData['销售数量_-_POS销售'] = this.state.chartsData2;
        chartsData['销售金额_-_掌柜销售'] = this.state.chartsData3;
        chartsData['销售金额_-_POS销售'] = this.state.chartsData4;
        return <div>
            <TopTitleDesHeader updateTime={this.state.updateTime}
                               desInfoClick={this.desInfo.bind(this)}/>
            <Qcards data={this.state.data}/>
            <QcardList data={this.state.listData}/>
            <div style={{border: '1px solid #e8e8e8', padding: '20px', marginTop: '30px'}}>
                return <Qcharts chartsType={CHARTS_TYPE_LINEAR}
                                chartsTitle='门店销售趋势图'
                                chartsLevel={2}
                                chartXData={this.state.chartsXData}
                                nowSelectFirstType='销售数量'
                                chartsData={chartsData}
                                refreshDataList={this.refreshChartsDataList.bind(this)}
                                selectTimeProps={{
                                    startTimeName: "startRpDate",
                                    endTimeName: "endRpDate",
                                    defaultValue: [moment(), moment()]
                                }}/>
            </div>
            <div className="oms-common-index-pages-wrap" style={{marginTop: '10px'}}>
                <div className="handle-operate-btn-action">
                    <Qbtn size="free">导出数据</Qbtn>
                </div>
                <Qtable
                    columns={Columns}
                    select={true}
                    dataSource={this.state.tableDataList}/>
            </div>
        </div>
    }
}
