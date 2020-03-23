import React from 'react'
import {Modal} from "antd";
import {Qcards, Qtable} from "common/index";
import TopTitleDesHeader from "../../../components/TopTitleDesHeader";
import {GetAppBaseData} from "../../../../../api/home/DataCenter/FromC/AppData";
import TableDataListUtil from "utils/TableDataListUtil";
import Columns from "./column";

/**
 * 功能作用：App数据之基础数据
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class BaseData extends React.Component {
    state = {
        /**
         * 基础信息列表1
         */
        dataList1: [],
        /**
         * 基础信息列表2
         */
        dataList2: [],
        /**
         * 表格数据
         */
        tableDataList: []
    };

    /**
     * 第一次渲染结束操作
     */
    componentDidMount() {
        new GetAppBaseData().then(rep => {
            let dataSource = rep.result.qtOrders;
            let {
                userTotal,
                userTodayTotal,
                sumTurnover,
                currentTurnover,
                sumUserCosumes,
                currentUsercosumes,
                totalOrders,
                currentOrders,
                totalFinishedOrders,
                currentFinishedOrders
            } = rep.result;
            let data1 = [
                {title: '注册总用户数', value: userTotal},
                {title: '今日注册用户数', value: userTodayTotal},
                {title: '总流水', value: sumTurnover},
                {title: '今日流水', value: currentTurnover},
            ];
            let data2 = [
                {title: '下单总用户数', value: sumUserCosumes},
                {title: '今日下单用户数', value: currentUsercosumes},
                {title: '总下单订单数', value: totalOrders},
                {title: '今日下单订单数', value: currentOrders},
                {title: '总完成订单数', value: totalFinishedOrders},
                {title: '今日完成订单数', value: currentFinishedOrders},
            ];
            this.setState({
                dataList1: data1,
                dataList2: data2,
                tableDataList: TableDataListUtil.addKeyAndResultList(dataSource)
            });
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
                    <p>【注册总用户数】：截至目前注册的总用户人数</p>
                    <p>【今日注册用户数】：查询当日注册用户人数</p>
                    <p>【总流水】：所有支付过的订单支付总金额</p>
                    <p>【今日流水】：查询当日内支付的订单的支付总金额</p>
                    <p>【下单总用户数】：所有成功提交订单的用户人数</p>
                    <p>【今日下单用户数】：查询当日成功提交订单的用户人数</p>
                    <p>【总下单订单数】：所有成功提交的订单数</p>
                    <p>【今日下单订单数】：查询当日成功提交的订单数</p>
                    <p>【总完成订单数】：“已完成”状态订单总数</p>
                    <p>【今日完成订单数】：查询当日更新为“已完成”的状态的订单总数</p>
                </div>
            ),
            onOk() {
            },
        });
    };

    render() {
        return <div>
            <TopTitleDesHeader isShowUpdateTime={false}
                               desInfoClick={this.desInfo.bind(this)}/>
            <Qcards data={this.state.dataList1}/>
            <Qcards data={this.state.dataList2}/>
            <Qtable
                columns={Columns}
                dataSource={this.state.tableDataList}/>
        </div>
    }
}
