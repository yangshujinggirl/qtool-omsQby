import React from 'react';
import { Qbtn, BaseFilter } from 'common';
import { Form, Row, Col, Select, DatePicker } from 'antd';
import moment from 'moment';
const Option = Select.Option;
const { RangePicker } = DatePicker;

class NormalForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
	}
	//初始化
	render() {
		return (
			<div className="qtoolOms-condition data_center_condition" style={{ paddingTop: '20px' }}>
				<Form
					className="serach-common-form"
					ref={this.formRef}
					initialValues={{ time: [moment().subtract(30, 'days'), moment()], orderType: 7, shareType: 0 }}
				>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<Form.Item name="time" label="订单完成时间" {...this.formItemLayout}>
								<RangePicker />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="orderType" label="业务类型" {...this.formItemLayout}>
							<Select placeholder="请选择业务类型">
                                <Option key={7} value={7}>全部</Option>
                                <Option key={0} value={0}>门店POS订单</Option>
                                <Option key={6} value={6}>门店APP订单</Option>
                              </Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item className="oms-condition-operate">
								<Qbtn type="primary" onClick={this.handleSubmit}>
									搜索
								</Qbtn>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}
export default NormalForm;
