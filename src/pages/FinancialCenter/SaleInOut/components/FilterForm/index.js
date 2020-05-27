import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import moment from 'moment';
import {
	SALE_IN_OUT_COST_TYPE_SALES_OF_THE_REFUND,
	SALE_IN_OUT_COST_TYPE_SALES_RECEIPTS,
	SALE_IN_OUT_DELIVERY_TYPE_EXPRESS_MAIL,
	SALE_IN_OUT_DELIVERY_TYPE_INTRA_CITY_SERVICE,
	SALE_IN_OUT_DELIVERY_TYPE_STORES_TO_THE,
	SALE_IN_OUT_ORDER_STATE_CANCELED,
	SALE_IN_OUT_ORDER_STATE_OFF_THE_STOCKS,
	SALE_IN_OUT_ORDER_STATE_REFUNDED,
} from '../../config';
import { FilterSearchRangeTime } from 'common/QdisabledDateTime';

const FormItem = Form.Item;
const { Option } = Select;

export default class SearchForm extends BaseFilter {
	formRef = React.createRef();

	render() {
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef} {...this.formItemLayout}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem label="门店名称" name="spShopName" {...this.formItemLayout}>
								<Input placeholder="请输入门店名称" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="deliveryType" label="配送方式" {...this.formItemLayout}>
								<Select placeholder="请选择配送方式" allowClear={true}>
									<Option value={SALE_IN_OUT_DELIVERY_TYPE_STORES_TO_THE}>门店自提</Option>
									<Option value={SALE_IN_OUT_DELIVERY_TYPE_INTRA_CITY_SERVICE}>同城配送</Option>
									<Option value={SALE_IN_OUT_DELIVERY_TYPE_EXPRESS_MAIL}>快递邮寄</Option>
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem label="订单状态" name="incomeStatus" {...this.formItemLayout}>
								<Select placeholder="请选择订单状态" allowClear={true}>
									<Option value={SALE_IN_OUT_ORDER_STATE_OFF_THE_STOCKS}>已完成</Option>
									<Option value={SALE_IN_OUT_ORDER_STATE_REFUNDED}>已退款</Option>
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem label="费用类型" name="costType" {...this.formItemLayout}>
								<Select placeholder="请选择费用类型" allowClear={true}>
									<Option value={SALE_IN_OUT_COST_TYPE_SALES_RECEIPTS}>销售收款</Option>
									<Option value={SALE_IN_OUT_COST_TYPE_SALES_OF_THE_REFUND}>销售退款</Option>
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FilterSearchRangeTime
								selectTimeChange={this.props.selectTimeChange}
								defaultValue={[
									moment(this.searchCriteriaDefaultStartTime),
									moment(this.searchCriteriaDefaultEndTime),
								]}
								startTimeName="dateTimeST"
								endTimeName="dateTimeET"
								label="时间选择"
								itemLayout={this.formItemLayout}
							/>
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
