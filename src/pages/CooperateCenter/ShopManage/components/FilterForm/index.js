import React from 'react';
import { Qbtn, BaseFilter } from 'common';
import { Form, Row, Col, Input, Select, Cascader } from 'antd';
import { getProvinceListApi } from 'api/home/CooperateCenter/ShopManage';
const Option = Select.Option;

class NormalForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			options: [],
		};
	}
	componentDidMount = () => {
		//获取省市区
		getProvinceListApi().then((res) => {
			if (res.httpCode == 200) {
				this.setState({
					options: res.result,
				});
			}
		});
	};
	//初始化
	render() {
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<Form.Item name="channelName" label="门店名称" {...this.formItemLayout}>
								<Input placeholder="请输入门店名称" autoComplete="off" allowClear={true} />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="person" label="门店店主" {...this.formItemLayout}>
								<Input placeholder="请输入门店店主" autoComplete="off" allowClear={true} />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="province" label="省份" {...this.formItemLayout}>
								<Cascader options={this.state.options} changeOnSelect />
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="channelStatus" label="营业状态" {...this.formItemLayout}>
								<Select allowClear={true} placeholder="请选择营业状态">
									<Option value={2} key={2}>
										待开业
									</Option>
									<Option value={1} key={1}>
										开业中
									</Option>
									<Option value={3} key={3}>
										关业中
									</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col {...this.colspans}>
							<Form.Item name="channelType" label="门店类型" {...this.formItemLayout}>
								<Select allowClear={true} placeholder="请选择门店类型">
									<Option value={1} key={1}>
										直营店
									</Option>
									<Option value={2} key={2}>
										联营店
									</Option>
									<Option value={3} key={3}>
										加盟店
									</Option>
								</Select>
							</Form.Item>
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
