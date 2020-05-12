import React, { useEffect, useState } from 'react';
import { Form, Card } from 'antd';
import { Qtable, QenlargeImg } from 'common';
import { getInfosApi } from 'api/home/FinancialCenter/Recharge';
import Columns from './columns';
import { TableItemShowTime } from 'common/QdisabledDateTime';
import './index.less'

const RechargeInfo = (props) => {
	const { id } = props.match.params;
	const [infos, setInfos] = useState({});
	const [logs, setLogs] = useState([]);
	const [imgs, setImgs] = useState([]);
	/**
	 * 初始化信息
	 */
	useEffect(() => {
		getInfosApi(id).then((res) => {
			if (res.httpCode == 200) {
				const { spVoucherDto, spVoucherDetails, spVoucherLogs } = res.result;
				setInfos(spVoucherDto);
				setImgs(spVoucherDetails);
				setLogs(spVoucherLogs);
			}
		});
	}, []);
	return (
		<div className="oms-common-addEdit-pages base_info">
			<Card title="凭证信息">
				<Form.Item label="充值编码">{infos.voucherNo}</Form.Item>
				<Form.Item label="审核状态">{infos.statusStr}</Form.Item>
				<Form.Item label="门店名称">{infos.shopName}</Form.Item>
				<Form.Item label="充值时间">
					<TableItemShowTime showTime={infos.createTime} />
				</Form.Item>
			</Card>
			<Card>
				<Form.Item label="充值金额">{infos.amount}</Form.Item>
				<Form.Item>
					<div className='recharge-img-style'>
						{imgs &&
							imgs.length &&
							imgs.map((item, index) => <QenlargeImg key={index} url={item.picUrl} />)}
					</div>
				</Form.Item>
			</Card>
			<Card title="充值日志">
				<Qtable columns={Columns} dataSource={logs || []} />
			</Card>
		</div>
	);
};
export default RechargeInfo;
