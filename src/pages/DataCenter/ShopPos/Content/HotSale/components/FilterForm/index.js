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
					initialValues={{ time: [moment().subtract(30, 'days'), moment()], orderType: 0, onSale: 1 }}
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
									<Option value={0}>全部</Option>
									<Option value={4}>仓库直邮订单</Option>
									<Option value={5}>保税订单</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="onSale" label="订单分类" {...this.formItemLayout}>
								<Select placeholder="请选择商品分类">
									<Option value={1} key="1">
										是
									</Option>
									<Option value={0} key="0">
										否
									</Option>
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
