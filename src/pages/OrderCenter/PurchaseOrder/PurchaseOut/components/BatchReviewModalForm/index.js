import React from "react";
import {Form, Radio, Row} from "antd";
import {
    AUDIT_STATUS_NO_PASS, AUDIT_STATUS_PASS,
} from "../../config";

const FormItem = Form.Item;
/**
 * 功能作用：批量审核弹窗form
 * 初始注释时间： 2020/3/6 17:52
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
export default class BatchReviewModalForm extends React.Component {
    render() {
        return (
            <Form>
                <Row>
                    <FormItem label="批量审核数">
                        <div>{this.props.selectedRowKeys}条</div>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem name="status" label="   审核结果" required={true}>
                        <Radio.Group onChange={this.props.onValuesChange}>
                            <Radio value={AUDIT_STATUS_PASS}>审核通过</Radio>
                            <Radio value={AUDIT_STATUS_NO_PASS}>审核不通过</Radio>
                        </Radio.Group>
                    </FormItem>
                </Row>

            </Form>
        );
    }
}
