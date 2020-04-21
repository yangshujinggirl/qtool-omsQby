import React from 'react'
import {Button, Modal} from "antd";
import TopTitleDesHeader from "../../components/TopTitleDesHeader";
import {GetClassifyAnalysis} from "api/home/DataCenter/BaseData/GoodsData";
import CommonUtils from "utils/CommonUtils";
import ClassifyAnalysisCharts from "../components/Charts/ClassifyAnalysisCharts";
import {ErpExportApi} from "api/Export";
import {Qpagination, Qtable} from "common/index";
import Columns from "./column";

/**
 * 功能作用：分类分析
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class ClassifyAnalysis extends React.Component {
    state = {
        chatData: {
            xdata: [],
            type: '1',
            data1: [],
            data2: [],
            data3: [],
            data4: [],
        },
        searchFilterList: {},
        updateTime: "",
        categoryAnalysis: []
    };

    /**
     * 数据定义说明
     */
    desInfo = () => {
        Modal.info({
            title: '字段说明',
            content: (
                <div>
                    <p>【掌柜销售数量】：该分类在掌柜中销售的数量（包含Q本营创建的门店订单，不含取消订单）</p>
                    <p>【掌柜销售数量占比】：该分类在掌柜中销售的数量在全部分类销售数量中占比 </p>
                    <p>【掌柜销售金额】：该分类在掌柜中销售的总金金额（包含Q本营创建的门店订单，不含取消订单）</p>
                    <p>【掌柜销售金额占比】：该分类在掌柜中销售的总金额在全部分类销售的总金额中占比</p>
                    <p>【POS销售数量】：该分类在POS中销售的数量（只计算销售订单）</p>
                    <p>【POS销售数量占比】：该分类在POS销售的数量在全部分类销售数量中占比 </p>
                    <p>【POS销售金额】：该分类在POS中销售的总金金额（只计算销售订单）</p>
                    <p>【POS销售金额占比】：该分类在POS中销售的总金额在全部分类销售的总金额中占比</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    /**
     * 获取数据
     */
    getData(values) {
        let i;
        const result = new GetClassifyAnalysis();
        const categoryAnalysis = result.categoryAnalysis;
        const updateTime = result.updateTime;
        for (i = 0; i < categoryAnalysis.length; i++) {
            categoryAnalysis[i].qbyQtyBi = CommonUtils.dataDifferenceValueComparison(categoryAnalysis[i].qbyQty, categoryAnalysis[i].ofQbyQty, false) + '%'; //掌柜数量占比
            categoryAnalysis[i].qbyAmountBi = CommonUtils.dataDifferenceValueComparison(categoryAnalysis[i].qbyAmount, categoryAnalysis[i].ofQbyAmount, false) + '%'; //掌柜金额占比
            categoryAnalysis[i].posQtyBi = CommonUtils.dataDifferenceValueComparison(categoryAnalysis[i].posQty, categoryAnalysis[i].ofPosQty, false) + '%'; //pos数量占比
            categoryAnalysis[i].posAmountBi = CommonUtils.dataDifferenceValueComparison(categoryAnalysis[i].posAmount, categoryAnalysis[i].ofPosAmount, false) + '%'; //pos金额占比
        }

        const xdata = [];
        const data1 = [];
        const data2 = [];
        const data3 = [];
        const data4 = [];
        for (i = 0; i < categoryAnalysis.length; i++) {
            xdata.push(categoryAnalysis[i].name);
            data1.push(categoryAnalysis[i].qbyQty); //掌柜数量
            data2.push(categoryAnalysis[i].posQty); //pos数量
            data3.push(categoryAnalysis[i].qbyAmount);//掌柜金额
            data4.push(categoryAnalysis[i].posAmount); //pos金额
        }

        this.setState({
            chatData: {
                xdata: xdata,
                type: '1',
                data1: data1,
                data2: data2,
                data3: data3,
                data4: data4,
            },
            updateTime: updateTime,
            categoryAnalysis: categoryAnalysis
        })
    }

    /**
     * 时间选择改变
     * @param values 改变的时间
     * @param isDefaultInitFinish 默认值初始化完成
     */
    selectTimeChange(values, isDefaultInitFinish) {
        const params = {...this.state.searchFilterList, ...values};
        //设置数据
        this.setState({searchFilterList: {...params}});
        //请求数据
        this.getData(params);
    };


    render() {
        return <div>
            <TopTitleDesHeader updateTime={this.state.updateTime}
                               desInfoClick={this.desInfo.bind(this)}/>
            <div style={{border: '1px solid #e8e8e8', padding: '20px', marginTop: '30px'}}>
                <ClassifyAnalysisCharts
                    dataInfo={this.state.chatData}
                    selectTimeChange={this.selectTimeChange.bind(this)}/>
                <Button
                    type="primary"
                    size='large'
                    style={{marginTop: '20px', marginBottom: '15px'}}
                    onClick={() => new ErpExportApi(this.state.searchFilterList)}>
                    导出数据
                </Button>
                <Qtable
                    columns={Columns}
                    dataSource={this.state.categoryAnalysis}/>
            </div>
        </div>
    }
}
