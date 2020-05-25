import { Form, AutoComplete, Button } from 'antd';
import { GetShopListList } from 'api/home/DataCenter/ShopPos';
import { useState } from 'react';
import { connect } from 'react-redux';
import './index.less';
const { Option } = AutoComplete;
const ShopPos = (props) => {
	const [form] = Form.useForm();
	const [shopList, setShopList] = useState([]);
	const [isSelect, setIsSelect] = useState(false);
	//搜索
	const handleSearch = (value) => {
		GetShopListList({name:value}).then((res) => {
			setShopList(res.result);
		});
	};
	//进入门店
	const goIn = async () => {
		const values = await form.validateFields();
		if (isSelect) {
			setIsSelect(false);
			props.history.push('/account/shop_pos_in');
		}
	};
	//选中后
	const onSelect = (value, option) => {
		sessionStorage.setItem('oms_shopId', option.key);
		setIsSelect(true);
	};

	return (
		<div className="data_shop_pos">
			<Form form={form}>
				<Form.Item label="门店名称" name="shopId" rules={[{ required: true, message: '请选择门店' }]}>
					<AutoComplete
						placeholder="请选择门店名称"
						onSelect={onSelect}
						onSearch={handleSearch}
						style={{ width: '200px' }}
					>
						{shopList &&
							shopList.length &&
							shopList.map((item, index) => (
								<Option key={item.spShopId} value={item.name}>
									{item.name}
								</Option>
							))}
					</AutoComplete>
				</Form.Item>
				<Form.Item>
					<Button type="primary" onClick={goIn} style={{ height: 'auto' }}>
						进入门店
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
const mapStateToProps = (state) => {
	const { ShopPosReducers } = state;
	return { ...ShopPosReducers };
};

export default connect(mapStateToProps)(ShopPos);
