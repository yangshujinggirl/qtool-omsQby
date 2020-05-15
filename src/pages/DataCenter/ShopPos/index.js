import { Form, AutoComplete, Button } from 'antd';
import { GetShopListList } from 'api/home/DataCenter/ShopPos';
import { useState } from 'react';
import './index.less';
const { Option } = AutoComplete;
const ShopPos = (props) => {
    const [form] = Form.useForm()
	const [shopList, setShopList] = useState([]);
	//搜索
	const handleSearch = () => {
		GetShopListList().then((res) => {
			setShopList(res.result);
		});
    };
    //进入门店
    const goIn=async()=>{
        // const values = await form.validateFields();
        // console.log(values)
        props.history.push('/account/shop_pos_in')
    }
	return (
		<div className="data_shop_pos">
			<Form form={form}>
				<Form.Item label="门店名称" className='item_required'>
					<Form.Item noStyle name='shopId' rules={[{ required: true, message: '请选择门店' }]}>
						<AutoComplete placeholder="请选择门店名称" onSearch={handleSearch} style={{ width: '200px' }}>
							{shopList &&
								shopList.length &&
								shopList.map((item) => <Option key={item.channelId}>{item.channelName}</Option>)}
						</AutoComplete>
					</Form.Item>
					<Form.Item noStyle>
						<Button type="primary" onClick={goIn}>进入门店</Button>
					</Form.Item>
				</Form.Item>
			</Form>
		</div>
	);
};
export default ShopPos;
