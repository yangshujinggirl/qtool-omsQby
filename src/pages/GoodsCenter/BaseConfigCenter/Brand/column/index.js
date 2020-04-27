import moment from 'moment';
import { Link } from 'react-router-dom';
const Columns = [
	{
		title: '品牌logo',
		dataIndex: 'logo',
		key: '1',
		render: (text) =>
			text ? (
				<img src={sessionStorage.getItem('oms_fileDomain') + text} style={{ width: '90px', height: '90px' }} />
			) : (
				<img src="/static/nogoods.png" style={{ width: '90px', height: '90px' }} />
			),
	},
	{ title: '品牌中文名称', dataIndex: 'brandNameCn', key: '2' },
	{
		title: '品牌英文名称',
		dataIndex: 'brandNameEn',
		key: '3',
	},
	{
		title: '品牌归属地',
		dataIndex: 'brandCountryName',
		key: '4',
	},

	{
		title: '状态',
		dataIndex: 'status',
		key: '5',
		render: (text) => (text == 1 ? '启用' : '不启用'),
	},
	{
		title: '品牌授权',
		dataIndex: 'isSq',
		key: '6',
		render: (text, record, index) => (text == 1 ? '有' : '无'),
	},
	{
		title: '创建人',
		dataIndex: 'createTime',
		key: '7',
		render: (text, record, index) => (
			<div>
				<span>{record.modifyBy}</span>
				<br />
				<span>{text && moment(text).format('YYYY-MM-DD H:mm:ss')}</span>
			</div>
		),
	},
	{
		title: '最后修改人',
		dataIndex: 'lastUpdateTime',
		key: '8',
		render: (text, record, index) => (
			<div>
				<span>{record.modifyBy}</span>
				<br />
				<span>{text && moment(text).format('YYYY-MM-DD H:mm:ss')}</span>
			</div>
		),
	},
	{
		title: '操作',
		key: '9',
		render: (text, record, index) => (
			<div>
				<Link className="link-color action-left" to={`/account/brandAdd/${record.id}`}>
					编辑
				</Link>
				<Link className="link-color" to={`/account/brandInfo/${record.id}`}>
					查看
				</Link>
			</div>
		),
	},
];

export default Columns;
