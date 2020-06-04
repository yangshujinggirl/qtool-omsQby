import React from 'react';
import { Form, Input, Select, Row, Col, AutoComplete } from 'antd';
import { GetCategoryApi } from 'api/home/BaseGoods';
import { BaseFilter, Qbtn } from 'common';
import { GetCategoryCodeApi } from '../../../../../../api/home/BaseGoods';
import { getShopListApi } from 'api/home/StockCenter/GoodStock';
const FormItem = Form.Item;
const { Option } = Select;

class SearchForm extends BaseFilter {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			catagoryList: [],
			catagoryList2: [],
			shopList: [],
		};
	}
	componentDidMount() {
		GetCategoryApi({ level: 1, parentId: '' }).then((res) => {
			this.setState({ catagoryList: res.result || [] });
		});
		this.setState({
			shopList:new Array({channelCode:8791,channelName:"Qtools Beta"}),
			channelCode:8791
		},function () {
			this.formRef.current.setFieldsValue({channelCode:"Qtools Beta"})
            this.props.onSubmit && this.props.onSubmit({
                channelCode: this.state.channelCode
            });
		})
	}
	//一级菜单更改
	onChange = (value) => {
		this.formRef.current.setFieldsValue({ pdCategory2Id: undefined });
		this.setState({
			catagoryList2: [],
		});
		if (value) {
			GetCategoryCodeApi({ level: 2, categoryCode: value }).then((res) => {
				this.setState({
					catagoryList2: res.result || [],
				});
			});
		}
	};
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
	render() {
		const { catagoryList, catagoryList2, shopList } = this.state;
		return (
			<div className="qtoolOms-condition">
				<Form className="serach-common-form" ref={this.formRef} {...this.formItemLayout}>
					<Row gutter={24}>
						<Col {...this.colspans}>
							<FormItem name="channelCode" label="门店名称">
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
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="productName" label="商品名称">
								<Input placeholder="请输入商品名称" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="skuCode" label="sku编码">
								<Input placeholder="请输入sku编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="spuCode" label="SPU编码">
								<Input placeholder="请输入SPU编码" autoComplete="off" />
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="categoryCode1" label="一级类目">
								<Select onChange={this.onChange} placeholder="请选择" allowClear={true}>
									{catagoryList.map((item) => (
										<Option value={item.categoryCode} key={item.id}>
											{item.categoryName}
										</Option>
									))}
								</Select>
							</FormItem>
						</Col>
						<Col {...this.colspans}>
							<FormItem name="categoryCode2" label="二级类目">
								<Select placeholder="请选择" disabled={!catagoryList2.length > 0} allowClear={true}>
									{catagoryList2.map((item) => (
										<Option value={item.categoryCode} key={item.id}>
											{item.categoryName}
										</Option>
									))}
								</Select>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<Col span={24}>
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
