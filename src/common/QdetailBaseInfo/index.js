import React, {Component} from "react";
import {Col, Form, Row} from "antd";
import './index.less'

/**
 * 功能作用：详情中基础信息的展示容器，调用方只要传递数组值进来即可
 * 初始注释时间： 2020/3/7 15:47
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 * 传入数据格式：数组
 * 传入数据要求：数组中每两个为一组，两个中的第一个为标题，第二个为内容，整个数组长度为偶数
 * 样例： ["采购单号", dataInfo.stockingCode,采购主体", dataInfo.procurementTarget,"供应商名称", dataInfo.suppliersName]
 */
export default class DetailBaseInfo extends Component {
    render() {
        const show = [];
        this.props.showData.slice(0, this.props.showData.length / 2).forEach((item, index) => {
            show.push(<Col>
                <Form.Item
                    label={this.props.showData[index * 2]}>{this.props.showData[index * 2 + 1]}</Form.Item>
            </Col>)
        });
        return (
            <Row gutter={50} className="detail-base-info-container">{show}</Row>
        );
    }
}
