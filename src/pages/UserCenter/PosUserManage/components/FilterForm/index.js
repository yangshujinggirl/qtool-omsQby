import React from 'react';
import { Form, Row, Col, Input, Select, DatePicker } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import moment from 'moment';
import {FilterSearchRangeTime} from "common/QdisabledDateTime";
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
							<Form.Item name="spShopName" label="门店名称" {...this.formItemLayout}>
								<Input placeholder="请输入门店名称" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="mbCardName" label="会员名称" {...this.formItemLayout}>
								<Input placeholder="请输入会员名称" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="mbCardMobile" label="会员电话" {...this.formItemLayout}>
								<Input placeholder="请输入会员电话" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="mbCardNo" label="会员卡号" {...this.formItemLayout}>
								<Input placeholder="请输入会员卡号" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="mbCardLevel" label="会员级别" {...this.formItemLayout}>
								<Select allowClear={true} placeholder="请选择会员级别">
									<Option value="">全部</Option>
									<Option value="1">金卡</Option>
									<Option value="2">银卡</Option>
									<Option value="3">普卡</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<FilterSearchRangeTime
								selectTimeChange={this.props.selectTimeChange}
								defaultValue={[moment().subtract(1, 'days'), moment()]}
								startTimeName="startTime" endTimeName="endTime" label="最近使用时间"
								itemLayout={this.formItemLayout}
								allowClear={true}/>
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
