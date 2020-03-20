import React from 'react'
import {Modal} from "antd";
import TopTitleDesHeader from "../../../components/TopTitleDesHeader";

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
export default class POS extends React.Component {
    state = {
        updateTime: "",
        /**
         * 基础信息
         */
        data: [],
        /**
         * 列表数据
         */
        listData: []
    };

    /**
     * 数据定义说明
     */
    desInfo = () => {
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

    render() {
        return <div>
            <TopTitleDesHeader updateTime={this.state.updateTime}
                               desInfoClick={this.desInfo.bind(this)}/>
        </div>
    }
}
