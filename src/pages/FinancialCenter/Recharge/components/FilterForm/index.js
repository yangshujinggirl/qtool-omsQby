import React from 'react';
import { Form, Row, Col, Input, Select, DatePicker } from 'antd';
import { BaseFilter, Qbtn } from 'common';
const { RangePicker } = DatePicker;

class NormalForm extends BaseFilter {
	formRef = React.createRef();
	//初始化
	render() {
		return (
			<div className="qtoolOms-condition">
				<Form ref={this.formRef} className="serach-common-form">
					<Row gutter={24}>
						<Col {...this.colspans}>
							<Form.Item name="shopName" label="门店名称">
								<Input placeholder="请输入门店名称" autoComplete="off" allowClear={true} />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="status" label="审核状态">
								<Select allowClear={true} placeholder="请选择审核状态" className="select">
									<Option value={0}>待审核</Option>
									<Option value={1}>审核通过</Option>
									<Option value={2}>审核不通过</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="voucherNo" label="充值号">
								<Input placeholder="请输入充值号" autoComplete="off" allowClear={true} />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="time" label="充值时间">
								<RangePicker allowClear={true} showTime format="YYYY-MM-DD HH:mm:ss" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item className="oms-condition-operate">
								<Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
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
