import React, {Component} from "react";
import {Col, Form, Row} from "antd";


const  QbaseInfo=({...props})=>{
    const { formItemConfig, dataInfo } = props;
    return (
            <Row gutter={50} className="detail-base-info-container">
            {
              dataInfo.map((el,index)=> (
                <Col key={index} span={props.colSpan?props.colSpan:6}>
                    <Form.Item
                     {...formItemConfig}
                     label={el.key}>{el.value}</Form.Item>
                </Col>
              ))
            }
            </Row>
    );
}
export default QbaseInfo;
