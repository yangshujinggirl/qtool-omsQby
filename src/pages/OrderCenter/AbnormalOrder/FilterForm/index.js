import React, { Component } from 'react';
import { Qbtn, BaseFilter } from 'common';
import { Form, Row, Col, Input, Button, Select, DatePicker, AutoComplete } from 'antd';
import { getShopListApi } from 'api/home/StockCenter/GoodStock';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class NormalForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			shopList: [],
		};
	}
	//门店模糊搜索
	onSearch = (value) => {
		getShopListApi({ channelName: value }).then((res) => {
			if (res.httpCode == 200) {
				this.setState({
					shopList: res.result,
				});
			}
		});
	};
	//选择后
	onSelect = (value, option) => {
		this.setState({
			channelCode: option.key,
		});
	};
	//提交
	handleSubmit = async () => {
		try {
			const values = await this.formRef.current.validateFields();
			for (let i in values) {
				if (typeof values[i] == 'string') {
					values[i] = values[i].replace(/^\s+|\s+$/gm, '');
				}
			}
			if (values.channelCode) {
				values.channelCode = this.state.channelCode;
			}
			this.props.onSubmit && this.props.onSubmit(values);
		} catch (errorInfo) {
			console.log('Failed:', errorInfo);
		}
	};
	//初始化
	render() {
		const { shopList } = this.state;
		return (
			<div className="qtoolOms-condition">
				<Form ref={this.formRef} className="serach-common-form" {...this.formItemLayout}>
					<Row gutter={24}>
						<Col {...this.colspan}>
							<Form.Item name="orderNo" label="订单号">
								<Input placeholder="请输入订单号" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="channelCode" label="门店名称">
								<AutoComplete
									placeholder="请选择门店名称"
									onSearch={this.onSearch}
									onSelect={this.onSelect}
								>
									{shopList &&
										shopList.length > 0 &&
										shopList.map((item) => (
											<AutoComplete.Option key={item.channelCode} value={item.channelName}>
												{item.channelName}
											</AutoComplete.Option>
										))}
								</AutoComplete>
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="consignee" label="收货人">
								<Input placeholder="请输入收货人" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="phone" label="联系电话">
								<Input placeholder="请输入联系电话人" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="sort" label="订单类型">
								<Select allowClear={true} placeholder="请选择订单类型">
									<Option value={1}>门店采购单</Option>
									<Option value={2}>用户订单</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item label="创建时间" name="time">
								<RangePicker allowClear={true} showTime format="YYYY-MM-DD HH:mm:ss" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
				<Col span={24}>
					<Form.Item className="oms-condition-operate">
						<Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
							搜索
						</Qbtn>
					</Form.Item>
				</Col>
			</div>
		);
	}
}

export default NormalForm;
