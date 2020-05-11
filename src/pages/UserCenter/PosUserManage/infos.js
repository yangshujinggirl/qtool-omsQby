import React, { useEffect, useState } from 'react';
import { Card, Form } from 'antd';
import { Qtable,Qpagination } from 'common';
import moment from 'moment'
import { getInfosApi, getLogsApi } from 'api/home/UserCenter/PosUserManage';
import Utils from 'utils/CommonUtils';
const Columns = [
	{
		title: '订单号',
		dataIndex: 'orderNo',
	},
	{
		title: '消费平台',
		dataIndex: 'payPlatform',
	},
	{
		title: '结算金额',
		dataIndex: 'amount',
	},
	{
		title: '本次积分',
		dataIndex: 'point',
	},
	{
		title: '积分抵扣',
		dataIndex: 'discountPoint',
	},
	{
		title: '会员卡充值',
		dataIndex: 'cardCharge',
	},
	{
		title: '会员卡消费',
		dataIndex: 'cardConsume',
	},
	{
		title: '优惠金额',
		dataIndex: 'discountMoney',
	},
	{
		title: '抹零金额',
		dataIndex: 'reducAmount',
	},
	{
		title: '订单时间',
		dataIndex: 'createTime',
		render:(text,record,index)=>{
			return (
			<span>{text&&moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
			)
		}
	},
	{
		title: '消费门店',
		dataIndex: 'shopName',
	},
];

/**
 * 审核  zhy
 */
const PosUserInfo = (props) => {
	const [infos, setInfos] = useState({});
	const [detailList, setDetailList] = useState([]);
	const [values, setValues] = useState({everyPage:15,currentPage:1,total:0});
	const url = props.location.search;
    const params = Utils.getUrlParams(url);
	useEffect(() => {
		getInfosApi(params).then((res) => {
			if (res.httpCode == 200) {
				setInfos(res.result);
			}
		});
		getList(params)
    }, []);
    //获取消费记录列表
    const getList=(params)=>{
        getLogsApi(params).then((res) => {
			if (res.httpCode == 200) {
				const { result,everyPage,currentPage,total } = res.result;
				if (result && result.length > 0) {
					result.map((item, index) => {
						item.key = index;
					});
					setDetailList(result);
					setValues({...values,everyPage,currentPage,total})
				}
			}
		});
    }
    //更改分页
    const changePage=(currentPage,everyPage)=>{
        const _values = {...values,currentPage,everyPage};
		this.getList(_values);
    }
	return (
		<div>
			<Card title="会员信息" className="base_info">
				<Form.Item label="会员姓名">{infos.name}</Form.Item>
				<Form.Item label="会员卡号">{infos.cardNo}</Form.Item>
				<Form.Item label="会员手机">{infos.mobile}</Form.Item>
				<Form.Item label="会员级别">{infos.levelStr}</Form.Item>
				{infos.birthday &&
					infos.birthday.length>0 &&
					infos.birthday.map((item, index) => (
						<Form.Item label={'宝宝生日' + (index==0?'':index)}>
							{item.birthDate + '【' + item.typeStr + '】'}
						</Form.Item>
					))}

				<Form.Item label="账户余额">{infos.amount}</Form.Item>
				<Form.Item label="会员积分">{infos.point}</Form.Item>
				<Form.Item label="30日消费总金额">{infos.amountSum}</Form.Item>
				<Form.Item label="30日消费次数">{infos.timeSum}</Form.Item>
				<Form.Item label="开卡时间">{moment(infos.createTime).format('YYYY-MM-DD HH:mm:ss')}</Form.Item>
				<Form.Item label="最近使用时间">{moment(infos.recentTime).format('YYYY-MM-DD HH:mm:ss')}</Form.Item>
			</Card>
			<Card title="消费记录">
				<Qtable columns={Columns} dataSource={detailList} />
				<Qpagination data={values} onChange={changePage} />
			</Card>
		</div>
	);
};
export default PosUserInfo;
