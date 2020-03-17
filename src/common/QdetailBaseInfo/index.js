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
 *
 * isVertical:是否垂直显示
 * formItemConfig：formItem的配置
 */
export default class DetailBaseInfo extends Component {
    render() {
        const {isVertical, formItemConfig} = this.props;
        const show = [];
        let length = this.props.showData.length;
        //遍历数据显示
        for (let i = 0; i < length; i = i + 2) {
            let la = this.props.showData[i];
            let value = this.props.showData[i + 1];
            show.push(<Col key={la}>
                <Form.Item {...formItemConfig}
                           label={la}>{value}</Form.Item>
            </Col>)
        }
        return (
            isVertical != null && isVertical ?
                <div className="detail-base-info-container">{show}</div> :
                <Row gutter={50} className="detail-base-info-container">{show}</Row>
        );
    }
}
