import React from 'react';
import { Form, Input, Row, Col, Select, DatePicker } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import {
	COMMODITY_EXPIRY_SATE_TYPE_EXPIRED_IN_NINETY_DAYS,
	COMMODITY_EXPIRY_SATE_TYPE_EXPIRED_IN_SEVEN_DAYS,
	COMMODITY_EXPIRY_SATE_TYPE_EXPIRED_IN_THIRTY_DAYS,
	COMMODITY_EXPIRY_SATE_TYPE_OUT_OF_DATE,
} from '../../Config';

const FormItem = Form.Item;
const Option = Select.Option;

export default class SearchForm extends BaseFilter {
	formRef = React.createRef();

	componentDidMount() {
		this.formRef.current.setFieldsValue({
			expireType: COMMODITY_EXPIRY_SATE_TYPE_EXPIRED_IN_NINETY_DAYS,
		});
	}

	render() {
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef} {...this.formItemLayout}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem label="SPU ID" name="spuId" {...this.formItemLayout}>
								<Input placeholder="请输入小于11位的spuid" maxLength="10" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="pdSpuName" label="商品名称" {...this.formItemLayout}>
								<Input placeholder="请输入商品名称" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem label="商品编码" name="pdCode" {...this.formItemLayout}>
								<Input placeholder="请输入商品编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="pdBarcode" label="商品条码" {...this.formItemLayout}>
								<Input placeholder="请输入商品条码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="expireType" label="到期天数" {...this.formItemLayout}>
								<Select placeholder="请选择一级分类">
									<Option value={COMMODITY_EXPIRY_SATE_TYPE_OUT_OF_DATE}>已过期</Option>
									<Option value={COMMODITY_EXPIRY_SATE_TYPE_EXPIRED_IN_SEVEN_DAYS}>7天内过期</Option>
									<Option value={COMMODITY_EXPIRY_SATE_TYPE_EXPIRED_IN_THIRTY_DAYS}>
										30天内过期
									</Option>
									<Option value={COMMODITY_EXPIRY_SATE_TYPE_EXPIRED_IN_NINETY_DAYS}>
										90天内过期
									</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<Col offset={21}>
					<FormItem className="oms-condition-operate">
						<Qbtn type="primary" onClick={this.handleSubmit}>
							搜索
						</Qbtn>
					</FormItem>
				</Col>
			</div>
		);
	}
}
