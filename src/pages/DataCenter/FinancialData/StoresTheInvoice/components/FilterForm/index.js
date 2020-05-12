import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, Input } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import { GetStoreIntelligentSearchList } from 'api/home/DataCenter/FinancialData';

const FormItem = Form.Item;

export default class SearchForm extends BaseFilter {
	formRef = React.createRef();
	render() {
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef} initialValues={{startDate:moment()}}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem label="门店名称" name="shopName" {...this.formItemLayout}>
								<Input placeholder="请输入门店名称" />
							</FormItem>
						</Col>
						<FormItem name="startDate" label="选择时间" {...this.formItemLayout}>
							<DatePicker format='YYYY-MM' allowClear={false} />
						</FormItem>
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
