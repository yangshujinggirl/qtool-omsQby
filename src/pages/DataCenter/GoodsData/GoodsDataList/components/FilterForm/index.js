import React from 'react';
import { Form, Input, Row, Col, DatePicker } from 'antd';
import { BaseFilter, Qbtn } from 'common';
import moment from 'moment';
import { FilterSearchRangeTime } from 'common/QdisabledDateTime';

const FormItem = Form.Item;

export default class SearchForm extends BaseFilter {
	formRef = React.createRef();
	render() {
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef} {...this.formItemLayout}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem label="SPU ID" name="pdSpuId" {...this.formItemLayout}>
								<Input placeholder="请输入小于11位的spuid" maxLength="10" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="goodsName" label="商品名称" {...this.formItemLayout}>
								<Input placeholder="请输入商品名称" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="barCode" label="商品条码" {...this.formItemLayout}>
								<Input placeholder="请输入商品条码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem label="商品编码" name="goodsCode" {...this.formItemLayout}>
								<Input placeholder="请输入商品编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FilterSearchRangeTime
								selectTimeChange={this.props.selectTimeChange}
								defaultValue={[moment(), moment()]}
								startTimeName="startDate"
								endTimeName="endDate"
								label="销售时间"
								itemLayout={this.formItemLayout}
								showTime={false}
								allowClear={false}
								isLimit={true}
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
