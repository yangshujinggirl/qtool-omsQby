import React from 'react';
import moment from 'moment';
import { Form, Row, Col, DatePicker, AutoComplete } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import { GetStoreIntelligentSearchList } from 'api/home/DataCenter/FinancialData';
const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

const FormItem = Form.Item;

class SearchForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			dataSources: [],
			spShopId: '',
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
				<Form
					initialValues={{ time: [moment(), moment()] }}
					className="serach-common-form"
					ref={this.formRef}
					{...this.formItemLayout}
				>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem label="门店名称" name="shopName" {...this.formItemLayout}>
								<AutoComplete onSearch={this.handleSearch} placeholder="请选择门店名称">
									{this.state.dataSources.map((item) => (
										<Option value={item.channelName}>{item.channelName}</Option>
									))}
								</AutoComplete>
							</FormItem>
						</Col>
						<FormItem name="time" label="选择时间" {...this.formItemLayout}>
							<RangePicker allowClear={false} />
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
export default SearchForm;
