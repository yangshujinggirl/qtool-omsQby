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
				<Form ref={this.formRef} className="serach-common-form">
					<Row>
						<Col {...this.colspan}>
							<Form.Item name="orderNo" label="订单号" {...this.formItemLayout}>
								<Input placeholder="请输入订单号" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="channelCode" label="门店名称" {...this.formItemLayout}>
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
							<Form.Item name="skuCode" label="SKU编码" {...this.formItemLayout}>
								<Input placeholder="请输入SKU编码" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="productName" label="商品名称" {...this.formItemLayout}>
								<Input placeholder="请输入商品名称" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="consignee" label="收货人" {...this.formItemLayout}>
								<Input placeholder="请输入收货人" autoComplete="off" />
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item name="phone" label="联系电话" {...this.formItemLayout}>
								<Input placeholder="请输入联系电话" autoComplete="off" />
							</Form.Item>
						</Col>

						<Col {...this.colspan}>
							<Form.Item name="isThink" label="代发状态" {...this.formItemLayout}>
								<Select allowClear={true} placeholder="请选择代发状态" className="select">
									<Option value={1}>待生成采购单</Option>
									<Option value={2}>待发货</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspan}>
							<Form.Item label="生成时间" name="time" {...this.formItemLayout2}>
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
