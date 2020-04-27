import { Link } from 'react-router-dom';
import moment from 'moment';
const Columns = [
	{
		title: '定时名称',
		dataIndex: 'taskName',
	},
	{
		title: '定时操作',
		dataIndex: 'opstatusStr',
		render: (text, record, index) => {
			return (
				<div>
					{record.statusnew == 1 ? <span>上新　</span> : <span>下新　</span>}
					{record.statushot == 1 ? <span>上畅销　</span> : <span>下畅销　</span>}
					{record.salestatus == 1 ? <span>上架　</span> : <span>下架　</span>}
				</div>
			);
		},
	},
	{
		title: '定时状态',
		dataIndex: 'statusStr',
	},
	{
		title: '最后修改人',
		dataIndex: 'updateUserId',
	},
	{
		title: '定时时间',
		dataIndex: 'taskTime',
		render: (text, record, index) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
	},
	{
		title: '操作',
		dataIndex: '',
		render: (text, record) => {
			return (
				<div>
					<Link className="theme-color" to={`/account/timerInfo/${record.pdTaskTimeId}`}>
						查看
					</Link>
					　
					{record.status == 1 && (
						<Link className="theme-color" to={`/account/addTimer/${record.pdTaskTimeId}`}>
							编辑
						</Link>
					)}
					<a className="theme-color" onClick={() => record.onOperateClick()}>
						强制无效
					</a>
				</div>
			);
		},
	},
];
export default Columns;
