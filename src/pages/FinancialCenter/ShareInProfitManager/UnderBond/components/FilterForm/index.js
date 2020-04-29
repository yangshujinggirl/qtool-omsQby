import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import moment from 'moment';
import { BaseFilter, Qbtn } from 'common';
import { FilterSearchRangeTime } from 'common/QdisabledDateTime';
import {
	SHARE_IN_PROFIT_UNDER_BOND_COST_TYPE_SALES_OF_THE_REFUND,
	SHARE_IN_PROFIT_UNDER_BOND_COST_TYPE_SALES_RECEIPTS,
} from '../../config';

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
							<FormItem label="门店名称" name="shopName" {...this.formItemLayout}>
								<Input placeholder="请输入门店名称" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem label="订单号" name="orderNo" {...this.formItemLayout}>
								<Input placeholder="请输入订单号" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem label="费用类型" name="shareType" {...this.formItemLayout}>
								<Select placeholder="请选择费用类型" allowClear={true}>
									<Option value={SHARE_IN_PROFIT_UNDER_BOND_COST_TYPE_SALES_RECEIPTS}>
										分润收款
									</Option>
									<Option value={SHARE_IN_PROFIT_UNDER_BOND_COST_TYPE_SALES_OF_THE_REFUND}>
										分润退款
									</Option>
								</Select>
							</FormItem>
						</Col>
						{/*占个位，把时间选择挤到下一行，否则无法清除时间选择，如果搜索条件有修改时间不在一行的最后一个则可以删除这个占位*/}
						<Col {...this.colspans} />
						<Col {...this.colspans}>
							<FilterSearchRangeTime
								selectTimeChange={this.props.selectTimeChange}
								defaultValue={[
									moment(this.searchCriteriaDefaultStartTime),
									moment(this.searchCriteriaDefaultEndTime),
								]}
								startTimeName="createST"
								endTimeName="createET"
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
