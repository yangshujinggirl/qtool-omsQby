import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, Input, AutoComplete } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import { GetStoreIntelligentSearchList } from 'api/home/DataCenter/FinancialData';

const FormItem = Form.Item;
const { Option } = AutoComplete;

export default class SearchForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			dataSources: [],
		};
	}
	//智能搜索
	handleSearch = (value) => {
		GetStoreIntelligentSearchList({ channelName: value }).then((rep) => {
			this.setState({
				dataSources: rep.result,
			});
		});
	};
	render() {
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef} initialValues={{ startDate: moment() }}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem label="门店名称" name="channelName" {...this.formItemLayout}>
								<AutoComplete onSearch={this.handleSearch} placeholder="请选择门店名称">
									{this.state.dataSources.map((item) => (
										<Option value={item.channelName}>{item.channelName}</Option>
									))}
								</AutoComplete>
							</FormItem>
						</Col>
						<FormItem name="startDate" label="选择时间" {...this.formItemLayout}>
							<DatePicker format="YYYY-MM" allowClear={false} picker='month'/>
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
