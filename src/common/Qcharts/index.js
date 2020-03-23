import React from 'react'
import {Input} from "antd";
import moment from "moment";
import {FilterSearchRangeTime} from "common/QdisabledDateTime";
import './inde.css'
import {Qbtn} from "common/index";

const echarts = require('echarts');

/**
 * 图表类型为线性图表
 * @type {number}
 */
export const CHARTS_TYPE_LINEAR = 1;
/**
 * 图表类型为柱状图表
 * @type {number}
 */
export const CHARTS_TYPE_HISTOGRAM = 2;

/**
 * 功能作用：图表显示
 * 初始注释时间： 2020/3/21 9:55
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 * 参数说明：
 * {
 *    chartsType:int 图表类型，参考(@CHARTS_TYPE_LINEAR,@CHARTS_TYPE_HISTOGRAM),
 *    chartsTitle:"", 图表标题,
 *    chartsLevel:0,  图表等级，就是有几级图表例如pos销售掌柜销售为一级，那么pos额和掌柜额就为二级
 *    chartXData:[]   x相关数据
 *    nowSelectFirstType:"" 默认选中的以及图表标题数据
 *    inputProps:{}   输入框样式，默认为空，为空时不显示输入框
 *    selectTimeProps:{}   时间选择样式，不可为空
 *    chartsData:{
 *        firstTypeTitle_-_secondTypeTitle:[],对应数据列表，
 *        firstTypeTitle_-_secondTypeTitle:[],对应数据列表，
 *    }
 *
 * }
 */
export default class Qcharts extends React.Component {
    state = {
        /**
         * 一级标题列表
         */
        firstTypeTitles: [],
        /**
         * 当前选中的一级标题
         */
        nowSelectFirstType: "",
    };

    /**
     * 第一次渲染结束
     */
    componentDidMount() {
        const firsts = {};
        Object.keys(this.props.chartsData).forEach(item => {
            let split = item.split("_-_");
            firsts[split[0]] = "";
        });
        this.setState({
            firstTypeTitles: Object.keys(firsts),
            nowSelectFirstType: this.props.nowSelectFirstType
        });
    }

    /**
     * props更新时调用
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const firsts = {};
        Object.keys(nextProps.chartsData).forEach(item => {
            let split = item.split("_-_");
            firsts[split[0]] = "";
        });
        this.setState({
            firstTypeTitles: Object.keys(firsts),
            nowSelectFirstType: nextProps.nowSelectFirstType
        }, function () {
            this.drawCharts()
        });

    }

    /**
     * 修改切换类型
     * @param value 切换类型
     */
    changeFirstType(value) {
        this.setState({
            nowSelectFirstType: value
        }, function () {
            this.drawCharts()
        });
    }

    /**
     * 绘制图表
     */
    drawCharts() {
        //有哪几条线
        const legend = {data: [], top: "43", left: this.props.inputProps != null ? "460" : "310"};
        //数据存储并去重使用
        const legendTitle = {};
        if (this.props.chartsLevel >= 2) {
            Object.keys(this.props.chartsData).forEach(item => {
                let split = item.split("_-_");
                legendTitle[split[1]] = "";
            });
            //去重
            legend.data = Object.keys(legendTitle);
        }
        //实际的线数据
        const series = [];
        Object.keys(this.props.chartsData).forEach(item => {
            let split = item.split("_-_");
            if (split[0] === this.state.nowSelectFirstType) {
                //要读取的数据key
                const dataKey = split.length > 1 ? this.state.nowSelectFirstType + "_-_" + split[1] : this.state.nowSelectFirstType;
                //根据不同类型设置数据
                switch (this.props.chartsType) {
                    case CHARTS_TYPE_LINEAR:
                        series.push({
                            name: split[1],
                            type: 'line',
                            data: this.props.chartsData[dataKey]
                        });
                        break;
                    case CHARTS_TYPE_HISTOGRAM:
                        series.push({
                            name: split[1],
                            type: 'bar',
                            barGap: 0,
                            data: this.props.chartsData[dataKey]
                        });
                        break;
                    default:
                        break;
                }
            }
        });
        //x轴显示处理
        let xAxis = {};
        switch (this.props.chartsType) {
            case CHARTS_TYPE_LINEAR:
                xAxis = {
                    type: 'category',
                    boundaryGap: false,
                    data: this.props.chartXData
                };
                break;
            case CHARTS_TYPE_HISTOGRAM:
                xAxis = {
                    type: 'category',
                    axisTick: {show: false},
                    data: this.props.chartXData
                };
                break;
            default:
                break;
        }
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('eChartsShowId'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: this.props.chartsTitle
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: legend,
            grid: {
                left: "80",
                top: '100'
            },
            toolbox: {
                show: false,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: xAxis,
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: series
        });


    }

    /**
     * 时间选择改变回调
     */
    selectTimeChange(values, isDefaultInitFinish) {
        if (this.props.refreshDataList != null) {
            this.props.refreshDataList(values, isDefaultInitFinish);
        }
    }

    /**
     * 键盘输入后点击
     * @param e
     */
    hindKeyUp(e) {
        if (e.keyCode.toString() === '13') {
            if (this.props.refreshDataList != null) {
                this.props.refreshDataList(e.target.value, false);
            }
        }
    };

    render() {
        return (
            <div className='charts-container'>
                {
                    this.props.inputProps != null ?
                        <div style={{
                            position: "absolute",
                            left: '300px',
                            top: '40px',
                            zIndex: '1000'
                        }}>
                            <Input placeholder="" style={{width: "150px"}}
                                   onKeyUp={this.hindKeyUp.bind(this)}
                                   {...this.props.inputProps}/></div> : null
                }

                <div style={{position: "absolute", left: "0px", top: "40px", zIndex: '1000'}}>
                    <FilterSearchRangeTime
                        selectTimeChange={this.selectTimeChange.bind(this)}
                        defaultValue={[moment(moment().subtract(29, 'days').format("YYYY-MM-DD 00:00:00")),
                            moment(moment().format("YYYY-MM-DD 23:59:59"))]}
                        label="" allowClear={false}
                        {...this.props.selectTimeProps}/>
                </div>
                {
                    this.state.firstTypeTitles != null && this.state.firstTypeTitles.length > 0 ?
                        <div style={{
                            position: "absolute", right: "50px",
                            top: "40px", zIndex: '1000'
                        }}>
                            <div style={{width: "150px", border: "1px solid #e8e8e8"}}
                                 className='clearfix'>
                                {
                                    this.state.firstTypeTitles.map(item => (
                                        <div key={item}
                                             onClick={this.changeFirstType.bind(this, item)}
                                             className={this.state.nowSelectFirstType === item ? 'charts-container-switch-y' : 'charts-container-switch-n'}>
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div> : null
                }

                <div id="eChartsShowId" style={{height: 400}}/>
            </div>
        );
    }
}
